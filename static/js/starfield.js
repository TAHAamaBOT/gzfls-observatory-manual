(function () {
  'use strict';

  const STAR_COUNT = 120;
  const MAX_LINE_DIST = 120; // px — only connect stars closer than this
  const LINE_OPACITY = 0.18;
  const TWINKLE_SPEED = 0.008;

  let canvas, ctx;
  let stars = [];
  let animationId;
  let currentTheme = 'light';
  let width, height;
  let mouseX = -1000, mouseY = -1000; // off-screen by default

  function createStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.4 + Math.random() * 1.6, // radius 0.4–2.0
        baseAlpha: 0.3 + Math.random() * 0.7,
        phase: Math.random() * Math.PI * 2,
        speed: TWINKLE_SPEED * (0.5 + Math.random()),
      });
    }
  }

  function getColors() {
    if (currentTheme === 'dark') {
      return {
        star: '255, 255, 255',
        line: '180, 200, 255',
        bg: '#0a0a1a',
      };
    }
    return {
      star: '60, 70, 140',
      line: '100, 120, 180',
      bg: 'transparent',
    };
  }

  function resize() {
    width = window.innerWidth;
    height = document.documentElement.scrollHeight;
    canvas.width = width;
    canvas.height = height;
    // reposition stars after resize
    stars.forEach((s) => {
      s.x = Math.random() * width;
      s.y = Math.random() * height;
    });
  }

  function draw(timestamp) {
    const colors = getColors();
    ctx.clearRect(0, 0, width, height);

    // Update & draw each star
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      const alpha = s.baseAlpha * (0.6 + 0.4 * Math.sin(timestamp * s.speed + s.phase));

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${colors.star},${Math.max(0.08, alpha).toFixed(3)})`;
      ctx.fill();

      // Brighter core for bigger stars
      if (s.r > 1.2) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colors.star},${Math.min(1, alpha * 1.4).toFixed(3)})`;
        ctx.fill();
      }
    }

    // Draw connecting lines between nearby stars
    for (let i = 0; i < stars.length; i++) {
      for (let j = i + 1; j < stars.length; j++) {
        const dx = stars[i].x - stars[j].x;
        const dy = stars[i].y - stars[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_LINE_DIST) {
          const lineAlpha = LINE_OPACITY * (1 - dist / MAX_LINE_DIST);
          ctx.beginPath();
          ctx.moveTo(stars[i].x, stars[i].y);
          ctx.lineTo(stars[j].x, stars[j].y);
          ctx.strokeStyle = `rgba(${colors.line},${lineAlpha.toFixed(3)})`;
          ctx.lineWidth = 0.4;
          ctx.stroke();
        }
      }
    }

    // Subtle glow near mouse
    if (mouseX > 0 && mouseY > 0 && mouseX < width && mouseY < height) {
      const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 160);
      gradient.addColorStop(0, `rgba(${colors.star},0.06)`);
      gradient.addColorStop(1, `rgba(${colors.star},0)`);
      ctx.fillStyle = gradient;
      ctx.fillRect(mouseX - 160, mouseY - 160, 320, 320);
    }

    animationId = requestAnimationFrame(draw);
  }

  function detectTheme() {
    const htmlTheme = document.documentElement.getAttribute('data-theme');
    return htmlTheme === 'dark' ? 'dark' : 'light';
  }

  function init() {
    canvas = document.createElement('canvas');
    canvas.id = 'starfield-canvas';
    canvas.style.cssText =
      'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;';
    document.body.prepend(canvas);
    ctx = canvas.getContext('2d');

    currentTheme = detectTheme();
    resize();
    createStars();
    animationId = requestAnimationFrame(draw);

    window.addEventListener('resize', () => {
      resize();
      createStars();
    });

    // Track mouse for subtle glow
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Watch for theme changes (Docusaurus toggles data-theme)
    const observer = new MutationObserver(() => {
      const newTheme = detectTheme();
      if (newTheme !== currentTheme) {
        currentTheme = newTheme;
        // stars stay in place, just redraw with new colors
      }
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
