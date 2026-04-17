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

/* ── FOOTER ACCORDION (≤480px only) ── */
function initFooterAccordions() {
  // FIX: Only run accordion logic at ≤480px, not at 481–767px
  if (window.innerWidth > 480) return;

  /* ── Nav columns ── */
  document.querySelectorAll(".footer-nav").forEach((nav, idx) => {
    if (nav.querySelector(".accordion-header")) return; // already initialised

    const ul = nav.querySelector("ul");
    if (!ul) return;

    const label = idx === 0 ? "Links" : "More links";

    const header = document.createElement("div");
    header.className = "accordion-header";
    header.innerHTML = `<span>${label}</span>
      <span class="acc-icon"><i class="fa-solid fa-chevron-down"></i></span>`;

    nav.insertBefore(header, ul);

    // Start closed
    nav.classList.add("acc-closed");

    header.addEventListener("click", () => {
      nav.classList.toggle("acc-open");
      nav.classList.toggle("acc-closed");
    });
  });

  /* ── Contact section ── */
  const contact = document.querySelector(".footer-contact");
  if (contact && !contact.querySelector(".accordion-header")) {
    const originalH3 = contact.querySelector("h3");
    const label = originalH3 ? originalH3.textContent : "Our contact details";

    // Wrap all children except h3 into a .contact-body div
    const body = document.createElement("div");
    body.className = "contact-body";

    Array.from(contact.children).forEach((child) => {
      if (child.tagName !== "H3") body.appendChild(child);
    });

    const header = document.createElement("div");
    header.className = "accordion-header";
    header.innerHTML = `<span>${label}</span>
      <span class="acc-icon"><i class="fa-solid fa-chevron-down"></i></span>`;

    contact.appendChild(header);
    contact.appendChild(body);

    // Start closed
    contact.classList.add("acc-closed");

    header.addEventListener("click", () => {
      contact.classList.toggle("acc-open");
      contact.classList.toggle("acc-closed");
    });
  }
}

// Run on load
initFooterAccordions();

// Re-run only when crossing the 480px boundary
let lastWidth = window.innerWidth;
window.addEventListener("resize", () => {
  if (window.innerWidth === lastWidth) return;
  lastWidth = window.innerWidth;

  if (window.innerWidth <= 480) {
    initFooterAccordions();
  } else {
    // FIX: Tear down accordion when resizing above 480px
    // so desktop/tablet layout is clean
    document.querySelectorAll(".footer-nav").forEach((nav) => {
      const accHeader = nav.querySelector(".accordion-header");
      if (accHeader) accHeader.remove();
      nav.classList.remove("acc-open", "acc-closed");
    });

    const contact = document.querySelector(".footer-contact");
    if (contact) {
      const accHeader = contact.querySelector(".accordion-header");
      if (accHeader) accHeader.remove();

      // Move contact-body children back out
      const body = contact.querySelector(".contact-body");
      if (body) {
        Array.from(body.children).forEach((child) =>
          contact.appendChild(child),
        );
        body.remove();
      }

      contact.classList.remove("acc-open", "acc-closed");
    }
  }
});
