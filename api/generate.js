let parseCSV, parseGiftTranspoCSV, renderFullHTML, chromium, formidable;
let initError = null;

try {
  const parser = require('../parser');
  parseCSV = parser.parseCSV;
  parseGiftTranspoCSV = parser.parseGiftTranspoCSV;
  renderFullHTML = require('../templates/page').renderFullHTML;
  formidable = require('formidable').formidable; // v3 uses .formidable
} catch (e) {
  initError = e;
}

module.exports.config = {
  api: {
    bodyParser: false,
  },
};

module.exports = async function handler(req, res) {
  if (initError) {
    return res.status(500).json({ error: 'Init Error: ' + initError.message, stack: initError.stack });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let body = {};
    if (req.headers['content-type'] && req.headers['content-type'].includes('application/json')) {
      try {
        const chunks = [];
        for await (const chunk of req) {
          chunks.push(chunk);
        }
        body = JSON.parse(Buffer.concat(chunks).toString());
      } catch (e) {
        // Fallback or ignore
      }
    } else {
      // It might be parsed automatically by some middleware, but we have bodyParser: false
      // To support simple JSON, let's keep it robust. If formData is used:
      try {
        const form = formidable({ multiples: false });
        const [fields, files] = await new Promise((resolve, reject) => {
          form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve([fields, files]);
          });
        });
        body = fields;
      } catch (e) {
        // Fallback
      }
    }

    let monthYear = body.monthYear;
    if (Array.isArray(monthYear)) monthYear = monthYear[0];
    if (!monthYear || monthYear.trim() === '') monthYear = 'OCTOBER 2026'; // Default

    let type = body.type || 'complete';
    if (Array.isArray(type)) type = type[0];
    if (!['complete', 'hampers', 'normal'].includes(type)) {
      type = 'complete';
    }

    // 1. Fetch CSV from Google Sheets (Main price list)
    const SHEET_ID = '1nmTKuazMi-DvA8r4UhZYPGCqMWMsCE4zS3EW0CnQfn8';
    const SHEET_NAME = 'Driect-pdf';
    const csvUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${SHEET_NAME}`;
    
    const sheetResponse = await fetch(csvUrl);
    if (!sheetResponse.ok) {
      throw new Error(`Failed to fetch Google Sheet: ${sheetResponse.statusText}`);
    }
    const csvText = await sheetResponse.text();
    const rawCategories = parseCSV(csvText);

    let categories = {};
    if (type === 'hampers') {
      if (rawCategories['GROCERY - HAMPERS AND GIFTING']) {
        categories['GROCERY - HAMPERS AND GIFTING'] = rawCategories['GROCERY - HAMPERS AND GIFTING'];
      }
    } else if (type === 'normal') {
      categories = { ...rawCategories };
      delete categories['GROCERY - HAMPERS AND GIFTING'];
    } else {
      categories = rawCategories;
    }

    // 2. Fetch New Gifting Range from Google Sheet (D-gift-transpo) - only needed for complete and hampers
    let newGiftingHampers = [];
    if (type !== 'normal') {
      const GIFT_SHEET_ID = '1XJJUT2KUSZH04zu1ErPYY1_-3UV_qoWCKmUHqVtv_sI';
      const GIFT_GID = '1519148830';
      const GIFT_SHEET_NAME = 'D-gift-transpo';
      const giftCsvUrl = `https://docs.google.com/spreadsheets/d/${GIFT_SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(GIFT_SHEET_NAME)}`;

      try {
        let giftResponse = await fetch(giftCsvUrl);
        if (!giftResponse.ok) {
          // Fallback to export endpoint
          const exportGiftUrl = `https://docs.google.com/spreadsheets/d/${GIFT_SHEET_ID}/export?format=csv&gid=${GIFT_GID}`;
          giftResponse = await fetch(exportGiftUrl);
        }

        if (giftResponse.ok) {
          const giftCsvText = await giftResponse.text();
          newGiftingHampers = parseGiftTranspoCSV(giftCsvText);
        } else {
          console.warn(`[GIFTING SHEET] Failed with status ${giftResponse.status}`);
        }
      } catch (giftErr) {
        console.warn('Error fetching new gifting hampers sheet:', giftErr);
      }
    }

    if (Object.keys(categories).length === 0 && newGiftingHampers.length === 0) {
      return res.status(400).json({ error: 'Selected catalog data is empty or invalid' });
    }

    // 3. Render HTML
    const htmlContent = renderFullHTML(categories, monthYear, newGiftingHampers, type);

    // Dynamic import for puppeteer-core and chromium because they are ES Modules
    const puppeteer = await import('puppeteer-core').then(m => m.default || m);
    const chromium = await import('@sparticuz/chromium').then(m => m.default || m);

    // 3. Launch Puppeteer in Vercel environment
    // @sparticuz/chromium automatically manages the Chromium binary download/execution
    const executablePath = await chromium.executablePath();
    
    let browser = null;
    let pdfBuffer;

    try {
      browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: executablePath || process.env.PUPPETEER_EXECUTABLE_PATH,
        headless: chromium.headless,
      });

      const page = await browser.newPage();
      page.setDefaultNavigationTimeout(60000);
      page.setDefaultTimeout(60000);
      
      // Set HTML content directly in memory (no temp files needed)
      // Use domcontentloaded + load instead of networkidle0 so keepalive font connections don't block
      await page.setContent(htmlContent, { 
        waitUntil: ['domcontentloaded', 'load'],
        timeout: 60000
      });

      // Wait for Google Fonts to be ready, with a 5-second maximum race to avoid hanging
      await Promise.race([
        page.evaluate(() => document.fonts.ready),
        new Promise(resolve => setTimeout(resolve, 5000))
      ]);

      // 4. Generate PDF buffer (Puppeteer returns Uint8Array in newer versions)
      const pdfUint8Array = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
        timeout: 60000
      });

      // Ensure it's a Node Buffer so Vercel doesn't stringify it
      pdfBuffer = Buffer.from(pdfUint8Array);
    } finally {
      if (browser) {
        await browser.close().catch(() => {});
      }
    }

    // 5. Send PDF as response
    const cleanMonth = (monthYear || 'Generated').trim().replace(/[^a-zA-Z0-9_-]/g, '_');
    let typeSlug = 'Complete';
    if (type === 'hampers') typeSlug = 'Gift_Hampers';
    if (type === 'normal') typeSlug = 'Normal_Products';

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="Pure_Tree_${typeSlug}_${cleanMonth}.pdf"`);
    res.setHeader('Content-Length', pdfBuffer.length);
    return res.end(pdfBuffer);

  } catch (error) {
    console.error('Error generating PDF:', error);
    return res.status(500).json({ error: 'Internal Server Error: ' + error.message });
  }
}
