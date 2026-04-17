/* ── SCROLL HEADER BEHAVIOUR ── */
// Mobile (≤768px): header hides/shows smoothly on scroll
// Small Mobile (≤480px): navbar hides on scroll down, shows on scroll up, infobar always hidden
// Desktop: hide navbar+announcement on scroll down, show infobar sticky,
//          restore full header on scroll up

const header = document.querySelector("header");
if (!header) throw new Error("No header found");

let lastScrollY = window.scrollY;
let ticking = false;

function isMobile() {
  return window.innerWidth <= 768;
}

function isSmallMobile() {
  return window.innerWidth <= 480;
}

function updateHeader() {
  const currentScrollY = window.scrollY;
  const scrollingDown = currentScrollY > lastScrollY;

  if (isSmallMobile()) {
    // Small mobile behavior: hide navbar on scroll down, show on scroll up, infobar always hidden
    if (currentScrollY < 15) {
      // At top — show navbar, hide infobar
      header.classList.remove("hide-navbar", "hide-all");
      header.classList.add("show");
    } else if (scrollingDown && currentScrollY > 25) {
      // Scrolling down — hide navbar
      header.classList.remove("show");
      header.classList.add("hide-navbar");
    } else if (!scrollingDown && currentScrollY > 15) {
      // Scrolling up — show navbar
      header.classList.remove("hide-navbar", "hide-all");
      header.classList.add("show");
    }
  } else if (isMobile()) {
    // Regular mobile behavior: hide entire header on scroll down
    if (currentScrollY < 15) {
      // At top — show everything
      header.classList.remove("hide-navbar", "hide-all");
      header.classList.add("show");
    } else if (scrollingDown && currentScrollY > 25) {
      // Scrolling down — hide entire header completely
      header.classList.remove("show", "hide-navbar");
      header.classList.add("hide-all");
    } else if (!scrollingDown && currentScrollY > 15) {
      // Scrolling up — show entire header
      header.classList.remove("hide-navbar", "hide-all");
      header.classList.add("show");
    }
  } else {
    // Desktop behavior (unchanged)
    if (currentScrollY < 10) {
      // At top — show everything
      header.classList.remove("hide-navbar", "hide-all");
      header.classList.add("show");
    } else if (scrollingDown && currentScrollY > 80) {
      // Scrolling down — hide navbar & announcement, keep infobar sticky
      header.classList.remove("show", "hide-all");
      header.classList.add("hide-navbar");
    } else if (!scrollingDown) {
      // Scrolling up — restore full header
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

// Initialize header
header.classList.add("show");
