const getStyles = () => `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap');

  * {
    box-sizing: border-box;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  body {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    margin: 0;
    padding: 0;
    color: #1c2b22;
    background-color: #ffffff;
    font-size: 13px;
    line-height: 1.4;
  }

  .page {
    width: 210mm;
    min-height: 297mm;
    padding: 0;
    background: #ffffff;
    page-break-after: always;
    position: relative;
    box-sizing: border-box;
    overflow: hidden;
  }

  /* ==========================================================================
     COVER PAGE STYLES
     ========================================================================== */
  .cover-page {
    display: flex;
    flex-direction: column;
    height: 297mm;
  }

  .cover-header {
    background: #ffffff;
    padding: 22px 32px 18px;
    color: #134226;
    position: relative;
    border-bottom: 2px solid #134226;
  }

  .cover-top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 14px;
  }

  .brand-logo-container {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .brand-logo-img {
    height: 120px;
    width: 320px; 
    background-color: #134226;
    -webkit-mask-size: contain;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-position: center left;
    mask-size: contain;
    mask-repeat: no-repeat;
    mask-position: center left;
  }

  .organic-pill {
    background: linear-gradient(135deg, #134226 0%, #1b5833 100%);
    color: #ffffff;
    padding: 7px 12px;
    border-radius: 20px;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 1px;
    box-shadow: 0 2px 6px rgba(19,66,38,0.2);
    text-transform: uppercase;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .price-list-box {
    border: 1.5px solid #134226;
    border-radius: 10px;
    padding: 8px 16px;
    background: rgba(19,66,38,0.05);
    text-align: right;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .pl-small {
    font-size: 9.5px;
    font-weight: 800;
    letter-spacing: 2px;
    margin-bottom: 2px;
    color: #1e5c38;
    text-transform: uppercase;
  }

  .pl-large {
    font-size: 24px;
    font-weight: 800;
    margin: 0;
    letter-spacing: 1.2px;
    color: #134226;
  }

  .cover-subtitle {
    font-size: 13.5px; /* Increased font size */
    color: #2c3e35;
    font-weight: 700;
    margin: 4px 0 0 0;
    letter-spacing: 1.2px;
    line-height: 1.6;
    text-transform: uppercase;
  }

  /* Stats Banner */
  .stats-banner {
    background: linear-gradient(180deg, #f0f7f2 0%, #ffffff 100%);
    padding: 12px 32px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 2px solid #134226;
  }

  .stat-block {
    text-align: center;
    flex: 1;
  }

  .stat-block:not(:last-child) {
    border-right: 1px solid #d2e4d7;
  }

  .stat-title {
    font-weight: 800;
    color: #134226;
    margin-bottom: 2px;
    font-size: 16px; /* Increased font size */
  }

  .stat-sub {
    font-size: 13px; /* Increased font size */
    color: #555;
    font-weight: 500;
  }

  /* Wheat Section */
  .wheat-bg-section {
    background: linear-gradient(135deg, #f7f3ec 0%, #ede6dc 100%);
    padding: 18px 32px;
    display: flex;
    gap: 24px;
    border-top: 1px solid #dfd5c6;
    border-bottom: 1px solid #dfd5c6;
  }

  .section-h3 {
    font-size: 15.5px;
    color: #134226;
    font-weight: 800;
    margin: 0 0 10px 0;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  .comparison-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    border-radius: 6px;
    overflow: hidden;
    border: 1px solid #c8bfae;
  }

  .comparison-table th, .comparison-table td {
    padding: 8px;
    text-align: left;
    font-size: 11.5px;
    line-height: 1.35;
  }

  .comparison-table th {
    background: #134226;
    color: #ffffff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 11px;
    letter-spacing: 0.5px;
    border-right: 1px solid #1e5c38;
  }

  .comparison-table td {
    background: rgba(255,255,255,0.65);
    border-bottom: 1px solid #e2d9cb;
    border-right: 1px solid #e0e6e2;
  }

  .comparison-table tr:last-child td {
    border-bottom: none;
  }

  .comparison-table td:last-child {
    background: rgba(19,66,38,0.08);
    font-weight: 600;
    color: #0f361f;
  }

  /* Cover Bottom Section */
  .bottom-section {
    display: flex;
    gap: 24px;
    padding: 16px 32px;
    flex: 1;
    background: #ffffff;
  }

  .cert-logo-img {
    height: 38px;
    width: auto;
    object-fit: contain;
  }

  .legend-box {
    border: 1px solid #cde2d3;
    background: #f6faf7;
    border-radius: 8px;
  }

  .legend-title {
    background: #f0f5f2;
    color: #134226;
    padding: 8px;
    font-weight: 800;
    font-size: 11px;
    text-align: center;
    border-bottom: 1px solid #cde2d3;
    letter-spacing: 1px;
  }

  .legend-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    padding: 12px;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 10.5px;
    color: #444;
    font-weight: 600;
  }

  /* 4 STEPS SECTION */
  .steps-box {
    border: 1.5px solid #134226;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(19,66,38,0.06);
  }

  .steps-title {
    background: linear-gradient(90deg, #134226 0%, #1e5c38 100%);
    color: white;
    padding: 8px;
    font-weight: 800;
    font-size: 12px;
    text-align: center;
    letter-spacing: 1px;
  }

  .steps-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    padding: 12px;
  }

  .step-card {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #f4f9f5;
    border: 1px solid #d5e6db;
    border-radius: 6px;
    padding: 6px 8px;
  }

  .step-num {
    width: 24px;
    height: 24px;
    background: #f0f5f2;
    color: #134226;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 13px;
    flex-shrink: 0;
  }

  .step-desc {
    font-size: 11px;
    color: #333;
    font-weight: 600;
    line-height: 1.3;
  }

  /* LIGHTER, ELEGANT SUBTLE BADGES */
  .badge {
    display: inline-block;
    padding: 1.5px 4px;
    border-radius: 3px;
    font-weight: 700;
    font-size: 8px;
    text-align: center;
    letter-spacing: 0.5px;
    line-height: 1.1;
  }

  .badge.bp { background: #f9f6f2; color: #6e5441; border: 1px solid #e8ded4; }
  .badge.gb { background: #f2f7fa; color: #375b75; border: 1px solid #d8e5ef; }
  .badge.pj { background: #fdfaf2; color: #756231; border: 1px solid #f2e9d0; }
  .badge.kg { background: #f3f8f4; color: #285437; border: 1px solid #d3e5d8; }
  .badge.badge-default { background: #f4f4f4; color: #555; border: 1px solid #ddd; }

  /* ==========================================================================
     PRODUCT LISTING PAGE STYLES (FIXED 3-COLUMN GRID ALIGNMENT)
     ========================================================================== */
  .page-content {
    padding: 20px 32px;
  }

  .list-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-bottom: 10px;
    border-bottom: 2px solid #134226;
    margin-bottom: 16px;
  }

  .lh-title {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    font-weight: 700;
    color: #134226;
  }

  .lh-sub {
    font-size: 10px;
    color: #666;
    font-weight: 500;
  }

  /* Category Block */
  .category-section {
    margin-bottom: 18px;
    border: 1px solid #cde2d3;
    border-radius: 8px;
    overflow: hidden;
    background: #ffffff;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  }

  .cat-header {
    background: linear-gradient(90deg, #134226 0%, #1e5c38 100%);
    color: white;
    padding: 8px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    page-break-after: avoid; /* Prevent header from being orphaned */
  }

  .cat-title {
    font-weight: 800;
    font-size: 12px;
    letter-spacing: 0.8px;
    text-transform: uppercase;
  }

  .cat-sub {
    font-size: 9.5px;
    color: #d1ebd8;
    font-weight: 400;
    font-style: italic;
  }

  /* PRODUCT TABLE LAYOUT */
  .product-table {
    width: 100%;
    border-collapse: collapse;
  }

  .product-table th {
    background: #eef5f0;
    color: #134226;
    font-size: 9px;
    font-weight: 900; /* Increased font weight */
    text-transform: uppercase;
    letter-spacing: 1.5px; /* Slight letter spacing increase */
    padding: 8px 16px;
    border-bottom: 1.5px solid #c8ded0;
    text-align: left;
  }

  th.col-pack-grid {
    text-align: center; /* Move away from product name */
  }

  .col-prod-name {
    width: 33%;
  }

  .col-pack-grid {
    width: 67%;
  }

  /* ALTERNATING ROW HIGHLIGHTS */
  .product-row {
    border-bottom: 1px solid #e4ede6;
    background-color: #ffffff;
    page-break-inside: avoid;
  }

  .product-row.alt-row {
    background-color: #f0f5f2 !important;
  }

  .product-row:last-child {
    border-bottom: none;
  }

  .cell-product-name {
    padding: 12px 16px;
    vertical-align: middle;
  }

  .prod-main-name {
    font-size: 11.5px;
    font-weight: 700;
    color: #1a231e;
    line-height: 1.3;
  }
  
  .prod-sub-name {
    font-size: 9.5px;
    color: #59605bff;
    font-weight: 550;
    margin-top: 2px;
  }

  .cell-pack-grid {
    padding: 10px 16px 12px 16px;
    vertical-align: middle;
  }

  /* FIXED 5-COLUMN PACK CARD GRID */
  .packs-grid-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 14px 4px; /* Vertical gap accounts for badges, reduced horizontal gap for 5 columns */
    align-items: stretch;
  }

  .pack-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid #e0e6e2;
    border-radius: 5px;
    padding: 11px 2px 4px 2px; /* Increased top padding significantly to prevent ribbon overlap on wrapped text */
    background: #ffffff;
    position: relative;
  }

  .pack-card.best-value {
    background: #f4f8f5;
    border-color: #c9dbc1;
  }

  .best-value-ribbon {
    position: absolute;
    top: -7px;
    background: #60863c; /* Olive green from image */
    color: #ffffff;
    font-size: 7.5px;
    font-weight: 800;
    padding: 2px 8px;
    border-radius: 3px;
    letter-spacing: 0.5px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 1px 3px rgba(0,0,0,0.15);
  }

  .pack-weight-type {
    font-size: 9.5px;
    color: #444945ff;
    font-weight: 650;
    text-align: center;
    line-height: 1.1;
  }

  .pack-price-large {
    font-size: 12.5px;
    color: #134226;
    font-weight: 800;
    margin-top: 2px;
  }

  /* ==========================================================================
     FOOTER GUIDE STYLES
     ========================================================================== */
  .footer-guide-container {
    page-break-inside: avoid;
    margin: 16px 16px 16px 16px;
    font-family: 'Inter', sans-serif;
  }

  .custom-recipe-banner {
    background: linear-gradient(90deg, #134226 0%, #1e5c38 100%);
    color: white;
    text-align: center;
    padding: 10px 16px;
    font-size: 14px;
    font-weight: 900;
    letter-spacing: 1px;
    border-radius: 8px;
    margin-bottom: 16px;
    box-shadow: 0 4px 12px rgba(19,66,38,0.15);
  }

  .custom-recipe-banner span {
    color: #a3e0b5; /* Light green accent */
    margin: 0 8px;
    font-size: 13px;
  }

  .guide-top-boxes {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 16px;
  }

  .guide-box {
    flex: 1;
    border: 1.5px solid #134226;
    border-radius: 10px;
    padding: 6px;
    text-align: center;
    margin: 0;
  }

  .guide-icon {
    margin: 0 auto;
    padding: 0 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #134226;
  }

  .guide-icon svg {
    width: 32px;
    height: 32px;
    margin-bottom: -2px;
  }

  .guide-icon span {
    font-size: 8.5px;
    font-weight: 800;
    margin-top: 2px;
  }

  .guide-box-title {
    font-size: 9.5px;
    font-weight: 800;
    color: #333;
    line-height: 1.2;
  }

  .guide-box-sub {
    font-size: 9.5px;
    font-weight: 800;
    color: #333;
    line-height: 1.2;
  }

  .guide-box-detail {
    font-size: 8px;
    font-weight: 800;
    color: #134226;
    margin-top: 4px;
    letter-spacing: 0.2px;
  }

  .guide-bullets {
    padding-left: 10px;
    font-size: 12px;
    color: #333;
    line-height: 1.5;
    margin-bottom: 16px;
  }

  .guide-bullets li {
    margin-bottom: 6px;
  }

  .flour-tags-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    justify-content: center;
    margin-bottom: 24px;
  }

  .flour-tag {
    border: 1.5px solid #134226;
    border-radius: 8px;
    padding: 8px 6px;
    text-align: center;
    font-size: 11px;
    font-weight: 800;
    color: #134226;
    text-transform: uppercase;
    width: calc(14.28% - 12px); /* 7 columns */
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 52px;
    line-height: 1.2;
  }

  .guide-bottom-bar {
    background: #134226;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 24px;
  }

  .guide-social {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
  }
  
  .social-icons {
    display: flex;
    gap: 12px;
    margin-bottom: 4px;
  }

  .social-icons svg {
    width: 20px;
    height: 20px;
  }

  .guide-center-text {
    text-align: center;
    font-size: 15px;
    font-weight: 600;
    line-height: 1.4;
  }

  .guide-whatsapp {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    font-weight: 600;
  }
  
  .guide-whatsapp svg {
    width: 24px;
    height: 24px;
  }
`;

module.exports = {
  getStyles
};
