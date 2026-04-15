const images = [
  "./Assets/banner4-1.jpg",
  "./Assets/banner4-2.jpg",
  "./Assets/banner4-3.jpg",
  "./Assets/banner4-1.jpg",
  "./Assets/banner4-2.jpg",
  "./Assets/banner4-3.jpg",
  "./Assets/banner4-2.jpg",
  "./Assets/banner4-3.jpg",
  "./Assets/banner4-1.jpg",
  "./Assets/banner4-1.jpg",
  "./Assets/banner4-2.jpg",
  "./Assets/banner4-3.jpg",
  "./Assets/banner4-2.jpg",
  "./Assets/banner4-3.jpg",
  "./Assets/banner4-1.jpg",
  "./Assets/banner4-1.jpg",
  "./Assets/banner4-2.jpg",
  "./Assets/banner4-3.jpg",
  "./Assets/banner4-1.jpg",
  "./Assets/banner4-2.jpg",
  "./Assets/banner4-3.jpg",
];

const igLogo = `
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
    viewBox="0 0 24 24" fill="none" stroke="white"
    stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none"/>
  </svg>`;

const track = document.getElementById("igTrack");
const dotsEl = document.getElementById("igDots");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const GAP = 16;
let current = 0;

function getVisible() {
  return 3;
}

// Build cards once
images.forEach((src, i) => {
  const card = document.createElement("div");
  card.className = "ig-card";
  card.innerHTML = `
    <img src="${src}" alt="Instagram post ${i + 1}" loading="lazy" />
    <div class="ig-overlay">
      <div class="ig-logo">${igLogo}</div>
    </div>`;
  track.appendChild(card);
});

function goTo(idx) {
  const VISIBLE = getVisible();
  const maxIndex = Math.max(0, images.length - VISIBLE);
  current = Math.max(0, Math.min(idx, maxIndex));

  const viewportWidth = track.parentElement.offsetWidth;
  // Match whichever gap CSS uses at this breakpoint
  const GAP_PX = window.innerWidth <= 480 ? 12 : 16;
  const cardWidth = (viewportWidth - GAP_PX * (VISIBLE - 1)) / VISIBLE;

  document.querySelectorAll(".ig-card").forEach((card) => {
    card.style.flex = `0 0 ${cardWidth}px`;
  });

  track.style.transform = `translateX(-${current * (cardWidth + GAP_PX)}px)`;

  prevBtn.disabled = current === 0;
  nextBtn.disabled = current >= maxIndex;
}

prevBtn.addEventListener("click", () => goTo(current - getVisible()));
nextBtn.addEventListener("click", () => goTo(current + getVisible()));

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    const VISIBLE = getVisible();
    current = Math.floor(current / VISIBLE) * VISIBLE;
    goTo(current);
  }, 150);
});

/* ── SCROLL HEADER BEHAVIOUR ── */
// Mobile (≤767px): header is always fully visible — no hide classes
// Desktop: hide navbar+announcement on scroll down, show infobar sticky,
//          restore full header on scroll up

const header = document.querySelector("header");
if (!header) throw new Error("No header found");

let lastScrollY = window.scrollY;
let ticking = false;

function isMobile() {
  return window.innerWidth <= 767;
}

function updateHeader() {
  if (isMobile()) {
    // Always show everything on mobile
    header.classList.remove("hide-navbar", "hide-all");
    header.classList.add("show");
    ticking = false;
    return;
  }

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
