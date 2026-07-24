const fs = require('fs');
const path = require('path');

function formatWeight(weightStr) {
  if (!weightStr) return '';
  let str = weightStr.toString().trim().toUpperCase();

  // If ends with G (e.g., 500G, 60G, 5000G)
  if (str.endsWith('G')) {
    const num = parseFloat(str.replace('G', ''));
    if (!isNaN(num)) {
      if (num >= 1000) {
        return `${num / 1000} kg`;
      }
      return `${num}g`;
    }
  }

  const num = parseFloat(str);
  if (isNaN(num)) return str;

  if (num >= 1) {
    return `${num} kg`;
  } else {
    const grams = Math.round(num * 1000);
    return `${grams}g`;
  }
}

function formatPrice(price) {
  if (price === undefined || price === null || price === '') return '';
  const num = parseFloat(price.toString().replace(/[^0-9.]/g, ''));
  if (isNaN(num)) return price;
  return `₹${num.toLocaleString('en-IN')}`;
}

/**
 * Returns Base64 Data URL for logos so Puppeteer renders them reliably
 */
function getLogoDataUrl(filename) {
  try {
    const logoPath = path.resolve(__dirname, '../logos', filename);
    if (fs.existsSync(logoPath)) {
      const ext = path.extname(filename).replace('.', '').toLowerCase();
      const mime = ext === 'png' ? 'image/png' : ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : 'image/png';
      const base64Data = fs.readFileSync(logoPath).toString('base64');
      return `data:${mime};base64,${base64Data}`;
    }
  } catch (err) {
    console.error(`Error reading logo ${filename}:`, err);
  }
  return '';
}

module.exports = {
  formatWeight,
  formatPrice,
  getLogoDataUrl
};
