/*
  Marline Management Group — lightweight SPA for GitHub Pages
  Two-file version:
  - index.html (includes all CSS inline)
  - app.js (this file)

  Update SITE_CONFIG with your real details.
*/

const SITE_CONFIG = {
  businessName: "Marline Management Group",
  tagline: "Back-office support for real estate, rentals, and short-term stays — done right.",
  cityLine: "Douglasville, GA",
  phoneDisplay: "(000) 000-0000",
  phoneTel: "+10000000000",
  email: "hello@marlinemanagementgroup.com",
  booking: {
    // Paste your scheduling link here (Calendly/Acuity/Square)
    url: "",
    // Or paste an iframe embed code here instead (optional)
    embedHtml: ""
  },
  serviceArea: "Metro Atlanta & Remote"
};

const SERVICES = {
  "rental-property": {
    title: "Rental Property Support",
    summary: "Operations support for long-term rentals—coordination, communication, and organization.",
    includes: [
      "Tenant communication support (as permitted)",
      "Maintenance coordination & vendor scheduling",
      "Rent reminders / ledger support (non-legal)",
      "Move-in / move-out coordination checklists",
      "Document organization (leases, inspections, receipts)"
    ],
    bestFor: [
      "Small landlords",
      "Busy professionals with 1–10 doors",
      "Owners who want smoother operations and better documentation"
    ]
  },
  "property-management": {
    title: "Property Management",
    summary: "Structured property coordination and reporting—built around clear workflows and accountability.",
    includes: [
      "Property coordination + admin management",
      "Vendor management + work order tracking",
      "Inspection scheduling + reporting",
      "Owner reporting packets (monthly)",
      "Compliance-friendly documentation organization"
    ],
    bestFor: [
      "Owners who want a consistent process",
      "Out-of-town owners",
      "Properties that need strong vendor coordination"
    ]
  },
  "real-estate-va": {
    title: "Real Estate Virtual Assistant",
    summary: "Back-office relief for agents and teams—CRM, listing coordination, and transaction support.",
    includes: [
      "CRM updates & lead routing",
      "Listing coordination (checklists, photo scheduling)",
      "Transaction coordination assistance (timelines, follow-ups)",
      "Email + calendar management",
      "Client touchpoints (templates, follow-ups)"
    ],
    bestFor: [
      "Agents who want more time selling",
      "Teams that need reliable admin support",
      "New agents building systems"
    ]
  },
  "notary": {
    title: "Notary Services",
    summary: "Convenient notarizations with a simple booking flow.",
    includes: [
      "Standard notarizations",
      "Mobile notary (if offered)",
      "Business & real-estate documents (where allowed)",
      "Appointment scheduling + reminders"
    ],
    bestFor: [
      "Individuals and families",
      "Small businesses",
      "Real estate professionals needing quick turnaround"
    ]
  },
  "airbnb": {
    title: "Airbnb / Short-Term Rental Support",
    summary: "Guest messaging, turnover coordination, and issue escalation—so your listing stays smooth.",
    includes: [
      "Guest messaging + check-in/out instructions",
      "Cleaner coordination + turnover checklists",
      "Restock tracking",
      "Calendar support + listing updates",
      "Issue escalation process"
    ],
    bestFor: [
      "Hosts who need consistent operations",
      "Owners with remote properties",
      "Anyone aiming to improve guest experience"
    ]
  }
};

