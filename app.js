/* ===== EDIT THESE PLACEHOLDERS ===== */
const SITE = {
  brand: "Alama",
  tagline: "IP protection in Kenya & the US",
  phone: "+254 117 369 361",
  phoneHref: "+254117369361",
  email: "jessekimani674@gmail.com",
  address: "98-20106, Nakuru, Kenya",
  whatsapp: "254117369361"
};

const LOGO = `<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 2l15 5v11c0 9.5-6.2 16.4-15 20C11.2 34.400 5 27.500 5 18V7z" fill="#112d52"/><path d="M20 2l15 5v11c0 9.500-6.200 16.400-15 20z" fill="#0a1d35"/><path d="M13 21l5 5 9-11" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/><rect x="5" y="30" width="30" height="0" /></svg>`;

const PAGES = [
  ["index.html", "Home"],
  ["services.html", "Services"],
  ["pricing.html", "Pricing"],
  ["faq.html", "FAQ"],
  ["about.html", "About"],
  ["contact.html", "Contact"]
];

function renderChrome() {
  const here = location.pathname.split("/").pop() || "index.html";
  const nav = PAGES.map(([h, t]) => `<a href="${h}" class="${h === here ? "active" : ""}">${t}</a>`).join("");
  const top = document.getElementById("top");
  if (top) top.innerHTML = `
    <div class="topbar"><div class="wrap">
      <span><span class="flagbar"></span>Trademark, patent &amp; copyright services in Kenya and the US</span>
      <span><span class="hide-s">Call us: </span><a href="tel:${SITE.phoneHref}">${SITE.phone}</a> &nbsp;·&nbsp; <a href="https://wa.me/${SITE.whatsapp}">WhatsApp</a></span>
    </div></div>
    <header class="site"><div class="wrap">
      <a class="logo" href="index.html">${LOGO}<span>${SITE.brand}<small>.</small></span></a>
      <button class="menu-btn" aria-label="Menu" onclick="document.querySelector('nav.main').classList.toggle('open')">Menu</button>
      <nav class="main">${nav}<a class="btn btn-primary btn-sm" href="contact.html">Contact us</a></nav>
    </div></header>`;

  const foot = document.getElementById("foot");
  if (foot) foot.innerHTML = `
    <footer class="site"><div class="wrap">
      <div class="cols">
        <div>
          <a class="logo" href="index.html" style="color:#fff">${LOGO}<span>${SITE.brand}<small>.</small></span></a>
          <p style="margin-top:14px">Trademark, patent and copyright support for individuals and businesses in Kenya and the United States.</p>
        </div>
        <div><h4>Services</h4>
          <a href="services.html#kenya">Kenya trademark</a>
          <a href="services.html#us">US trademark</a>
          <a href="services.html#patents">Patent services</a>
          <a href="services.html#copyright">Copyright services</a>
          <a href="services.html#watch">Brand watch</a>
          <a href="services.html#renew">Renewals &amp; support</a>
        </div>
        <div><h4>Company</h4>
          <a href="pricing.html">Pricing</a><a href="faq.html">FAQ</a><a href="about.html">About</a><a href="contact.html">Contact</a>
        </div>
        <div><h4>Contact</h4>
          <a href="tel:${SITE.phoneHref}">${SITE.phone}</a>
          <a href="mailto:${SITE.email}">${SITE.email}</a>
          <span style="display:block;margin-bottom:8px">${SITE.address}</span>
        </div>
      </div>
      <div class="legal">© ${new Date().getFullYear()} ${SITE.brand}. Information on this site is general and is not legal advice. Trademark package prices are illustrative; confirm current official fees before filing. <a href="privacy.html">Privacy Policy</a></div>
    </div></footer>`;
}

/* pricing: currency + jurisdiction toggles */
function initPricing() {
  const root = document.getElementById("pricing-root");
  if (!root) return;
  let cur = "KES", j = "ke";
  const render = () => {
    root.querySelectorAll("[data-ke]").forEach(el => {
      const src = el.dataset[j === "ke" ? "ke" : "us"].split("|");
      el.textContent = (cur === "KES" ? src[0] : src[1]);
    });
    root.querySelectorAll("[data-show]").forEach(el => el.style.display = el.dataset.show === j ? "" : "none");
    root.querySelectorAll(".cur button").forEach(b => b.classList.toggle("on", b.dataset.cur === cur));
    root.querySelectorAll(".jur button").forEach(b => b.classList.toggle("on", b.dataset.j === j));
  };
  root.querySelectorAll(".cur button").forEach(b => b.onclick = () => { cur = b.dataset.cur; render(); });
  root.querySelectorAll(".jur button").forEach(b => b.onclick = () => { j = b.dataset.j; render(); });
  render();
}

/* assessment form -> opens email draft (no backend needed). Swap for Formspree/Netlify Forms when live. */
function initForm() {
  const f = document.getElementById("assess");
  if (!f) return;
  f.addEventListener("submit", e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(f).entries());
    const body = Object.entries(d).map(([k, v]) => `${k}: ${v}`).join("\n");
    location.href = `mailto:${SITE.email}?subject=${encodeURIComponent("Service inquiry: " + (d.service || ""))}&body=${encodeURIComponent(body)}`;
    document.getElementById("ok").style.display = "block";
  });
}

document.addEventListener("DOMContentLoaded", () => { renderChrome(); initPricing(); initForm(); });
