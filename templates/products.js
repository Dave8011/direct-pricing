const { CATEGORY_DISPLAY_NAMES, CATEGORY_SUBTEXTS, PACKAGE_BADGES } = require('../utils/constants');
const { formatWeight, formatPrice } = require('../utils/helpers');

/**
 * Renders product listing tables with fixed 3-column pack grid slots for pixel-perfect alignment
 */
const generateProductPages = (categories, monthYear) => {
  const monthYearCapitalized = monthYear
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');

  let html = `
  <!-- Product Listing Page -->
  <div class="page page-content">
    <div class="list-header">
      <div>
        <div class="lh-title">Pure Tree <sup>®</sup> Organic Price List</div>
        <div style="font-size: 11px; font-weight: 700; color: #134226; margin-top: 2px;">
          Effective Month: ${monthYearCapitalized}
        </div>
      </div>
      <div class="lh-sub" style="text-align: right;">
        All prices in ₹ (INR), inclusive of taxes<br>
        Same-day delivery: Lower Parel, Prabhadevi & Worli
      </div>
    </div>
  `;

  const categoryKeys = Object.keys(categories);

  categoryKeys.forEach((catKey) => {
    const displayName = CATEGORY_DISPLAY_NAMES[catKey] || catKey;
    const subtext = CATEGORY_SUBTEXTS[catKey] || '100% Certified Organic • Premium Quality';
    const products = categories[catKey];
    const productNames = Object.keys(products);

    if (productNames.length === 0) return;

    html += `
      <div class="category-section">
        <div class="cat-header">
          <div class="cat-title">${displayName}</div>
          <div class="cat-sub">${subtext}</div>
        </div>

        <table class="product-table">
          <thead>
            <tr>
              <th class="col-prod-name">PRODUCT NAME</th>
              <th class="col-pack-grid">
                AVAILABLE PACKS, PACKAGING & PRICES
                <div style="font-size: 7.5px; font-weight: 700; color: #2c593d; margin-top: 3px; letter-spacing: 0.5px;">
                  BP = BROWN POUCH <span style="margin:0 4px; color:#95bda3;">|</span> GB = GLASS BOTTLE <span style="margin:0 4px; color:#95bda3;">|</span> PJ = PLASTIC JAR <span style="margin:0 4px; color:#95bda3;">|</span> KG = KG BAG (BULK)
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
    `;

    productNames.forEach((prodName, idx) => {
      const packs = products[prodName];
      const isAltRow = idx % 2 === 1; // Alternating zebra row
      
      let mainName = prodName;
      let subName = '';
      if (prodName.includes('(') && prodName.includes(')')) {
        const match = prodName.match(/(.*)\s*(\(.*?\))/);
        if (match) {
          mainName = match[1].trim();
          subName = match[2].trim();
        }
      }

      html += `
        <tr class="product-row ${isAltRow ? 'alt-row' : ''}">
          <td class="cell-product-name col-prod-name">
            <div class="prod-main-name">${mainName}</div>
            ${subName ? `<div class="prod-sub-name">${subName}</div>` : ''}
          </td>
          <td class="cell-pack-grid col-pack-grid">
            <div class="packs-grid-container">
              ${packs.map((pack, pIdx) => {
                const formattedW = formatWeight(pack.weight);
                const formattedP = formatPrice(pack.price);
                const isBestValue = packs.length > 1 && pIdx === packs.length - 1;
                
                const typeKey = Object.keys(PACKAGE_BADGES).find(
                  k => k.toLowerCase() === pack.type.trim().toLowerCase()
                );
                const shortCode = typeKey ? PACKAGE_BADGES[typeKey].code : pack.type;
                
                return `
                  <div class="pack-card ${isBestValue ? 'best-value' : ''}">
                    ${isBestValue ? '<div class="best-value-ribbon"><svg style="width:7px;height:7px;margin-right:3px;fill:currentColor;" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>BEST VALUE</div>' : ''}
                    <div class="pack-weight-type">${formattedW} (${shortCode})</div>
                    <div class="pack-price-large">${formattedP}</div>
                  </div>
                `;
              }).join('')}
            </div>
          </td>
        </tr>
      `;
    });

    html += `
          </tbody>
        </table>
      </div>
    `;
  });

  html += `
  </div>
  `;

  return html;
};

module.exports = {
  generateProductPages
};
