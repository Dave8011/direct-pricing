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
    // Parse the incoming form data
    const form = formidable({ multiples: false });
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    const csvFile = files.csvFile;
    if (!csvFile) {
      return res.status(400).json({ error: 'No CSV file uploaded' });
    }

    // `formidable` in Vercel v3+ sometimes puts files in an array
    const file = Array.isArray(csvFile) ? csvFile[0] : csvFile;
    const csvPath = file.filepath;

    let monthYear = fields.monthYear;
    if (Array.isArray(monthYear)) monthYear = monthYear[0];
    if (!monthYear || monthYear.trim() === '') monthYear = 'JULY 2026'; // Default

    // 1. Parse CSV
    const categories = parseCSV(csvPath);
    if (Object.keys(categories).length === 0) {
      return res.status(400).json({ error: 'CSV is empty or invalid' });
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

    // 4. Generate PDF buffer
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
    });

    await browser.close();

    // 5. Send PDF as response
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="Generated_Pricelist.pdf"');
    res.setHeader('Content-Length', pdfBuffer.length);
    return res.status(200).send(pdfBuffer);

  } catch (error) {
    console.error('Error generating PDF:', error);
    return res.status(500).json({ error: 'Internal Server Error: ' + error.message });
  }
}
