const generateFooterGuide = () => {
  return `
    <div class="footer-guide-container">
      
      <!-- Custom Recipe Banner -->
      <div class="custom-recipe-banner">
        <span>★</span> WE MAKE FRESH CUSTOMISED FLOUR. GIVE YOUR OWN RECIPE <span>★</span>
      </div>

      <!-- Top 4 Boxes (Fieldsets) -->
      <div class="guide-top-boxes">
        
        <fieldset class="guide-box">
          <legend class="guide-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="#134226" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path> <!-- Approximating a muscle/strength or just generic abstract icon -->
            </svg>
            <span>HIGH PROTEIN</span>
          </legend>
          <div class="guide-box-title">MULTI GRAIN FLOURS</div>
          <div class="guide-box-sub">(HIGH PROTEIN ATTA)</div>
          <div class="guide-box-detail">WHEAT+RAGI+BAJRA+JOWAR</div>
        </fieldset>

        <fieldset class="guide-box">
          <legend class="guide-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="#134226" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>FASTING</span>
          </legend>
          <div class="guide-box-title">FASTING FLOURS</div>
          <div class="guide-box-sub">AMARANTH FLOUR &</div>
          <div class="guide-box-detail">BARNYARD MILLET FLOUR</div>
        </fieldset>

        <fieldset class="guide-box">
          <legend class="guide-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="#134226" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2v20M12 22l4-4M12 22l-4-4M12 12l4-4M12 12l-4-4M12 2l4 4M12 2L8 6"></path>
            </svg>
            <span>LOW GLUTEN</span>
          </legend>
          <div class="guide-box-title">LOW GLUTEN FLOURS</div>
          <div class="guide-box-sub">KHAPLI WHEAT FLOUR</div>
          <div class="guide-box-detail">&nbsp;</div>
        </fieldset>

        <fieldset class="guide-box">
          <legend class="guide-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="#134226" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
              <path d="M12 8v8M10 10l4 4M14 10l-4 4"></path>
            </svg>
            <span>GLUTEN FREE</span>
          </legend>
          <div class="guide-box-title">GLUTEN FREE FLOURS</div>
          <div class="guide-box-sub">MILLETS FLOUR &</div>
          <div class="guide-box-detail">MIX MILLETS FLOUR</div>
        </fieldset>

      </div>

      <!-- Middle Bullets -->
      <ul class="guide-bullets">
        <li>
          GRAINS FLOUR CONSISTENCY CAN BE CHOOSEN BETWEEN<br>
          <strong>FINE, MEDIUM (PUNJABI ATTA), VERY FINE (BHAKARI AATA)</strong>
        </li>
        <li>
          SEPARATE FLOURS MILL FOR <strong>GLUTEN, NON-GLUTEN & FASTING FLOURS</strong>
        </li>
      </ul>

      <!-- Flour Tags Grid -->
      <div class="flour-tags-grid">
        <div class="flour-tag">KHAPLI<br>WHEAT<br>FLOUR</div>
        <div class="flour-tag">MP SEHORI<br>WHEAT<br>FLOUR</div>
        <div class="flour-tag">LOKWAN<br>WHEAT<br>FLOUR</div>
        <div class="flour-tag">RICE<br>FLOUR</div>
        <div class="flour-tag">SORGHUM<br>MILLET<br>FLOUR</div>
        <div class="flour-tag">PEARL<br>MILLET<br>FLOUR</div>
        <div class="flour-tag">BARNYARD<br>MILLET<br>FLOUR</div>

        <div class="flour-tag">FINGER<br>MILLET<br>FLOUR</div>
        <div class="flour-tag">PEARL<br>BARLEY<br>FLOUR</div>
        <div class="flour-tag">LITTLE<br>MILLET<br>FLOUR</div>
        <div class="flour-tag">FOXTAIL<br>MILLET<br>FLOUR</div>
        <div class="flour-tag">KODO<br>MILLET<br>FLOUR</div>
        <div class="flour-tag">BROWNTOP<br>MILLET<br>FLOUR</div>
        <div class="flour-tag">PROSO<br>MILLET<br>FLOUR</div>

        <div class="flour-tag">IDLI<br>RICE<br>FLOUR</div>
        <div class="flour-tag">AMARANTH<br>FLOUR</div>
        <div class="flour-tag">CHANA<br>DAL<br>FLOUR</div>
        <div class="flour-tag">WHITE<br>QUINOA<br>FLOUR</div>
        <div class="flour-tag">GREEN<br>GRAM<br>FLOUR</div>
        <div class="flour-tag">CHICKPEAS<br>FLOUR</div>
        <div class="flour-tag">MIX<br>GRAIN<br>FLOUR</div>
      </div>
    </div>
  `;
};

const generateBottomBar = () => {
  return `
    <div class="guide-bottom-bar" style="margin: 0 16px 8px 16px; border-radius: 8px;">
      <div class="guide-social">
        <div class="social-icons">
          <!-- Instagram -->
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
          <!-- X/Twitter -->
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="4" y1="4" x2="20" y2="20"></line>
            <line x1="20" y1="4" x2="4" y2="20"></line>
          </svg>
          <!-- Facebook -->
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
          </svg>
        </div>
        <div>@puretreefoods</div>
      </div>

      <div class="guide-center-text">
        Puretreefoods.com<br>
        <span style="font-weight: normal;">care@puretreefoods.com</span>
      </div>

      <div class="guide-whatsapp">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
        +91 900 405 8669
      </div>
    </div>
  `;
};

module.exports = {
  generateFooterGuide,
  generateBottomBar
};
