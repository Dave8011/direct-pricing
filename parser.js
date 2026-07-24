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
 * Parses CSV file into structured category -> product -> packs hierarchy
 */
function parseCSV(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const lines = fileContent.split(/\r?\n/).filter(line => line.trim().length > 0);

  if (lines.length === 0) return {};

  const headers = parseCSVLine(lines[0]);
  const rows = lines.slice(1).map(parseCSVLine);

  const categories = {};
  let currentCategory = '';
  let currentProduct = '';

  for (const row of rows) {
    if (row.length < 5) continue;
    let [cat, prod, packType, weight, price] = row;

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
      price: price ? price.trim() : ''
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

module.exports = {
  parseCSV,
  parseCSVLine
};