// ---------- Utilities ----------
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function routePath() {
  const raw = (location.hash || "#/\").replace(/^#\/?/, "");
  return raw || "/";
}

// ---------- Modal ----------
const modal = {
  el: null,
  body: null,
  title: null,
  open(title, html) {
    this.el.setAttribute("aria-hidden", "false");
    this.title.textContent = title;
    this.body.innerHTML = html;
    document.body.style.overflow = "hidden";
  },
  close() {
    this.el.setAttribute("aria-hidden", "true");
    this.body.innerHTML = "";
    document.body.style.overflow = "";
  }
};

function bookingHtml() {
  if (SITE_CONFIG.booking.embedHtml?.trim()) {
    return SITE_CONFIG.booking.embedHtml;
  }
  if (SITE_CONFIG.booking.url?.trim()) {
    const safeUrl = escapeHtml(SITE_CONFIG.booking.url.trim());
    return `
      <div class="notice">We use a scheduling link to keep things simple.</div>
      <p style="margin:12px 0 0;"><a class="btn btn-primary" href="${safeUrl}" target="_blank" rel="noopener">Open Booking Link</a></p>
      <p class="muted" style="margin:10px 0 0; font-size:13px;">Tip: To embed a calendar, paste the iframe embed code into <code>SITE_CONFIG.booking.embedHtml</code>.</p>
    `;
  }
  return `
    <div class="notice">
      Booking is not configured yet. Add your scheduling link in <b>app.js</b> under <code>SITE_CONFIG.booking.url</code>.
    </div>
    <div style="margin-top:12px;" class="grid">
      <a class="btn btn-primary" href="#/contact" data-nav>Message Us Instead</a>
    </div>
  `;
}

// ---------- Views ----------
function viewHome() {
  const cards = Object.entries(SERVICES).map(([slug, s]) => `
    <a class="card" href="#/services/${slug}" data-nav>
      <h3>${escapeHtml(s.title)}</h3>
      <p>${escapeHtml(s.summary)}</p>
    </a>
  `).join("");

  return `
  <section class="hero">
    <div class="container">
      <div class="hero-wrap">
        <div class="hero-card">
          <div class="hero-inner">
            <div class="kicker">${escapeHtml(SITE_CONFIG.serviceArea)}</div>
            <h1 class="h1">${escapeHtml(SITE_CONFIG.tagline)}</h1>
            <p class="lede">From property coordination to real estate admin support to notarizations, ${escapeHtml(SITE_CONFIG.businessName)} keeps your operations organized and your clients taken care of.</p>
            <div class="hero-cta">
              <a class="btn btn-primary" href="#/book" data-nav>Book Appointment</a>
              <a class="btn btn-ghost" href="#/services/real-estate-va" data-nav>Explore Services</a>
            </div>
            <div class="trustbar" aria-label="Trust highlights">
              <span class="pill">Responsive</span>
              <span class="pill">Organized</span>
              <span class="pill">Process-driven</span>
              <span class="pill">Discreet</span>
            </div>
          </div>
        </div>

        <div class="hero-card">
          <div class="hero-side">
            <div class="stat">
              <div class="label">What we deliver</div>
              <div class="value">Clean workflows</div>
              <div class="desc">Checklists, timelines, and clear communication.</div>
            </div>
            <div class="stat">
              <div class="label">Your benefit</div>
              <div class="value">More time back</div>
              <div class="desc">Reduce admin load and keep tasks moving.</div>
            </div>
            <div class="stat">
              <div class="label">Our style</div>
              <div class="value">Calm + consistent</div>
              <div class="desc">Reliable follow-through, documented.</div>
            </div>
          </div>
        </div>
      </div>

      <div class="section">
        <h2 class="h2">Services</h2>
        <p class="muted" style="margin-top:0;">Choose a service to see what’s included and how we get started.</p>
        <div class="grid cards" style="margin-top:14px;">${cards}</div>
      </div>

      <div class="section">
        <h2 class="h2">How it works</h2>
        <div class="grid steps" style="margin-top:14px;">
          <div class="card step">
            <div class="num">1</div>
            <h3>Request a consult</h3>
            <p>Tell us which service you need, your timeline, and your goals.</p>
          </div>
          <div class="card step">
            <div class="num">2</div>
            <h3>We build your workflow</h3>
            <p>We align on tools, access, SOPs, and a clear plan to execute.</p>
          </div>
          <div class="card step">
            <div class="num">3</div>
            <h3>We execute + report</h3>
            <p>We handle the tasks and send structured updates you can trust.</p>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="cta-band">
          <div>
            <div class="h2" style="margin:0;">Ready to hand off the busywork?</div>
            <div class="muted">Book a quick consult and we’ll map the best next steps.</div>
          </div>
          <div>
            <a class="btn btn-primary" href="#/book" data-nav>Book Appointment</a>
          </div>
        </div>
      </div>

    </div>
  </section>
  `;
}

function viewService(slug) {
  const s = SERVICES[slug];
  if (!s) return viewNotFound();

  const includes = s.includes.map(i => `<li>${escapeHtml(i)}</li>`).join("");
  const bestFor = s.bestFor.map(i => `<li>${escapeHtml(i)}</li>`).join("");

  return `
    <section class="section">
      <div class="container">
        <div class="card" style="padding:22px;">
          <div class="kicker">Service</div>
          <h1 class="h1" style="font-size:34px;">${escapeHtml(s.title)}</h1>
          <p class="lede">${escapeHtml(s.summary)}</p>
          <div class="hero-cta">
            <button class="btn btn-primary" type="button" data-book="${escapeHtml(s.title)}">Book for this service</button>
            <a class="btn btn-ghost" href="#/contact" data-nav>Ask a question</a>
          </div>
        </div>

        <div class="section split">
          <div class="card">
            <h2 class="h2">What’s included</h2>
            <ul class="muted" style="margin:10px 0 0; padding-left:18px;">${includes}</ul>
          </div>
          <div class="card">
            <h2 class="h2">Best for</h2>
            <ul class="muted" style="margin:10px 0 0; padding-left:18px;">${bestFor}</ul>
          </div>
        </div>

        <div class="section">
          <div class="card">
            <h2 class="h2">Process</h2>
            <div class="grid" style="grid-template-columns: repeat(3, 1fr); gap:14px; margin-top:12px;">
              <div class="card" style="background:rgba(255,255,255,.03);">
                <div class="kicker">Step 1</div>
                <div class="h3">Intake</div>
                <div class="muted">We confirm scope, details (if relevant), and timeline.</div>
              </div>
              <div class="card" style="background:rgba(255,255,255,.03);">
                <div class="kicker">Step 2</div>
                <div class="h3">Setup</div>
                <div class="muted">Tools, access, SOPs, and communication cadence.</div>
              </div>
              <div class="card" style="background:rgba(255,255,255,.03);">
                <div class="kicker">Step 3</div>
                <div class="h3">Execution</div>
                <div class="muted">We deliver the work and provide clear updates.</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  `;
}

function viewAbout() {
  return `
    <section class="section">
      <div class="container">
        <div class="card" style="padding:22px;">
          <div class="kicker">About</div>
          <h1 class="h1" style="font-size:34px;">We run the operations so you can focus on the work that matters.</h1>
          <p class="lede">${escapeHtml(SITE_CONFIG.businessName)} provides reliable administrative and operations support for real estate professionals, property owners, and short-term rental hosts. We blend responsiveness with systems—so tasks don’t just get done… they get done consistently, documented, and on time.</p>
          <div class="section" style="padding:18px 0 0;">
            <div class="grid" style="grid-template-columns: repeat(3, 1fr); gap:14px;">
              <div class="card"><h3>Process-driven</h3><p>Clear checklists, timelines, and follow-through.</p></div>
              <div class="card"><h3>Client-first</h3><p>Fast response, calm communication, strong boundaries.</p></div>
              <div class="card"><h3>Organized delivery</h3><p>Documentation and reporting you can rely on.</p></div>
            </div>
          </div>
          <div class="hero-cta" style="margin-top:14px;">
            <a class="btn btn-primary" href="#/book" data-nav>Book Appointment</a>
            <a class="btn btn-ghost" href="#/contact" data-nav>Contact</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

function viewContact() {
  return `
    <section class="section">
      <div class="container">
        <div class="split">
          <div class="card" style="padding:22px;">
            <div class="kicker">Contact</div>
            <h1 class="h1" style="font-size:34px;">Let’s talk.</h1>
            <p class="lede">Send a message and we’ll respond with next steps. If your request is urgent, include your preferred callback time.</p>

            <form class="form" id="contactForm">
              <div class="field">
                <label for="name">Name</label>
                <input id="name" name="name" type="text" autocomplete="name" required />
              </div>
              <div class="field">
                <label for="email">Email</label>
                <input id="email" name="email" type="email" autocomplete="email" required />
              </div>
              <div class="field">
                <label for="service">Service interest</label>
                <select id="service" name="service" required>
                  <option value="" selected disabled>Select one</option>
                  <option>Rental Property Support</option>
                  <option>Property Management</option>
                  <option>Real Estate Virtual Assistant</option>
                  <option>Notary Services</option>
                  <option>Airbnb / Short-Term Rental Support</option>
                </select>
              </div>
              <div class="field">
                <label for="message">Message</label>
                <textarea id="message" name="message" placeholder="Tell us what you need, timeline, and location (if relevant)." required></textarea>
              </div>
              <button class="btn btn-primary" type="submit">Send message</button>
              <div class="notice" id="contactNote">This form opens your email client (mailto). We can switch to Formspree later for a true web form.</div>
            </form>
          </div>

          <div class="card" style="padding:22px;">
            <div class="kicker">Details</div>
            <h2 class="h2">Business info</h2>
            <p class="muted" style="margin-top:0;">${escapeHtml(SITE_CONFIG.cityLine)} · ${escapeHtml(SITE_CONFIG.serviceArea)}</p>

            <div class="grid" style="gap:10px; margin-top:12px;">
              <div class="card" style="background:rgba(255,255,255,.03);">
                <div class="kicker">Phone</div>
                <div><a href="tel:${escapeHtml(SITE_CONFIG.phoneTel)}">${escapeHtml(SITE_CONFIG.phoneDisplay)}</a></div>
              </div>
              <div class="card" style="background:rgba(255,255,255,.03);">
                <div class="kicker">Email</div>
                <div><a href="mailto:${escapeHtml(SITE_CONFIG.email)}">${escapeHtml(SITE_CONFIG.email)}</a></div>
              </div>
              <div class="card" style="background:rgba(255,255,255,.03);">
                <div class="kicker">Booking</div>
                <div class="muted">Prefer a scheduled call? Use our booking link.</div>
                <div style="margin-top:10px;"><a class="btn btn-ghost" href="#/book" data-nav>Book Appointment</a></div>
              </div>

              <div class="notice">
                <b>Note:</b> If your state requires a license for certain property management activities, we’ll tailor scope and wording accordingly.
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  `;
}

function viewBook() {
  return `
    <section class="section">
      <div class="container">
        <div class="card" style="padding:22px;">
          <div class="kicker">Book</div>
          <h1 class="h1" style="font-size:34px;">Book an appointment</h1>
          <p class="lede">Choose a time that works for you. If booking isn’t configured yet, you can contact us instead.</p>
          <div class="hero-cta">
            <button class="btn btn-primary" type="button" id="openBooking">Open booking</button>
            <a class="btn btn-ghost" href="#/contact" data-nav>Contact</a>
          </div>
          <div class="notice" style="margin-top:14px;">Tip: For GitHub Pages, an embedded iframe booking widget works great.</div>
        </div>
      </div>
    </section>
  `;
}

function viewNotFound() {
  return `
    <section class="section">
      <div class="container">
        <div class="card" style="padding:22px;">
          <div class="kicker">404</div>
          <h1 class="h1" style="font-size:34px;">Page not found</h1>
          <p class="lede">That route doesn’t exist. Use the menu to navigate.</p>
          <div class="hero-cta">
            <a class="btn btn-primary" href="#/" data-nav>Go Home</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

// ---------- Router ----------
function render() {
  const app = document.getElementById("app");
  const path = routePath();

  closeMobileNav();

  let html = "";
  if (path === "/" || path === "") html = viewHome();
  else if (path.startsWith("services/")) {
    const slug = path.split("/")[1];
    html = viewService(slug);
  }
  else if (path === "about") html = viewAbout();
  else if (path === "contact") html = viewContact();
  else if (path === "book") html = viewBook();
  else html = viewNotFound();

  app.innerHTML = html;
  bindViewEvents();
  window.scrollTo({ top: 0, behavior: "smooth" });

  if (path === "book") {
    const btn = document.getElementById("openBooking");
    if (btn) btn.click();
  }
}

function bindViewEvents() {
  $$('[data-book]').forEach(btn => {
    btn.addEventListener('click', () => {
      const svc = btn.getAttribute('data-book') || 'Book Appointment';
      modal.open(`Book — ${svc}`, bookingHtml());
    });
  });

  const openBooking = document.getElementById('openBooking');
  if (openBooking) {
    openBooking.addEventListener('click', () => {
      modal.open('Book Appointment', bookingHtml());
    });
  }

  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const name = fd.get('name');
      const email = fd.get('email');
      const service = fd.get('service');
      const message = fd.get('message');

      const subject = encodeURIComponent(`[MMG Inquiry] ${service} — ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nService: ${service}\n\nMessage:\n${message}\n\n— Sent from marlinemg.com`
      );

      window.location.href = `mailto:${SITE_CONFIG.email}?subject=${subject}&body=${body}`;
    });
  }
}

