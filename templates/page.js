const { getStyles } = require('./styles');
const { generateCoverPage } = require('./cover');
const { generateProductPages } = require('./products');
const { generateFooterGuide } = require('./footer-guide');

const renderFullHTML = (categories, monthYear) => {
  const stylesHTML = getStyles();
  const coverHTML = generateCoverPage(monthYear);
  const productsHTML = generateProductPages(categories, monthYear);
  const footerGuideHTML = generateFooterGuide();
  const finalProductsHTML = productsHTML.replace(/<\/div>\s*$/, footerGuideHTML + '\n</div>\n');

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
  ${finalProductsHTML}
</body>
</html>
  `;
};

module.exports = {
  renderFullHTML
};
