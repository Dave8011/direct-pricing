const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const { parseCSV } = require('./parser');
const { renderFullHTML } = require('./templates/page');

async function generatePDF() {
  const monthYear = process.argv[2] || 'JULY 2026';
  const csvPath = path.resolve(__dirname, 'data.csv');
  const outputDir = path.resolve(__dirname, 'output');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log(`Reading CSV from ${csvPath}...`);
  const categories = parseCSV(csvPath);

  console.log('Rendering HTML templates...');
  const htmlContent = renderFullHTML(categories, monthYear);

  const tmpHtmlPath = path.resolve(outputDir, '_temp_pricelist.html');
  fs.writeFileSync(tmpHtmlPath, htmlContent, 'utf8');

  console.log('Launching Puppeteer...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  console.log('Loading page content...');
  await page.goto(`file://${tmpHtmlPath}`, { waitUntil: 'networkidle0' });

  const pdfOutputPath = path.resolve(outputDir, 'Generated_Pricelist.pdf');
  const rootPdfPath = path.resolve(__dirname, 'Generated_Pricelist.pdf');

  console.log('Generating PDF...');
  await page.pdf({
    path: pdfOutputPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
  });

  await browser.close();

  // Clean up temp HTML file
  if (fs.existsSync(tmpHtmlPath)) {
    fs.unlinkSync(tmpHtmlPath);
  }

  // Also copy to root directory for convenience
  fs.copyFileSync(pdfOutputPath, rootPdfPath);

  console.log(`✅ PDF successfully generated at: ${pdfOutputPath}`);
  console.log(`✅ PDF copied to root: ${rootPdfPath}`);
}

generatePDF().catch(err => {
  console.error('❌ Error generating PDF:', err);
  process.exit(1);
});
