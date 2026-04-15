/* ── SCROLL HEADER BEHAVIOUR ── */
// Mobile (≤767px): header is always fully visible — no hide classes
// Desktop: hide navbar+announcement on scroll down, show infobar sticky,
//          restore full header on scroll up

if (!header) throw new Error("No header found");

let lastScrollY = window.scrollY;
let ticking = false;

function isMobile() {
  return window.innerWidth <= 767;
}

function updateHeader() {
  const currentScrollY = window.scrollY;
  const scrollingDown = currentScrollY > lastScrollY;

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
