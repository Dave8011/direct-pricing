const { getStyles } = require('./styles');
const { generateCoverPage } = require('./cover');
const { generateProductPages } = require('./products');
const { generateFooterGuide, generateBottomBar } = require('./footer-guide');

const renderFullHTML = (categories, monthYear, newGiftingHampers = [], pdfType = 'complete') => {
  const stylesHTML = getStyles();
  const coverHTML = generateCoverPage(monthYear, pdfType);
  const footerGuideHTML = generateFooterGuide();
  const bottomBarHTML = generateBottomBar();
  const productsHTML = generateProductPages(categories, monthYear, footerGuideHTML, bottomBarHTML, newGiftingHampers, pdfType);
  const finalProductsHTML = productsHTML;

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
