/* ── INFO BAR TEXT SLIDER ── */
// Mobile text slider animation for info bar
// Shows one info message at a time on mobile devices (≤768px)

let textSliderInterval = null;

function isMobileDevice() {
  return window.innerWidth <= 768;
}

function initMobileTextSlider() {
  // Clear existing interval
  if (textSliderInterval) {
    clearInterval(textSliderInterval);
    textSliderInterval = null;
  }
  
  const infoItems = document.querySelectorAll('.info');
  if (infoItems.length === 0) return;
  
  if (!isMobileDevice()) {
    // Desktop: show all items normally
    infoItems.forEach(item => {
      item.style.display = 'flex';
      item.style.position = 'static';
      item.style.opacity = '1';
      item.classList.remove('mobile-active');
    });
    return;
  }
  
  // Mobile: text slider animation
  let currentIndex = 0;
  
  // Hide all items first
  infoItems.forEach((item, index) => {
    item.classList.remove('mobile-active');
    if (index === 0) {
      // Show first item
      setTimeout(() => {
        item.classList.add('mobile-active');
      }, 100);
    }
  });
  
  // Start cycling through items
  textSliderInterval = setInterval(() => {
    // Hide current item
    infoItems[currentIndex].classList.remove('mobile-active');
    
    // Move to next item
    currentIndex = (currentIndex + 1) % infoItems.length;
    
    // Show next item after brief delay
    setTimeout(() => {
      infoItems[currentIndex].classList.add('mobile-active');
    }, 200);
  }, 3000); // 3 seconds per item
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  initMobileTextSlider();
});

// Re-initialize on window resize
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    initMobileTextSlider();
  }, 250);
});