// ---------- Header interactions ----------
function initHeader() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  navToggle?.addEventListener('click', () => {
    const open = navMenu.getAttribute('data-open') === 'true';
    navMenu.setAttribute('data-open', String(!open));
    navToggle.setAttribute('aria-expanded', String(!open));
  });

  $$('[data-dd]').forEach(dd => {
    const btn = dd.querySelector('.nav-dd-btn');
    btn?.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = dd.getAttribute('data-open') === 'true';
      dd.setAttribute('data-open', String(!open));
      btn.setAttribute('aria-expanded', String(!open));
    });
  });

  document.addEventListener('click', () => {
    $$('[data-dd]').forEach(dd => dd.setAttribute('data-open', 'false'));
  });
}

function closeMobileNav() {
  const navMenu = document.getElementById('navMenu');
  const navToggle = document.getElementById('navToggle');
  if (navMenu) navMenu.setAttribute('data-open', 'false');
  if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
}

function initModal() {
  modal.el = document.getElementById('modal');
  modal.body = document.getElementById('modalBody');
  modal.title = document.getElementById('modalTitle');

  document.addEventListener('click', (e) => {
    const close = e.target.closest('[data-close]');
    if (close) modal.close();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.el.getAttribute('aria-hidden') === 'false') {
      modal.close();
    }
  });
}

function initConfigToUI() {
  setText('bizName', SITE_CONFIG.businessName);
  setText('bizName2', SITE_CONFIG.businessName);
  setText('bizTag', 'Real estate + rental operations support');
  setText('footerBiz', SITE_CONFIG.businessName);
  setText('footerLine', SITE_CONFIG.tagline);
  setText('bizCity', SITE_CONFIG.cityLine);

  const phone = document.getElementById('bizPhone');
  if (phone) {
    phone.textContent = SITE_CONFIG.phoneDisplay;
    phone.setAttribute('href', `tel:${SITE_CONFIG.phoneTel}`);
  }

  const email = document.getElementById('bizEmail');
  if (email) {
    email.textContent = SITE_CONFIG.email;
    email.setAttribute('href', `mailto:${SITE_CONFIG.email}`);
  }

  document.getElementById('year').textContent = String(new Date().getFullYear());
}

// ---------- Boot ----------
window.addEventListener('hashchange', render);
window.addEventListener('DOMContentLoaded', () => {
  initConfigToUI();
  initHeader();
  initModal();
  render();
});
