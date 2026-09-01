const CATEGORY_ORDER = [
  'FLOURS-FRESHLY MILLED',
  'ORGANIC GRAINS',
  'ORGANIC DALS & LENTILS',
  'ORGANIC MILLETS',
  'ORGANIC SPICE & MASALA',
  'ORGANIC SEEDS',
  'ORGANIC DRY FRUITS',
  'ORGANIC OTHER',
  'GROCERY - HAMPERS AND GIFTING'
];

const CATEGORY_DISPLAY_NAMES = {
  'FLOURS-FRESHLY MILLED': 'Freshly Milled Flours (Atta)',
  'ORGANIC GRAINS': 'Organic Whole Grains & Rice',
  'ORGANIC DALS & LENTILS': 'Organic Dals & Pulses',
  'ORGANIC MILLETS': 'Organic Superfood Millets',
  'ORGANIC SPICE & MASALA': 'Organic Spices & Masalas',
  'ORGANIC SEEDS': 'Organic Healthy Seeds',
  'ORGANIC DRY FRUITS': 'Organic Dry Fruits & Nuts',
  'ORGANIC OTHER': 'Organic Sweeteners & Essentials',
  'GROCERY - HAMPERS AND GIFTING': 'Hampers & Gifting'
};

const CATEGORY_SUBTEXTS = {
  'FLOURS-FRESHLY MILLED': 'Milled fresh upon order confirmation — zero preservatives or storage.',
  'ORGANIC GRAINS': 'Certified organic whole grains, unpolished and nutrient-rich.',
  'ORGANIC DALS & LENTILS': 'Unpolished dals direct from certified organic farms.',
  'ORGANIC MILLETS': 'Gluten-free traditional super-grains rich in fiber.',
  'ORGANIC SPICE & MASALA': 'Aromatic, pure spices with natural essential oils intact.',
  'ORGANIC SEEDS': 'Raw, unroasted natural seeds packed with nutrition.',
  'ORGANIC DRY FRUITS': 'Handpicked premium organic nuts and raisins.',
  'ORGANIC OTHER': 'Natural jaggery, unrefined sugar, rava & healthy staples.',
  'GROCERY - HAMPERS AND GIFTING': 'Thoughtfully curated healthy hampers for your loved ones.'
};

const PACKAGE_BADGES = {
  'Brown Pouch': { code: 'BP', label: 'Brown Pouch', class: 'bp' },
  'Glass Bottle': { code: 'GB', label: 'Glass Bottle', class: 'gb' },
  'Plastic Jar': { code: 'PJ', label: 'Plastic Jar', class: 'pj' },
  'KG Bag': { code: 'KG', label: 'KG Bag (Bulk)', class: 'kg' }
};

module.exports = {
  CATEGORY_ORDER,
  CATEGORY_DISPLAY_NAMES,
  CATEGORY_SUBTEXTS,
  PACKAGE_BADGES
};
