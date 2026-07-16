import mediumZoom from 'medium-zoom';
import 'medium-zoom/dist/style.css';

const selector = '.markdown img:not([data-zoom-disabled]), article img:not([data-zoom-disabled])';

// Lazily initialized — mediumZoom accesses `window`, unavailable during SSR
let zoom = null;

function getZoom() {
  if (!zoom) {
    zoom = mediumZoom({
      background: 'rgba(0, 0, 0, 0.88)',
      margin: 24,
    });
  }
  return zoom;
}

function attachZoom() {
  getZoom().detach();
  getZoom().attach(selector);
}

// Re-attach on client-side navigation (skip initial load — handled by DOMContentLoaded)
export function onRouteDidUpdate({location, previousLocation}) {
  if (previousLocation && location.pathname !== previousLocation.pathname) {
    setTimeout(attachZoom, 100);
  }
}

// Initial load
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(attachZoom, 300);
  });
}
