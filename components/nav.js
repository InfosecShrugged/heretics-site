/**
 * NetherOps Shared Nav Component
 * ================================
 * One file. Every page loads it. Edit here, updates everywhere.
 *
 * Usage: Add to EVERY page (homepage, doctrine, opptycon, etc.)
 *
 *   <!-- In the <body>, where the nav should appear: -->
 *   <div id="site-nav"></div>
 *   <script src="/components/nav.js"></script>
 *
 * The script injects the nav HTML + styles into #site-nav.
 * Pages can set an active state by adding a data attribute:
 *
 *   <div id="site-nav" data-active="opptycon"></div>
 *   <div id="site-nav" data-active="doctrine"></div>
 *   <div id="site-nav" data-active="services"></div>
 *
 * For OpptyCon subpages, set which dropdown item is active:
 *
 *   <div id="site-nav" data-active="opptycon" data-sub="capital"></div>
 *   <div id="site-nav" data-active="opptycon" data-sub="operators"></div>
 */
(function () {
  'use strict';

  const container = document.getElementById('site-nav');
  if (!container) return;

  const active = (container.dataset.active || '').toLowerCase();
  const activeSub = (container.dataset.sub || '').toLowerCase();

  // === NAV HTML ===
  container.innerHTML = `
    <nav class="sn" id="siteNav">
      <div class="sn-inner">
        <a href="/" class="sn-logo">
          <img src="/assets/netherops-logo-black.svg" alt="NetherOps"
               onerror="this.outerHTML='<span class=\\'sn-logo-text\\'>netherops</span>'">
        </a>

        <ul class="sn-links" id="snLinks">
          <li><a href="/doctrine/" class="${active === 'doctrine' ? 'sn-active' : ''}">Doctrine</a></li>
          <li><a href="/#services" class="${active === 'services' ? 'sn-active' : ''}">Services</a></li>
          <li class="sn-dropdown${active === 'opptycon' ? ' sn-active-parent' : ''}">
            <button class="sn-dropdown-toggle" aria-expanded="false">
              OpptyCon
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 4.5L6 7.5L9 4.5"/></svg>
            </button>
            <div class="sn-dropdown-panel">
              <a href="/opptycon/" class="${activeSub === 'overview' ? 'sn-sub-active' : ''}">Overview</a>
              <div class="sn-divider"></div>
              <a href="/opptycon/operators/" class="${activeSub === 'operators' ? 'sn-sub-active' : ''}">
                Operators
                <span class="sn-sub-label">RevOps · MarOps</span>
              </a>
              <a href="/opptycon/heads-of-gtm/" class="${activeSub === 'heads-of-gtm' ? 'sn-sub-active' : ''}">
                GTM Leaders
                <span class="sn-sub-label">VP Marketing · CMO · Demand Gen</span>
              </a>
              <a href="/opptycon/finance/" class="${activeSub === 'finance' ? 'sn-sub-active' : ''}">
                Finance
                <span class="sn-sub-label">CFO · FP&amp;A · Strategic Finance</span>
              </a>
              <a href="/opptycon/leadership/" class="${activeSub === 'leadership' ? 'sn-sub-active' : ''}">
                Leadership
                <span class="sn-sub-label">CEO · CRO · COO</span>
              </a>
              <a href="/opptycon/capital/" class="${activeSub === 'capital' ? 'sn-sub-active' : ''}">
                Capital
                <span class="sn-sub-label">VC · PE · Operating Partners</span>
              </a>
            </div>
          </li>
          <li><a href="/doctrine/#library" class="${active === 'library' ? 'sn-active' : ''}">Library</a></li>
          <li><a href="https://heretics.io" class="${active === 'about' ? 'sn-active' : ''}">About</a></li>
        </ul>

        <div class="sn-actions">
          <a href="/#briefing" class="sn-cta">Book a Briefing</a>
        </div>

        <button class="sn-hamburger" id="snHamburger" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  `;

  // === STYLES ===
  const style = document.createElement('style');
  style.textContent = `
    /* ============================================
       SHARED NAV — netherops.io
       Single source of truth for all pages.
       ============================================ */
    .sn {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 9000;
      height: 64px;
      background: rgba(235,235,235,0.85);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(0,0,0,0.13);
      font-family: 'TWK Everett', 'Helvetica Neue', sans-serif;
    }

    .sn-inner {
      max-width: 1320px;
      margin: 0 auto;
      padding: 0 32px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    /* Logo */
    .sn-logo {
      display: flex;
      align-items: center;
      text-decoration: none;
      flex-shrink: 0;
    }

    .sn-logo img {
      height: 24px;
      width: auto;
    }

    .sn-logo-text {
      font-family: 'TWK Everett', 'Helvetica Neue', sans-serif;
      font-size: 18px;
      font-weight: 400;
      color: #111111;
      letter-spacing: -0.02em;
    }

    /* Nav links */
    .sn-links {
      display: flex;
      align-items: center;
      gap: 0;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .sn-links > li > a,
    .sn-links > li > button {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 8px 16px;
      font-family: 'Chivo Mono', 'Space Mono', monospace;
      font-size: 12px;
      font-weight: 500;
      color: #909090;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      text-decoration: none;
      background: none;
      border: none;
      cursor: pointer;
      transition: color 0.2s;
      white-space: nowrap;
    }

    .sn-links > li > a:hover,
    .sn-links > li > button:hover,
    .sn-links > li > a.sn-active {
      color: #111111;
    }

    .sn-active-parent > button {
      color: #1a1918 !important;
    }

    /* Dropdown */
    .sn-dropdown {
      position: relative;
    }

    .sn-dropdown-toggle svg {
      width: 10px;
      height: 10px;
      opacity: 0.5;
      transition: transform 0.2s, opacity 0.2s;
    }

    .sn-dropdown:hover .sn-dropdown-toggle svg {
      transform: rotate(180deg);
      opacity: 1;
    }

    .sn-dropdown-panel {
      position: absolute;
      top: calc(100% + 8px);
      left: 50%;
      transform: translateX(-50%);
      min-width: 260px;
      background: #FFFFFF;
      border: 1px solid rgba(0,0,0,0.13);
      border-radius: 0;
      box-shadow: 0 12px 40px rgba(0,0,0,0.12);
      padding: 8px;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.15s, visibility 0.15s;
      z-index: 9999;
    }

    .sn-dropdown:hover > .sn-dropdown-panel,
    .sn-dropdown:focus-within > .sn-dropdown-panel {
      opacity: 1;
      visibility: visible;
    }

    .sn-dropdown-panel a {
      display: block;
      padding: 10px 14px;
      font-family: 'TWK Everett', 'Helvetica Neue', sans-serif;
      font-size: 14px;
      font-weight: 500;
      color: #555555;
      text-transform: none;
      letter-spacing: normal;
      text-decoration: none;
      border-radius: 0;
      transition: background 0.12s, color 0.12s;
    }

    .sn-dropdown-panel a:hover {
      background: #EBEBEB;
      color: #111111;
    }

    .sn-dropdown-panel a.sn-sub-active {
      color: #D64074;
      background: rgba(214,64,116,0.08);
    }

    .sn-divider {
      height: 1px;
      background: rgba(0,0,0,0.07);
      margin: 6px 10px;
    }

    .sn-sub-label {
      display: block;
      font-family: 'Chivo Mono', 'Space Mono', monospace;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #909090;
      margin-top: 3px;
      font-weight: 400;
    }

    /* Actions */
    .sn-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
    }

    .sn-cta {
      display: inline-flex;
      align-items: center;
      padding: 10px 24px;
      font-family: 'Chivo Mono', 'Space Mono', monospace;
      font-size: 11px;
      font-weight: 600;
      color: #fff;
      background: #111111;
      border-radius: 0;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      text-decoration: none;
      transition: background 0.2s;
      white-space: nowrap;
    }

    .sn-cta:hover { background: #333; }

    /* Hamburger */
    .sn-hamburger {
      display: none;
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
      flex-direction: column;
      gap: 5px;
    }

    .sn-hamburger span {
      display: block;
      width: 20px;
      height: 1.5px;
      background: #111111;
      transition: 0.2s;
    }

    /* Mobile */
    @media (max-width: 960px) {
      .sn-hamburger { display: flex; }
      .sn-links, .sn-actions { display: none; }

      .sn.open .sn-links {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 64px;
        left: 0; right: 0;
        background: #FFFFFF;
        border-bottom: 1px solid rgba(0,0,0,0.13);
        padding: 12px 24px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.08);
      }

      .sn.open .sn-actions {
        display: flex;
        position: absolute;
        top: auto;
        left: 24px;
        right: 24px;
        justify-content: center;
        padding: 12px 0 20px;
        gap: 12px;
      }

      .sn-dropdown-panel {
        position: static;
        transform: none;
        box-shadow: none;
        border: none;
        padding: 0 0 0 16px;
        background: transparent;
        min-width: 0;
        display: none;
        opacity: 1;
        visibility: visible;
      }

      .sn-dropdown.mob-open > .sn-dropdown-panel {
        display: block;
      }
    }
  `;
  document.head.appendChild(style);

  // === INTERACTIONS ===
  const hamburger = document.getElementById('snHamburger');
  const nav = document.getElementById('siteNav');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  // Mobile dropdown toggle
  document.querySelectorAll('.sn-dropdown-toggle').forEach(btn => {
    btn.addEventListener('click', function () {
      if (window.innerWidth <= 960) {
        this.closest('.sn-dropdown').classList.toggle('mob-open');
      }
    });
  });
})();
