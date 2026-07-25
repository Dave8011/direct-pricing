let parseCSV, renderFullHTML, chromium, formidable;
let initError = null;

try {
  parseCSV = require('../parser').parseCSV;
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
    if (req.headers['content-type'] === 'application/json') {
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
    if (!monthYear || monthYear.trim() === '') monthYear = 'JULY 2026'; // Default

    // 1. Fetch CSV from Google Sheets
    const SHEET_ID = '1nmTKuazMi-DvA8r4UhZYPGCqMWMsCE4zS3EW0CnQfn8';
    const SHEET_NAME = 'Driect-pdf';
    const csvUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${SHEET_NAME}`;
    
    const sheetResponse = await fetch(csvUrl);
    if (!sheetResponse.ok) {
      throw new Error(`Failed to fetch Google Sheet: ${sheetResponse.statusText}`);
    }
    const csvText = await sheetResponse.text();

    // 2. Parse CSV text directly (modify parser to handle string instead of file)
    // Wait, parseCSV expects a filePath. We need to create a temporary file or modify parser.
    const os = require('os');
    const fs = require('fs');
    const path = require('path');
    const tempCsvPath = path.join(os.tmpdir(), `temp_${Date.now()}.csv`);
    fs.writeFileSync(tempCsvPath, csvText);

    const categories = parseCSV(tempCsvPath);
    // Clean up
    if (fs.existsSync(tempCsvPath)) fs.unlinkSync(tempCsvPath);

    if (Object.keys(categories).length === 0) {
      return res.status(400).json({ error: 'Google Sheet CSV is empty or invalid' });
    }

    // 2. Render HTML
    const htmlContent = renderFullHTML(categories, monthYear);

    // Dynamic import for puppeteer-core and chromium because they are ES Modules
    const puppeteer = await import('puppeteer-core').then(m => m.default || m);
    const chromium = await import('@sparticuz/chromium').then(m => m.default || m);

    // 3. Launch Puppeteer in Vercel environment
    // @sparticuz/chromium automatically manages the Chromium binary download/execution
    const executablePath = await chromium.executablePath();
    
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: executablePath || process.env.PUPPETEER_EXECUTABLE_PATH,
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    
    // Set HTML content directly in memory (no temp files needed)
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    // 4. Generate PDF buffer (Puppeteer returns Uint8Array in newer versions)
    const pdfUint8Array = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
    });

    await browser.close();

    // Ensure it's a Node Buffer so Vercel doesn't stringify it
    const pdfBuffer = Buffer.from(pdfUint8Array);

    // 5. Send PDF as response
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="Pure_Tree_Price_List.pdf"');
    res.setHeader('Content-Length', pdfBuffer.length);
    return res.end(pdfBuffer);

  } catch (error) {
    console.error('Error generating PDF:', error);
    return res.status(500).json({ error: 'Internal Server Error: ' + error.message });
  }
}
