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

  // Detect header row and resolve column mapping dynamically
  let startIndex = 0;
  const firstRow = rows[0];
  const headers = firstRow.map(h => (h || '').toLowerCase().trim());

  const colA = headers[0] || '';
  const colB = headers[1] || '';
  const isHeader = colA.includes('product') || colA.includes('contain') ||
                   colB.includes('box') || colB.includes('name') ||
                   headers.some(h => h.includes('sku') || h.includes('sp') || h.includes('price'));

  // Default fallback column indexes: Col A=0, Col B=1, Col C=2, Col D=3, Col K=10 (or Col J=9)
  let colContents = 0;
  let colBoxName = 1;
  let colSku = 2;
  let colWeight = 3;
  let colPrice = 10;

  if (isHeader) {
    startIndex = 1;
    const findCol = (predicate) => headers.findIndex(predicate);

    const cBox = findCol(h => h.includes('box') || (h.includes('name') && !h.includes('prod')));
    if (cBox !== -1) colBoxName = cBox;

    const cProd = findCol(h => h.includes('product') || h.includes('contain') || h.includes('item'));
    if (cProd !== -1) colContents = cProd;

    const cSku = findCol(h => h.includes('sku'));
    if (cSku !== -1) colSku = cSku;

    const cWeight = findCol(h => h.includes('weight'));
    if (cWeight !== -1) colWeight = cWeight;

    // Matches 'Direct SP / Calculated cost', 'Selling Price', 'SP', 'Price'
    const cPrice = findCol(h => (h.includes('sp') || h.includes('selling') || h.includes('price')) && !h.includes('basic'));
    if (cPrice !== -1) colPrice = cPrice;
  }

  const items = [];
  for (let i = startIndex; i < rows.length; i++) {
    const row = rows[i];
    if (row.length < 2) continue;

    const contents = (row[colContents] || '').trim();
    const boxName = (row[colBoxName] || '').trim();
    const sku = (row[colSku] || '').trim();
    const weight = (row[colWeight] || '').trim();
    let price = (row[colPrice] || '').trim();
    if (!price && row[10]) price = row[10].trim();
    if (!price && row[9]) price = row[9].trim();

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

