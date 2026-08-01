const { getLogoDataUrl } = require('../utils/helpers');

const generateCoverPage = (monthYear) => {
  const formattedMonthYear = monthYear.toUpperCase();

  // Load logo data URLs
  const pureTreeLogo = getLogoDataUrl('logo.jpg');
  const noChemicalLogo = getLogoDataUrl('no-chemical.png');
  const noAdditivesLogo = getLogoDataUrl('no-additives.png');
  const noArtificialLogo = getLogoDataUrl('no-artificial-flovour.png');
  const fssaiLogo = getLogoDataUrl('fssai.png');
  const indiaOrganicLogo = getLogoDataUrl('india-organic.png');
  const foodchainLogo = getLogoDataUrl('foodchain.png');
  const socialLogo = getLogoDataUrl('social-medial-logos.png');
  const iosplLogo = getLogoDataUrl('iospl-logo.png');

  return `
  <!-- Cover Page (Page 1) -->
  <div class="page cover-page">
    <div class="cover-header">
      <div class="cover-top-bar" style="position: relative;">
        <div class="brand-logo-container">
          <img class="brand-logo-img" src="${pureTreeLogo}" alt="Pure Tree" />
        </div>
        <span class="organic-pill" style="position: absolute; left: 50%; transform: translateX(-50%);">100% CERTIFIED ORGANIC</span>
        <div style="display: flex; flex-direction: column; align-items: flex-end;">
          <div class="price-list-box">
            <div class="pl-small">PRICE LIST</div>
            <h2 class="pl-large">${formattedMonthYear}</h2>
          </div>
          <div style="font-size: 11px; font-weight: 800; color: #134226; text-align: right; margin-top: 8px; line-height: 1.3;">
            <div style="margin-bottom: 3px;">
              CALL OR WHATSAPP TO ORDER
            </div>
            <div style="font-size: 14px; display: flex; align-items: center; justify-content: flex-end; gap: 6px;">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>+91 900 405 8669</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p class="cover-subtitle">
          FRESHLY MILLED FLOUR "ATTA" &nbsp;&bull;&nbsp; GRAINS &nbsp;&bull;&nbsp; MILLETS &nbsp;&bull;&nbsp; DALS & LENTILS &nbsp;&bull;&nbsp; SPICES & MASALAS &nbsp;&bull;&nbsp; SEEDS &nbsp;&bull;&nbsp; DRY FRUITS
        </p>
      </div>
    </div>

    <div class="stats-banner">
      <div class="stat-block">
        <div class="stat-title">⚡ Same-Day Delivery</div>
        <div class="stat-sub">Lower Parel • Prabhadevi • Worli</div>
      </div>
      <div class="stat-block">
        <div class="stat-title">🕒 Order Before 5 PM</div>
        <div class="stat-sub">Mon–Sat, 9:00 AM – 6:00 PM</div>
      </div>
      <div class="stat-block">
        <div class="stat-title">🌱 144+ Products</div>
        <div class="stat-sub">450+ Packaging Options</div>
      </div>
    </div>

    <div class="wheat-bg-section">
      <div style="flex: 1.1;">
        <h3 class="section-h3">🌾 WHAT DOES FRESHLY MILLED MEAN?</h3>
        <ul style="margin: 0; padding-left: 16px; font-size: 10.5px; line-height: 1.6; color: #2c3e35;">
          <li style="margin-bottom: 4px;">Freshly milled <strong>only after</strong> your order is confirmed.</li>
          <li style="margin-bottom: 4px;">Made from <strong>100% Certified Organic</strong> grains & millets.</li>
          <li style="margin-bottom: 4px;">Minimum heat, humidity & light exposure preserves nutrients.</li>
          <li style="margin-bottom: 4px;"><strong>Zero additives, zero preservatives</strong> added.</li>
          <li style="margin-bottom: 4px;">Crafted for freshness, delivered with care.</li>
          <li>Delivered fresh to your doorstep within 24 hours.</li>
        </ul>

        <div style="display: flex; gap: 15px; margin-top: 16px; align-items: flex-start;">
          <div style="text-align: center; flex: 1;">
            <img src="${noChemicalLogo}" alt="No Preservatives" style="height: 42px; width: auto; margin: 0 auto 4px; display: block;" />
            <div style="font-weight: 800; font-size: 8.5px; text-transform: uppercase; color: #134226;">NO PRESERVATIVES</div>
          </div>
          <div style="text-align: center; flex: 1;">
            <img src="${noAdditivesLogo}" alt="No Additives" style="height: 42px; width: auto; margin: 0 auto 4px; display: block;" />
            <div style="font-weight: 800; font-size: 8.5px; text-transform: uppercase; color: #134226;">NO ADDITIVES</div>
          </div>
          <div style="text-align: center; flex: 1;">
            <img src="${noArtificialLogo}" alt="No Artificial Flavours" style="height: 42px; width: auto; margin: 0 auto 4px; display: block;" />
            <div style="font-weight: 800; font-size: 8.5px; text-transform: uppercase; color: #134226;">NO ARTIFICIAL FLAVORS</div>
          </div>
        </div>
      </div>

      <div style="flex: 1.2;">
        <h3 class="section-h3" style="text-align: center;">⚡ WHY CHOOSE PURE TREE ATTA?</h3>
        <table class="comparison-table">
          <thead>
            <tr>
              <th style="width: 45%;">Packaged Market Atta</th>
              <th>Freshly Milled Atta Pure Tree</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Sourced origin not disclosed</td>
              <td>100% Certified Organic grains direct from farms</td>
            </tr>
            <tr>
              <td>Broken or mixed quality grains possible</td>
              <td>Every batch quality & grain size checked</td>
            </tr>
            <tr>
              <td>Stored for months in warehouses</td>
              <td>Milled fresh after order placement</td>
            </tr>
            <tr>
              <td>Additives added for shelf life</td>
              <td>No additives or preservatives added</td>
            </tr>
            <tr>
              <td>Loses natural aroma & nutrition</td>
              <td>Delivered fresh within 24 hours</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="bottom-section">
      <!-- Left Column -->
      <div style="flex: 1; display: flex; flex-direction: column; gap: 6px; font-size: 9.5px; line-height: 1.4;">
        <div>
          <strong style="color: #134226; font-size: 10.5px;">Why Organic Certification Matters?</strong>
          <ul style="margin: 3px 0 0 0; padding-left: 15px; color: #444;">
            <li>Certified Organic ensures the product is really organic.</li>
            <li>Certified Organic ensures the product should not get any contamination till it reaches your hands.</li>
            <li>Certified Organic ensures the farms, storage facilities, as well as packaging facilities, are compliant with organic certification rules.</li>
          </ul>
        </div>
        
        <div style="color: #444;">
          <strong style="color: #134226;">PureTree® Foods</strong> is all about healthy food choices. We offer a variety of different organic foods & natural ingredients which are safe for you and the environment. Working in close partnership with our suppliers enables us to offer the highest quality products. Our mission is to make healthy living available and affordable
        </div>

        <div style="color: #444;">
          <strong style="color: #134226;">You Buy, We Give —</strong> With every purchase you make from Pure Tree a part of the amount goes to the feed the needy and for maintaining a sustainable environment.
        </div>

        <div style="color: #444;">
          <strong style="color: #134226;">Shipping Information —</strong> All the shipments within Mumbai be made using WeFast, and others using Bluedart/Fedex/Delhivery. Shipping is charged as per actuals.
        </div>

        <div style="color: #444;">
          <strong style="color: #134226;">Trusted & Traceable —</strong> Pure Tree products are grown in certified organic farms, maintaining the highest standards that are 100% Certified with <strong>India Organic/Jaivik Bharat (ORG/SC/ 2305/000932) & Food Chain NPOP/NAB/0045.</strong>
        </div>

        <!-- Certifications -->
        <div style="display: flex; justify-content: space-around; align-items: center; padding-top: 4px; border-top: 1px solid #e0e0e0;">
          <div style="text-align: center; font-size: 8px; font-weight: 700;">
            <img src="${fssaiLogo}" class="cert-logo-img" alt="FSSAI" style="display:block; margin:0 auto 2px;" />
            10017022006293
          </div>
          <div style="text-align: center; font-size: 8px; font-weight: 700;">
            <img src="${indiaOrganicLogo}" class="cert-logo-img" alt="India Organic" style="display:block; margin:0 auto 2px;" />
            ORG/SC/2305/000932
          </div>
          <div style="text-align: center; font-size: 8px; font-weight: 700;">
            <img src="${foodchainLogo}" alt="Foodchain" style="display:block; margin:0 auto 2px; height: 38px; width: auto; object-fit: contain;" />
            NPOP/NAB/0045
          </div>
        </div>

        <!-- Contact Box -->
        <div style="text-align: center; padding-top: 4px; border-top: 1px solid #e0e0e0; margin-top: 2px;">
          <div style="font-size: 11px; font-weight: 800; color: #134226; letter-spacing: 0.5px;">CALL OR WHATSAPP TO ORDER</div>
          <div style="font-size: 13.5px; font-weight: 800; color: #134226; margin: 1px 0;">
            📞 +91 900 405 8669
          </div>
          <div style="display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 4px;">
            <img src="${socialLogo}" alt="Social Media" style="height: 22px; width: auto; object-fit: contain;" />
            <span style="font-size: 9.5px; color: #333; font-weight: 600; text-align: left; line-height: 1.3;">
              care@puretreefoods.com • @puretreefoods<br>
              <strong style="color: #134226;">www.puretreefoods.com</strong>
            </span>
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div style="flex: 1; display: flex; flex-direction: column; gap: 10px;">
        
        <!-- PROPERLY ALIGNED 4 STEPS BOX -->
        <div class="steps-box">
          <div class="steps-title">HOW TO ORDER IN 4 EASY STEPS</div>
          <div class="steps-grid">
            <div class="step-card">
              <div class="step-num">1</div>
              <div class="step-desc">Browse list & note products</div>
            </div>
            <div class="step-card">
              <div class="step-num">2</div>
              <div class="step-desc">WhatsApp +91 900 405 8669</div>
            </div>
            <div class="step-card">
              <div class="step-num">3</div>
              <div class="step-desc">Confirm & pay via UPI / Card</div>
            </div>
            <div class="step-card">
              <div class="step-num">4</div>
              <div class="step-desc">Same-day fresh delivery!</div>
            </div>
          </div>
        </div>

        <div class="legend-box">
          <div class="legend-title">PACKAGING LEGEND</div>
          <div class="legend-grid">
            <div class="legend-item"><span class="badge bp">BP</span> Brown Pouch</div>
            <div class="legend-item"><span class="badge gb">GB</span> Glass Bottle</div>
            <div class="legend-item"><span class="badge pj">PJ</span> Plastic Jar</div>
            <div class="legend-item"><span class="badge kg">KG</span> KG Bag (Bulk)</div>
          </div>
        </div>
        
        <!-- Payment info -->
        <div style="display: flex; gap: 10px; font-size: 10px; background: #f6faf7; padding: 10px; border-radius: 8px; border: 1px solid #cde2d3;">
          <div style="flex: 1; line-height: 1.45;">
            <strong style="color:#134226; font-size:11px;">Bank Transfer</strong><br>
            <strong>Infinite Online Shopping Pvt. Ltd.<br>
            ICICI Bank, Lower Parel Branch<br>
            A/C: 032305002941<br>
            IFSC: ICIC0000323 </strong>
          </div>
          <div style="flex: 1; text-align: center; line-height: 1.4;">
            <strong style="color:#134226; font-size:10px;">UPI Payments</strong><br>
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=70x70&data=upi://pay?pa=bimal1306@icici&pn=InfiniteOnline&cu=INR" style="margin: 3px auto; width: 50px; height: 50px; display: block;" alt="QR Code" />
           <strong> UPI ID: bimal1306@icici </strong>
          </div>
        </div>

        <!-- Footer company info -->
        <div style="text-align: center; margin-top: auto;">
          <img src="${iosplLogo}" style="height: 24px; width: auto; object-fit: contain; margin-bottom: 2px;" alt="Infinite Online Shopping" /><br>
          <strong style="font-size: 10px; color: #134226;">Infinite Online Shopping Pvt. Ltd.</strong><br>
          <div style="font-size: 8.5px; color: #2f2f2fff; line-height: 1.3;">
            Laxmi Industrial Estate, Lower Parel, Mumbai 400 013, Maharashtra.
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
};

module.exports = {
  generateCoverPage
};
