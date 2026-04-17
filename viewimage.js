document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("lightboxOverlay");
  const zoomWrapper = document.querySelector(".img-zoom-wrapper");

  if (!zoomWrapper || !overlay) return; // safety check

  // Click anywhere on the image/icon to open
  zoomWrapper.addEventListener("click", () => {
    overlay.classList.add("active");
  });

  // Click dark backdrop to close
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.classList.remove("active");
    }
  });

  // Escape key closes it too
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") overlay.classList.remove("active");
  });
});
