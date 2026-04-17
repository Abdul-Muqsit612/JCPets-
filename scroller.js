/* ── SCROLL HEADER BEHAVIOUR ── */
// Mobile (≤768px): header hides/shows smoothly on scroll
// Desktop: hide navbar+announcement on scroll down, show infobar sticky,
//          restore full header on scroll up

const header = document.querySelector("header");
if (!header) throw new Error("No header found");

let lastScrollY = window.scrollY;
let ticking = false;

function isMobile() {
  return window.innerWidth <= 768;
}

function updateHeader() {
  const currentScrollY = window.scrollY;
  const scrollingDown = currentScrollY > lastScrollY;

  if (isMobile()) {
    // Mobile behavior: hide entire header on scroll down
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
      header.classList.remove("hide-infobar");
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
