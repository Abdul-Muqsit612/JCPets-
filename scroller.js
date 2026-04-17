/* ── SCROLL HEADER BEHAVIOUR ── */
// ≤480px  : entire header slides up/down via CSS transform (hardware-accelerated)
// ≤768px  : entire header hides/shows via hide-all class
// Desktop : hide navbar+announcement bar on scroll down, restore on scroll up

const header = document.querySelector("header");
if (!header) throw new Error("No header found");

let lastScrollY = window.scrollY;
let ticking = false;

function isSmallMobile() {
  return window.innerWidth <= 480;
}

function isMobile() {
  return window.innerWidth <= 768;
}

function updateHeader() {
  const currentScrollY = window.scrollY;
  const scrollingDown = currentScrollY > lastScrollY;

  if (isSmallMobile()) {
    // FIX: Use the same class logic as mobile but rely on the
    // transform: translateY(-100%) defined in CSS for header.hide-all
    // at this breakpoint — do NOT fight it with display:none on children.
    if (currentScrollY <= 5) {
      header.classList.remove("hide-navbar", "hide-all");
      header.classList.add("show");
    } else if (scrollingDown) {
      header.classList.remove("show", "hide-navbar");
      header.classList.add("hide-all");
    } else {
      header.classList.remove("hide-navbar", "hide-all");
      header.classList.add("show");
    }
  } else if (isMobile()) {
    if (currentScrollY <= 5) {
      header.classList.remove("hide-navbar", "hide-all");
      header.classList.add("show");
    } else if (scrollingDown) {
      header.classList.remove("show", "hide-navbar");
      header.classList.add("hide-all");
    } else {
      header.classList.remove("hide-navbar", "hide-all");
      header.classList.add("show");
    }
  } else {
    // Desktop
    if (currentScrollY <= 5) {
      header.classList.remove("hide-navbar", "hide-all");
      header.classList.add("show");
    } else if (scrollingDown) {
      header.classList.remove("show", "hide-all");
      header.classList.add("hide-navbar");
    } else {
      header.classList.remove("hide-navbar", "hide-all");
      header.classList.add("show");
    }
  }

  lastScrollY = currentScrollY;
  ticking = false;
}

window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  },
  { passive: true },
);

// Initialise
header.classList.add("show");
