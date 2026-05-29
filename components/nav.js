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
        <a href="/" class="sn-logo brand-lockup" aria-label="NetherOps">
          <svg class="brand-raven" viewBox="0 0 427 401" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M195.228 0C203.548 0.493333 208.898 0.86 211.278 1.1C230.538 3.04667 249.055 7.88 266.828 15.6C267.342 15.8236 267.772 16.2045 268.056 16.6879C268.34 17.1712 268.463 17.7321 268.408 18.29L260.768 93.81C260.744 94.0572 260.629 94.2863 260.448 94.4527C260.267 94.619 260.032 94.7108 259.788 94.71H118.728C118.51 94.7109 118.299 94.6295 118.136 94.4816C117.973 94.3337 117.871 94.13 117.848 93.91L110.368 18.32C110.311 17.7118 110.446 17.1016 110.755 16.5769C111.064 16.0523 111.531 15.6403 112.088 15.4C130.542 7.44 149.772 2.59667 169.778 0.87C172.305 0.65 177.088 0.36 184.128 0H195.228Z"/>
            <path d="M0 312.651V310.541C4.43333 304.507 8.15333 299.711 11.16 296.151C32.52 270.884 53.7367 245.501 74.81 220.001C74.9128 219.874 74.9639 219.713 74.9527 219.551C74.9416 219.389 74.869 219.239 74.75 219.131C74.5767 218.971 74.41 218.887 74.25 218.881C71.7633 218.787 63.19 218.707 48.53 218.641C48.4406 218.64 48.3531 218.616 48.2768 218.569C48.2006 218.522 48.1385 218.456 48.0973 218.377C48.0561 218.297 48.0374 218.208 48.0431 218.119C48.0489 218.03 48.0789 217.944 48.13 217.871C49.6967 215.697 50.5 214.587 50.54 214.541C83.68 175.361 102.32 153.251 106.46 148.211C112.067 141.377 116.547 135.731 119.9 131.271C120.193 130.884 120.187 130.504 119.88 130.131C119.65 129.841 79.64 129.991 52.97 129.951C52.8109 129.951 52.6583 129.888 52.5457 129.775C52.4332 129.663 52.37 129.51 52.37 129.351V107.191C52.37 107.021 52.4374 106.858 52.5575 106.738C52.6775 106.618 52.8403 106.551 53.01 106.551H327.3C327.486 106.551 327.671 106.588 327.843 106.659C328.016 106.73 328.172 106.835 328.304 106.967C328.436 107.099 328.541 107.255 328.612 107.427C328.683 107.6 328.72 107.784 328.72 107.971V129.191C328.72 129.292 328.7 129.392 328.661 129.485C328.623 129.579 328.566 129.664 328.494 129.735C328.423 129.807 328.338 129.863 328.245 129.902C328.151 129.941 328.051 129.961 327.95 129.961H262.19C261.973 129.961 261.762 130.026 261.582 130.147C261.403 130.268 261.263 130.44 261.182 130.64C261.1 130.841 261.08 131.061 261.124 131.273C261.169 131.485 261.275 131.679 261.43 131.831C266.497 136.757 272.703 142.871 280.05 150.171C281.15 151.264 282.627 151.967 284.48 152.281C305.12 155.767 323.827 158.857 340.6 161.551C348.86 162.877 355.39 164.364 360.19 166.011C372.89 170.371 385.14 175.901 395.91 183.861C412.597 196.194 422.81 212.651 426.55 233.231C426.562 233.298 426.553 233.367 426.525 233.43C426.497 233.492 426.451 233.544 426.392 233.58C426.334 233.615 426.267 233.633 426.198 233.629C426.13 233.626 426.064 233.602 426.01 233.561C413.163 223.621 398.923 216.201 383.29 211.301C372.63 207.961 360.063 205.757 345.59 204.691C314.33 202.371 284.18 204.041 252.08 206.761C251.61 206.8 251.158 206.977 250.78 207.271L241.36 214.561C241.295 214.607 241.248 214.674 241.225 214.75C241.203 214.826 241.206 214.908 241.234 214.982C241.263 215.056 241.315 215.119 241.383 215.161C241.451 215.202 241.531 215.22 241.61 215.211C268.59 213.071 293.55 211.747 316.49 211.241C346.51 210.581 374.9 213.521 401.75 225.461C401.846 225.504 401.927 225.574 401.984 225.662C402.041 225.751 402.07 225.854 402.069 225.959C402.068 226.064 402.036 226.167 401.978 226.254C401.919 226.341 401.837 226.41 401.74 226.451C387.34 232.684 372.343 236.534 356.75 238.001C342.75 239.327 330.357 240.527 319.57 241.601C296.48 243.911 272.32 257.011 261.17 278.111C252.477 294.544 250.64 312.047 255.66 330.621C256.887 335.161 258.023 338.947 259.07 341.981C259.262 342.53 259.36 343.105 259.36 343.681V400.541C259.359 400.618 259.336 400.693 259.295 400.758C259.253 400.824 259.195 400.876 259.126 400.91C259.056 400.944 258.979 400.959 258.902 400.952C258.825 400.945 258.752 400.917 258.69 400.871L219.71 371.651C219.427 371.439 219.077 371.337 218.724 371.363C218.371 371.389 218.04 371.54 217.79 371.791L193.28 396.301C193.212 396.369 193.129 396.421 193.038 396.452C192.947 396.482 192.85 396.491 192.755 396.478C192.661 396.464 192.571 396.428 192.493 396.373C192.416 396.318 192.353 396.245 192.31 396.161L168.39 350.101C168.317 349.961 168.215 349.838 168.092 349.74C167.968 349.642 167.825 349.572 167.672 349.533C167.519 349.494 167.359 349.488 167.204 349.516C167.049 349.543 166.901 349.602 166.77 349.691L130.44 373.921C130.328 373.995 130.2 374.043 130.067 374.059C129.933 374.076 129.797 374.061 129.67 374.017C129.544 373.972 129.429 373.899 129.335 373.802C129.241 373.706 129.171 373.589 129.13 373.461C126.677 365.641 124.547 358.921 122.74 353.301C122.3 351.911 123.42 349.391 123.75 348.281C130.797 324.587 137.233 303.327 143.06 284.501C143.067 284.486 143.067 284.47 143.062 284.455C143.056 284.44 143.045 284.427 143.03 284.421C143.015 284.414 142.999 284.414 142.984 284.419C142.969 284.425 142.957 284.436 142.95 284.451L115.4 330.461C114.797 331.467 113.884 332.246 112.8 332.681L61.43 353.331C61.3417 353.367 61.2465 353.382 61.1514 353.376C61.0563 353.369 60.9639 353.342 60.8811 353.294C60.7983 353.247 60.7273 353.182 60.6734 353.103C60.6195 353.025 60.5842 352.935 60.57 352.841L57.45 332.461C57.4045 332.138 57.4755 331.812 57.65 331.541L108.22 251.891C108.241 251.853 108.247 251.809 108.238 251.768C108.229 251.727 108.204 251.693 108.17 251.671L108.15 251.661C108.126 251.642 108.095 251.633 108.064 251.637C108.032 251.641 108.002 251.656 107.98 251.681L53.84 312.121C53.7332 312.241 53.6031 312.336 53.4583 312.402C53.3135 312.467 53.1573 312.501 53 312.501L0 312.651ZM182.27 164.091L208.8 163.101C208.879 163.098 208.958 163.113 209.03 163.145C209.103 163.176 209.167 163.223 209.22 163.282C209.272 163.341 209.311 163.411 209.334 163.487C209.356 163.563 209.362 163.643 209.35 163.721C207.54 174.791 215.62 184.891 227.14 183.851C234.65 183.171 239.48 177.621 242.17 170.921C242.209 170.824 242.229 170.721 242.228 170.617C242.227 170.513 242.205 170.41 242.164 170.314C242.123 170.219 242.064 170.132 241.989 170.059C241.915 169.987 241.827 169.929 241.73 169.891C238.47 168.597 234.963 166.981 231.21 165.041C221.557 160.041 213.403 155.864 206.75 152.511C206.455 152.365 206.131 152.289 205.803 152.289C205.475 152.289 205.152 152.365 204.86 152.511L182.21 163.831C182.18 163.845 182.156 163.869 182.141 163.899C182.127 163.93 182.123 163.963 182.13 163.995C182.137 164.026 182.155 164.053 182.181 164.071C182.207 164.089 182.238 164.096 182.27 164.091ZM150.92 182.061C150.787 182.054 150.65 182.121 150.51 182.261C142.563 190.407 126.803 206.057 103.23 229.211C102.877 229.557 102.677 229.764 102.63 229.831C102.6 229.878 102.585 229.934 102.587 229.991C102.589 230.047 102.608 230.101 102.641 230.147C102.675 230.192 102.721 230.226 102.775 230.245C102.828 230.264 102.886 230.266 102.94 230.251L124.11 224.391C124.37 224.32 124.643 224.313 124.905 224.371C125.168 224.428 125.414 224.548 125.62 224.721L142.09 238.771C142.235 238.893 142.326 239.068 142.343 239.257C142.36 239.446 142.301 239.635 142.18 239.781C134.827 248.581 128.56 258.111 123.38 268.371C123.352 268.421 123.343 268.478 123.353 268.534C123.363 268.589 123.393 268.64 123.437 268.677C123.481 268.714 123.537 268.736 123.596 268.738C123.654 268.741 123.712 268.724 123.76 268.691C133.947 261.624 144.83 256.257 156.41 252.591C156.68 252.505 156.967 252.489 157.245 252.545C157.523 252.601 157.783 252.727 158 252.911L171.04 264.031C171.296 264.249 171.593 264.413 171.915 264.512C172.236 264.612 172.575 264.646 172.91 264.611L202.09 261.731C202.162 261.722 202.235 261.737 202.297 261.774C202.36 261.811 202.408 261.867 202.436 261.934C202.463 262.001 202.467 262.075 202.448 262.145C202.429 262.215 202.388 262.277 202.33 262.321C186.53 274.691 178.06 292.211 174.31 311.331C174.293 311.415 174.308 311.503 174.351 311.578C174.395 311.653 174.463 311.709 174.544 311.737C174.625 311.764 174.712 311.76 174.789 311.726C174.866 311.692 174.927 311.629 174.96 311.551C181.767 296.844 191.933 285.127 205.46 276.401C205.551 276.342 205.659 276.313 205.767 276.319C205.875 276.326 205.979 276.366 206.063 276.436C206.146 276.505 206.206 276.599 206.232 276.704C206.259 276.809 206.251 276.92 206.21 277.021C199.18 294.371 197.12 314.031 197.63 332.761C197.633 332.825 197.657 332.887 197.7 332.936C197.742 332.985 197.799 333.018 197.862 333.03C197.924 333.042 197.988 333.031 198.043 333.001C198.097 332.97 198.139 332.92 198.16 332.861C202.953 320.754 210.147 310.217 219.74 301.251C221.193 299.897 222.42 298.917 223.42 298.311C223.498 298.265 223.587 298.241 223.677 298.244C223.768 298.246 223.856 298.274 223.931 298.324C224.006 298.374 224.066 298.445 224.103 298.527C224.14 298.61 224.153 298.701 224.14 298.791C221.07 318.111 230 339.411 242.34 354.111C242.387 354.164 242.452 354.199 242.523 354.21C242.594 354.221 242.666 354.208 242.726 354.171C242.787 354.135 242.831 354.079 242.852 354.013C242.873 353.946 242.869 353.875 242.84 353.811C232.77 329.311 229.15 303.711 239.4 278.881C240.32 276.641 240.993 274.977 241.42 273.891C241.433 273.867 241.436 273.839 241.431 273.812C241.426 273.785 241.411 273.761 241.39 273.744C241.369 273.726 241.343 273.716 241.316 273.716C241.288 273.715 241.262 273.724 241.24 273.741C230.733 280.107 221.023 286.884 212.11 294.071C212.073 294.1 212.029 294.117 211.982 294.121C211.936 294.124 211.889 294.113 211.849 294.089C211.809 294.065 211.777 294.029 211.757 293.987C211.738 293.944 211.732 293.897 211.74 293.851C214.84 276.111 222.943 261.164 236.05 249.011C236.103 248.963 236.139 248.899 236.154 248.83C236.169 248.76 236.161 248.687 236.132 248.622C236.104 248.557 236.055 248.502 235.994 248.466C235.932 248.43 235.861 248.414 235.79 248.421L176.21 254.131C175.928 254.157 175.646 254.112 175.39 254.001C174.497 253.621 173.613 253.044 172.74 252.271C154.027 235.671 140.69 223.887 132.73 216.921C132.608 216.814 132.526 216.668 132.497 216.509C132.468 216.349 132.494 216.184 132.57 216.041L151.04 182.281C151.052 182.259 151.058 182.234 151.058 182.21C151.057 182.185 151.051 182.16 151.039 182.138C151.027 182.117 151.01 182.098 150.989 182.085C150.969 182.071 150.945 182.063 150.92 182.061Z"/>
          </svg>
          <span class="brand-wordmark" role="img" aria-label="NetherOps"></span>
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
                Operators / RevOps
                <span class="sn-sub-label">RevOps · MarOps</span>
              </a>
              <a href="/opptycon/heads-of-gtm/" class="${activeSub === 'heads-of-gtm' ? 'sn-sub-active' : ''}">
                CRO / GTM Leaders
                <span class="sn-sub-label">CRO · VP Sales · Head of GTM</span>
              </a>
              <a href="/opptycon/cmo/" class="${activeSub === 'cmo' ? 'sn-sub-active' : ''}">
                CMO / Marketing
                <span class="sn-sub-label">CMO · VP Marketing · Demand Gen</span>
              </a>
              <a href="/opptycon/finance/" class="${activeSub === 'finance' ? 'sn-sub-active' : ''}">
                CFO / Finance
                <span class="sn-sub-label">CFO · FP&amp;A · Strategic Finance</span>
              </a>
              <a href="/opptycon/leadership/" class="${activeSub === 'leadership' ? 'sn-sub-active' : ''}">
                CEO / Leadership
                <span class="sn-sub-label">CEO · COO · Founder</span>
              </a>
              <a href="/opptycon/board/" class="${activeSub === 'board' ? 'sn-sub-active' : ''}">
                Board Members
                <span class="sn-sub-label">Operating Board · Independent Directors</span>
              </a>
              <a href="/opptycon/capital/" class="${activeSub === 'capital' ? 'sn-sub-active' : ''}">
                VC / Capital
                <span class="sn-sub-label">VC · PE · Operating Partners</span>
              </a>
            </div>
          </li>
          <li><a href="/doctrine/#library" class="${active === 'library' ? 'sn-active' : ''}">Library</a></li>
          <li><a href="/roadmap/" class="${active === 'roadmap' ? 'sn-active' : ''}">Roadmap</a></li>
          <li><a href="https://heretics.io" class="${active === 'about' ? 'sn-active' : ''}">About</a></li>
        </ul>

        <div class="sn-actions">
          <a href="/#briefing" class="sn-cta">Book a Briefing</a>
          <button class="sn-theme-toggle" type="button" aria-label="Toggle light/dark mode" onclick="window.netherops_toggleTheme()">
            <span data-grey>Grey</span>
            <span class="sn-theme-sep">/</span>
            <span data-dark>Dark</span>
          </button>
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
      background: rgba(244,241,234,0.88);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border-bottom: 0.5px solid rgba(20,18,14,0.12);
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

    /* Logo — canonical brand-lockup (raven + wordmark mask) */
    .sn-logo {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      flex-shrink: 0;
      color: inherit;
    }
    .sn-logo .brand-raven {
      width: 32px;
      height: 32px;
      flex-shrink: 0;
      display: block;
      color: var(--accent-violet, #5B3DF0);
    }
    .sn-logo .brand-raven path { fill: currentColor; }
    .sn-logo .brand-wordmark {
      display: inline-block;
      height: 22px;
      width: 130px;
      background-color: #1A1A1E;
      -webkit-mask: url('/assets/netherops-logo.svg') left center no-repeat;
              mask: url('/assets/netherops-logo.svg') left center no-repeat;
      -webkit-mask-size: auto 22px;
              mask-size: auto 22px;
      flex-shrink: 0;
    }
    body.dark .sn-logo .brand-wordmark { background-color: #ECEAE3; }

    .sn-logo-text {
      font-family: 'TWK Everett', 'Helvetica Neue', sans-serif;
      font-size: 18px;
      font-weight: 400;
      color: #1A1A1E;
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
      font-family: 'JetBrains Mono', 'Chivo Mono', 'Space Mono', monospace;
      font-size: 11px;
      font-weight: 500;
      color: #57544D;
      text-transform: uppercase;
      letter-spacing: 0.08em;
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
      color: #1A1A1E;
    }

    .sn-active-parent > button {
      color: #1A1A1E !important;
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
      color: #5B3DF0;
      background: rgba(91,61,240,0.08);
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
      padding: 10px 20px;
      font-family: 'JetBrains Mono', 'Chivo Mono', 'Space Mono', monospace;
      font-size: 11px;
      font-weight: 600;
      color: #16161A;
      background: #5B3DF0;
      border: 1px solid #5B3DF0;
      border-radius: 2px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      text-decoration: none;
      transition: background 0.18s, color 0.18s;
      white-space: nowrap;
    }

    .sn-cta:hover { background: transparent; color: #5B3DF0; }

    /* Light/dark toggle per DS spec §10 — NetherOps canonical = grey; toggle to dark.
       Per DS spec selection boxes use violet (the property accent). */
    .sn-theme-toggle {
      font-family: 'JetBrains Mono', 'Chivo Mono', 'Space Mono', monospace;
      font-size: 10px; font-weight: 500;
      letter-spacing: 0.12em; text-transform: uppercase;
      background: transparent;
      border: 1px solid #5B3DF0;
      color: #56564E;
      padding: 6px 10px;
      border-radius: 0;
      cursor: pointer;
      display: inline-flex; align-items: center; gap: 6px;
      transition: border-color 0.2s, color 0.2s, background 0.2s;
    }
    .sn-theme-toggle:hover { background: rgba(91,61,240,0.06); color: #131316; }
    .sn-theme-sep { color: #B0B0AA; }
    body:not(.dark) .sn-theme-toggle [data-grey] { color: #131316; font-weight: 600; }
    body:not(.dark) .sn-theme-toggle [data-dark]  { color: #B0B0AA; }
    body.dark .sn-theme-toggle { border-color: #8C73FF; color: #9A9A90; }
    body.dark .sn-theme-toggle:hover { background: rgba(140,115,255,0.10); color: #ECECE6; }
    body.dark .sn-theme-toggle [data-grey] { color: #9A9A90; }
    body.dark .sn-theme-toggle [data-dark]  { color: #ECECE6; font-weight: 600; }
    body.dark .sn-theme-sep { color: #555; }

    /* NetherOps dark mode per DS spec §6.2 — flips :root vars so every page-level
       ink/border reference recalibrates correctly. Previous version only flipped
       body bg/color which left H1/headlines unreadable on dark ground. */
    body.dark {
      --bg-base:      #131316;
      --bg-surface:   #1B1B20;
      --bg-white:     #1F1F25;
      --bg-inverse:   #0F0F0F;
      --bg-raised:    #24242B;
      --ink:          #ECECE6;
      --ink-mid:      #9A9A90;
      --ink-muted:    #6E6E66;
      --ink-inv:      #131316;
      --ink-inv-mid:  #56564E;
      --border-subtle: rgba(255,255,255,0.06);
      --border-mid:    rgba(255,255,255,0.12);
      --border-strong: rgba(255,255,255,0.28);
      --accent-violet:       #8C73FF;
      --accent-violet-hover: #A695FF;
      background: var(--bg-base) !important;
      color: var(--ink);
    }
    body.dark .site-nav,
    body.dark .sn {
      background: rgba(18,18,20,0.88) !important;
      border-bottom-color: rgba(255,255,255,0.10);
    }
    body.dark .sn-links a { color: var(--ink-mid) !important; }
    body.dark .sn-links a:hover { color: var(--ink) !important; }
    body.dark .sn-cta {
      background: var(--ink);
      color: var(--bg-base);
    }
    body.dark .sn-cta:hover { background: transparent; color: #8C73FF; }
    /* Hide the samurai character imagery on dark — image isn't optimized for dark bg */
    body.dark .hero-img,
    body.dark .hero-hair { display: none !important; }
    body.dark .sn-logo-text { color: #ECECE6; }

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

  // === LIGHT/DARK TOGGLE per DS spec §10 ===
  (function () {
    var KEY = 'netherops-theme';
    function apply(theme) {
      if (theme === 'dark') document.body.classList.add('dark');
      else document.body.classList.remove('dark');
    }
    function get() {
      try { return localStorage.getItem(KEY) || 'light'; }  // canonical = grey (light)
      catch (e) { return 'light'; }
    }
    function set(theme) {
      try { localStorage.setItem(KEY, theme); } catch (e) {}
      apply(theme);
    }
    window.netherops_toggleTheme = function () {
      var current = document.body.classList.contains('dark') ? 'dark' : 'light';
      set(current === 'dark' ? 'light' : 'dark');
    };
    apply(get());
  })();

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
