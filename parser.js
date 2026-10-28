const fs = require('fs');
const { CATEGORY_ORDER } = require('./utils/constants');

/**
 * Parses a single CSV line handling quotes and commas inside quotes
 */
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

/**
 * Parses CSV file or string into structured category -> product -> packs hierarchy
 */
function parseCSV(input) {
  let fileContent = input;
  if (typeof input === 'string' && !input.includes('\n') && fs.existsSync(input)) {
    fileContent = fs.readFileSync(input, 'utf8');
  }
  const lines = fileContent.split(/\r?\n/).filter(line => line.trim().length > 0);

  if (lines.length === 0) return {};

  const headers = parseCSVLine(lines[0]);
  const rows = lines.slice(1).map(parseCSVLine);

  const categories = {};
  let currentCategory = '';
  let currentProduct = '';

  for (const row of rows) {
    if (row.length < 5) continue;
    let [cat, prod, packType, weight, price, itemName] = row;

    // Standardize category and product if provided, or retain current
    if (cat && cat.trim() !== '') currentCategory = cat.trim();
    if (prod && prod.trim() !== '') currentProduct = prod.trim();

    if (!currentCategory || !currentProduct) continue;

    if (!categories[currentCategory]) {
      categories[currentCategory] = {};
    }
    if (!categories[currentCategory][currentProduct]) {
      categories[currentCategory][currentProduct] = [];
    }

    categories[currentCategory][currentProduct].push({
      type: packType ? packType.trim() : '',
      weight: weight ? weight.trim() : '',
      price: price ? price.trim() : '',
      itemName: itemName ? itemName.trim() : ''
    });
  }

  // Sort categories according to CATEGORY_ORDER
  const sortedCategories = {};
  
  // First add defined categories in order
  for (const catName of CATEGORY_ORDER) {
    if (categories[catName]) {
      sortedCategories[catName] = categories[catName];
    }
  }

  // Then add any remaining categories not listed in CATEGORY_ORDER
  for (const catName of Object.keys(categories)) {
    if (!sortedCategories[catName]) {
      sortedCategories[catName] = categories[catName];
    }
  }

  return sortedCategories;
}

/**
 * Parses D-gift-transpo CSV where:
 * - Col A (index 0) = Products contained in the box
 * - Col B (index 1) = Box Name
 * - Col J (index 9) = Price
 */
function parseGiftTranspoCSV(input) {
  if (!input) return [];
  let fileContent = input;
  if (typeof input === 'string' && !input.includes('\n') && fs.existsSync(input)) {
    fileContent = fs.readFileSync(input, 'utf8');
  }

  const lines = fileContent.split(/\r?\n/).filter(line => line.trim().length > 0);
  if (lines.length === 0) return [];

  const rows = lines.map(parseCSVLine);
  if (rows.length === 0) return [];

  // Detect header row
  let startIndex = 0;
  const firstRow = rows[0];
  const colA = (firstRow[0] || '').toLowerCase();
  const colB = (firstRow[1] || '').toLowerCase();
  const colJ = (firstRow[9] || '').toLowerCase();

  const isHeader = colA.includes('product') || colA.includes('contain') ||
                   colB.includes('box') || colB.includes('name') || colB.includes('sku') ||
                   colJ.includes('price') || colJ.includes('sp') ||
                   (firstRow[9] && isNaN(parseFloat(firstRow[9].replace(/[^0-9.]/g, ''))));

  if (isHeader) {
    startIndex = 1;
  }

  const items = [];
  for (let i = startIndex; i < rows.length; i++) {
    const row = rows[i];
    if (row.length < 2) continue;

    const contents = row[0] ? row[0].trim() : '';
    const boxName = row[1] ? row[1].trim() : '';
    const sku = (row.length > 2 && row[2]) ? row[2].trim() : '';
    const weight = (row.length > 3 && row[3]) ? row[3].trim() : '';
    const price = (row.length > 9 && row[9]) ? row[9].trim() : '';

    if (!boxName && !contents) continue;

    const lowerName = boxName.toLowerCase();
    const type = lowerName.includes('basket') ? 'Gift Basket' : (lowerName.includes('hamper') ? 'Gift Hamper' : 'Gift Box');

    items.push({
      boxName: boxName || 'Gift Box',
      contents: contents,
      sku: sku,
      weight: weight,
      price: price,
      type: type
    });
  }

  return items;
}

module.exports = {
  parseCSV,
  parseCSVLine,
  parseGiftTranspoCSV
};

