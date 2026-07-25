const { getStyles } = require('./styles');
const { generateCoverPage } = require('./cover');
const { generateProductPages } = require('./products');
const { generateFooterGuide } = require('./footer-guide');

const renderFullHTML = (categories, monthYear) => {
  const stylesHTML = getStyles();
  const coverHTML = generateCoverPage(monthYear);
  const productsHTML = generateProductPages(categories, monthYear);
  const footerGuideHTML = generateFooterGuide();
  
  const backCoverHTML = `
    <div class="page" style="display: flex; flex-direction: column; justify-content: center; padding: 40px 0;">
      ${footerGuideHTML}
    </div>
  `;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Pure Tree Price List - ${monthYear}</title>
  <style>
    ${stylesHTML}
  </style>
</head>
<body>
  ${coverHTML}
  ${productsHTML}
  ${backCoverHTML}
</body>
</html>
  `;
};

module.exports = {
  renderFullHTML
};
