const { PACKAGE_BADGES } = require('./constants');

function getBadgeHTML(packType) {
  const typeKey = Object.keys(PACKAGE_BADGES).find(
    k => k.toLowerCase() === packType.trim().toLowerCase()
  );

  const badgeInfo = typeKey ? PACKAGE_BADGES[typeKey] : null;

  if (badgeInfo) {
    return `<span class="badge ${badgeInfo.class}" title="${badgeInfo.label}">${badgeInfo.code}</span>`;
  }

  // Fallback badge
  const shortCode = packType.split(' ').map(w => w[0]).join('').slice(0, 3).toUpperCase();
  return `<span class="badge badge-default" title="${packType}">${shortCode}</span>`;
}

module.exports = {
  getBadgeHTML
};
