import mediumZoom from 'medium-zoom';
import 'medium-zoom/dist/style.css';

// Wait for the page to fully render, then bind zoom to all doc images
export function onRouteDidUpdate({location, previousLocation}) {
  // Only attach on navigation (not initial load handled below)
  if (location.pathname !== previousLocation?.pathname) {
    setTimeout(attachZoom, 100);
  }
}

function attachZoom() {
  // Target content images in markdown docs and blog posts
  mediumZoom('.markdown img:not([data-zoom-disabled]), article img:not([data-zoom-disabled])', {
    background: 'rgba(0, 0, 0, 0.88)',
    margin: 24,
  });
}

// Initial load
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(attachZoom, 300);
  });
}
