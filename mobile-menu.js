document.addEventListener("DOMContentLoaded", () => {
  const mobileToggle = document.getElementById("mobileToggle");
  const mobileSidebar = document.getElementById("mobileSidebar");
  const sidebarClose = document.getElementById("sidebarClose");

  if (!mobileToggle || !mobileSidebar || !sidebarClose) return;

  const overlay = document.createElement("div");
  overlay.className = "mobile-overlay";
  document.body.appendChild(overlay);

  function openSidebar() {
    mobileSidebar.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }
  function closeSidebar() {
    mobileSidebar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  mobileToggle.addEventListener("click", openSidebar);
  sidebarClose.addEventListener("click", closeSidebar);
  overlay.addEventListener("click", closeSidebar);
  document
    .querySelectorAll(".sidebar-link")
    .forEach((link) => link.addEventListener("click", closeSidebar));
});
/* ── FOOTER ACCORDION (mobile only) ── */
function initFooterAccordions() {
  if (window.innerWidth > 767) return;

  /* ── Nav columns: wrap existing <ul> with accordion header ── */
  document.querySelectorAll(".footer-nav").forEach((nav, idx) => {
    if (nav.querySelector(".accordion-header")) return; // already done

    const ul = nav.querySelector("ul");
    if (!ul) return;

    // Determine label from first link text or fallback
    const label = idx === 0 ? "Links" : "More links";

    const header = document.createElement("div");
    header.className = "accordion-header";
    header.innerHTML = `<span>${label}</span>
      <span class="acc-icon"><i class="fa-solid fa-chevron-down"></i></span>`;

    nav.insertBefore(header, ul);

    header.addEventListener("click", () => {
      nav.classList.toggle("acc-open");
    });
  });

  /* ── Contact section ── */
  const contact = document.querySelector(".footer-contact");
  if (contact && !contact.querySelector(".accordion-header")) {
    const originalH3 = contact.querySelector("h3");
    const label = originalH3 ? originalH3.textContent : "Our contact details";

    // Wrap everything except the h3 in a .contact-body div
    const body = document.createElement("div");
    body.className = "contact-body";

    // Move all children except the h3 into body
    Array.from(contact.children).forEach((child) => {
      if (child.tagName !== "H3") body.appendChild(child);
    });

    const header = document.createElement("div");
    header.className = "accordion-header";
    header.innerHTML = `<span>${label}</span>
      <span class="acc-icon"><i class="fa-solid fa-chevron-down"></i></span>`;

    contact.appendChild(header);
    contact.appendChild(body);

    header.addEventListener("click", () => {
      contact.classList.toggle("acc-open");
    });
  }
}

// Run on load
initFooterAccordions();

// Re-init if window resizes into mobile range
let lastWidth = window.innerWidth;
window.addEventListener("resize", () => {
  if (window.innerWidth !== lastWidth) {
    lastWidth = window.innerWidth;
    if (window.innerWidth <= 767) initFooterAccordions();
  }
});

/* ── SCROLL BEHAVIOUR ── */
// On mobile: header always stays fully visible
// On desktop: existing scroller.js handles show/hide classes

// Patch: if scroller.js adds hide classes on mobile, strip them
