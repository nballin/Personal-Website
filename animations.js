(function () {
  'use strict';

  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const isTouch  = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isNarrowViewport = () => window.matchMedia('(max-width: 1024px)').matches;

  // ─── 1. BACKGROUND CANVAS — 3-D PARTICLE CONSTELLATION ────────────────────
  const setupConstellationCanvas = (sectionEl, canvasId, countDesktop) => {
    if (!sectionEl) return;
    if (getComputedStyle(sectionEl).position === 'static') sectionEl.style.position = 'relative';

    const contentEl = sectionEl.querySelector('.hero-content, .project-detail-container, .container');
    if (contentEl) {
      contentEl.style.position = 'relative';
      contentEl.style.zIndex = '1';
    }

    const canvas = document.createElement('canvas');
    canvas.id = canvasId;
    canvas.className = 'bg-fx-canvas';
    sectionEl.insertBefore(canvas, sectionEl.firstChild);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const N = isMobile ? Math.max(20, Math.floor(countDesktop * 0.45)) : countDesktop;
    let W = 0;
    let H = 0;
    const resize = () => {
      W = canvas.width = sectionEl.offsetWidth;
      H = canvas.height = sectionEl.offsetHeight;
    };
    resize();
    new ResizeObserver(resize).observe(sectionEl);

    const pts = Array.from({ length: N }, () => ({
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2,
      z: (Math.random() - 0.5) * 2,
      vx: (Math.random() - 0.5) * 3.5e-4,
      vy: (Math.random() - 0.5) * 3.5e-4,
      vz: (Math.random() - 0.5) * 3.5e-4,
    }));

    let tmx = 0;
    let tmy = 0;
    let cmx = 0;
    let cmy = 0;
    if (!isTouch) {
      document.addEventListener('mousemove', e => {
        tmx = (e.clientX / window.innerWidth  - 0.5) * 0.55;
        tmy = (e.clientY / window.innerHeight - 0.5) * 0.55;
      });
    }

    const rotY = (x, y, z, a) => [x * Math.cos(a) + z * Math.sin(a), y, -x * Math.sin(a) + z * Math.cos(a)];
    const rotX = (x, y, z, a) => [x, y * Math.cos(a) - z * Math.sin(a), y * Math.sin(a) + z * Math.cos(a)];

    const project = (x, y, z) => {
      let [px, py, pz] = rotY(x, y, z, cmx);
      [px, py, pz] = rotX(px, py, pz, -cmy);
      const fov = 2.6;
      const d = fov / (fov + pz + 1.2);
      return {
        sx: W / 2 + px * d * W * 0.44,
        sy: H / 2 + py * d * H * 0.44,
        r: Math.max(0.5, d * 2.8),
        a: Math.min(0.85, d * 0.65),
      };
    };

    const LINK_D = 0.38;
    const LINK_D2 = LINK_D * LINK_D;
    let raf;
    let isRunning = false;

    const draw = () => {
      isRunning = true;
      cmx += (tmx - cmx) * 0.04;
      cmy += (tmy - cmy) * 0.04;
      ctx.clearRect(0, 0, W, H);

      for (const p of pts) {
        p.x += p.vx; if (p.x >  1) p.x -= 2; else if (p.x < -1) p.x += 2;
        p.y += p.vy; if (p.y >  1) p.y -= 2; else if (p.y < -1) p.y += 2;
        p.z += p.vz; if (p.z >  1) p.z -= 2; else if (p.z < -1) p.z += 2;
      }

      const proj = pts.map(p => project(p.x, p.y, p.z));

      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dz = pts[i].z - pts[j].z;
          if (dx * dx + dy * dy + dz * dz < LINK_D2) {
            const frac = 1 - Math.sqrt(dx * dx + dy * dy + dz * dz) / LINK_D;
            ctx.strokeStyle = `rgba(15,15,15,${frac * 0.13})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(proj[i].sx, proj[i].sy);
            ctx.lineTo(proj[j].sx, proj[j].sy);
            ctx.stroke();
          }
        }
      }

      for (const p of proj) {
        ctx.fillStyle = `rgba(20,20,20,${p.a * 0.68})`;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    draw();
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        isRunning = false;
      } else if (!isRunning) {
        draw();
      }
    });
  };

  const heroEl = document.querySelector('.hero');
  setupConstellationCanvas(heroEl, 'hero-canvas', 85);

  const experienceEl = document.querySelector('.experience');
  setupConstellationCanvas(experienceEl, 'experience-canvas', 68);

  const researchBlogEl = document.querySelector('.research-blog');
  setupConstellationCanvas(researchBlogEl, 'research-blog-canvas', 62);

  const projectDetailEl = document.querySelector('.project-detail');
  setupConstellationCanvas(projectDetailEl, 'project-detail-canvas', 70);

  // ─── 2. FLOATING GEO SHAPES (hero background) ─────────────────────────────
  const heroForShapes = document.querySelector('.hero');
  if (heroForShapes && !isMobile) {
    const bg = document.createElement('div');
    bg.className = 'geo-bg';
    ['geo-cube', 'geo-ring', 'geo-ring2', 'geo-tri', 'geo-dot'].forEach(cls => {
      const el = document.createElement('div');
      el.className = `geo-shape ${cls}`;
      bg.appendChild(el);
    });
    heroForShapes.appendChild(bg);
  }

  // ─── 3b. ABOUT TITLE — SPLIT CHARS FOR CSS WAVE ──────────────────────────
  const aboutTitleEl = document.querySelector('#about .section-title');
  if (aboutTitleEl) {
    aboutTitleEl.dataset.anim = '1';
    const rawText = aboutTitleEl.textContent.trim();
    aboutTitleEl.innerHTML = '';
    [...rawText].forEach((ch, i) => {
      const s = document.createElement('span');
      s.className = 'title-char';
      s.textContent = ch === ' ' ? '\u00A0' : ch;
      s.style.setProperty('--ci', i);
      aboutTitleEl.appendChild(s);
    });
  }

  // ─── 3. SECTION TITLE — 3-D LETTER ENTRANCE ───────────────────────────────
  document.querySelectorAll('.section-title').forEach(title => {
    if (title.dataset.anim) return;
    title.dataset.anim = '1';
    const text = title.textContent.trim();
    title.innerHTML = '';
    [...text].forEach((ch, i) => {
      const s = document.createElement('span');
      s.className = 'title-char';
      s.textContent = ch === ' ' ? '\u00A0' : ch;
      s.style.setProperty('--ci', i);
      title.appendChild(s);
    });
    new IntersectionObserver((entries, obs) => {
      if (entries[0].isIntersecting) { title.classList.add('title-go'); obs.disconnect(); }
    }, { threshold: 0.5 }).observe(title);
  });

  // ─── 4. 3-D CARD TILT + SPECULAR HIGHLIGHT ────────────────────────────────
  if (!isTouch) {
    document.documentElement.classList.add('js-tilt');

    const tiltEl = (el, maxDeg = 12) => {
      el.style.transformStyle = 'preserve-3d';
      el.style.willChange = 'transform';
      const shine = document.createElement('div');
      shine.className = 'card-shine';
      el.appendChild(shine);

      el.addEventListener('mousemove', e => {
        const r  = el.getBoundingClientRect();
        const x  = e.clientX - r.left, y = e.clientY - r.top;
        const cx = r.width / 2,       cy = r.height / 2;
        const rx = ((y - cy) / cy) * -maxDeg;
        const ry = ((x - cx) / cx) *  maxDeg;
        el.style.transition = 'transform 0.08s ease, box-shadow 0.08s ease';
        el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(12px)`;
        el.style.boxShadow = `${-ry*1.6}px ${-rx*1.6}px 32px rgba(0,0,0,0.22)`;
        shine.style.background = `radial-gradient(circle at ${(x/r.width)*100}% ${(y/r.height)*100}%, rgba(255,255,255,0.22) 0%, transparent 62%)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transition = 'transform 0.65s cubic-bezier(0.23,1,0.32,1), box-shadow 0.65s cubic-bezier(0.23,1,0.32,1)';
        el.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateZ(0)';
        el.style.boxShadow = '';
        shine.style.background = 'none';
      });
    };

    document.querySelectorAll('.project-card-link').forEach(w => tiltEl(w, 10));
    document.querySelectorAll('.contact-link').forEach(l => tiltEl(l, 13));
    document.querySelectorAll('.experience-item').forEach(i => tiltEl(i, 4));
  }

  // ─── 5. PROFILE PHOTO — 3-D PARALLAX TILT ─────────────────────────────────
  const photoEl = document.querySelector('.hero-image .image-placeholder');
  if (photoEl && !isTouch) {
    const hSec = document.querySelector('.hero');
    if (hSec) {
      hSec.addEventListener('mousemove', e => {
        const r = hSec.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width  - 0.5;
        const y = (e.clientY - r.top)  / r.height - 0.5;
        photoEl.style.transition = 'transform 0.12s ease, box-shadow 0.12s ease';
        photoEl.style.transform  = `perspective(700px) rotateX(${y*-22}deg) rotateY(${x*22}deg) scale(1.04)`;
        photoEl.style.boxShadow  = `${x*20}px ${y*20}px 40px rgba(0,0,0,0.22)`;
      });
      hSec.addEventListener('mouseleave', () => {
        photoEl.style.transition = 'transform 0.8s cubic-bezier(0.23,1,0.32,1), box-shadow 0.8s cubic-bezier(0.23,1,0.32,1)';
        photoEl.style.transform  = 'perspective(700px) rotateX(0) rotateY(0) scale(1)';
        photoEl.style.boxShadow  = '';
      });
    }
  }

  // ─── 6. MAGNETIC BUTTONS ──────────────────────────────────────────────────
  if (!isTouch) {
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width  / 2) * 0.28;
        const y = (e.clientY - r.top  - r.height / 2) * 0.28;
        btn.style.transform = `translate(${x}px, ${y}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }

  // ─── 7. SKILL TAG STAGGERED WAVE ──────────────────────────────────────────
  document.querySelectorAll('.skills-grid').forEach(grid => {
    grid.querySelectorAll('.skill-tag').forEach((tag, i) => {
      tag.style.setProperty('--wi', i);
    });
  });

  // ─── 8. EXPERIENCE ITEMS — 3-D STAGGERED ENTRANCE ─────────────────────────
  document.querySelectorAll('.experience-item').forEach((item, i) => {
    // Skip if tilt already applied (avoids double-transform)
    if (!isTouch) return; // desktop: tilt handles the effect
    const fromLeft = i % 2 === 0;
    item.style.opacity = '0';
    item.style.transform = `perspective(700px) rotateY(${fromLeft ? -18 : 18}deg) translateX(${fromLeft ? -40 : 40}px)`;
    item.style.transition = 'none';
    new IntersectionObserver((entries, obs) => {
      if (entries[0].isIntersecting) {
        setTimeout(() => {
          item.style.transition = 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.23,1,0.32,1)';
          item.style.opacity    = '1';
          item.style.transform  = 'perspective(700px) rotateY(0) translateX(0)';
        }, i * 90);
        obs.disconnect();
      }
    }, { threshold: 0.12 }).observe(item);
  });

  // ─── 9. ABOUT SECTION — SCROLL-DRIVEN LEFT PUSH + STRING DROP ───────────
  const aboutSecEl = document.querySelector('#about');
  if (aboutSecEl) {
    const aboutContEl = aboutSecEl.querySelector('.container');
    if (aboutContEl) aboutContEl.style.willChange = 'transform';

    const stringGallery = aboutSecEl.querySelector('.string-gallery');
    let areStringsActive = false;

    const onAboutFrame = () => {
      const rect = aboutSecEl.getBoundingClientRect();
      const vp   = window.innerHeight;
      // Start push only when section is ~60% into viewport (later trigger)
      const raw  = (vp * 0.4 - rect.top) / (vp * 0.5);
      const p    = Math.max(0, Math.min(1, raw));
      const ease = 1 - (1 - p) * (1 - p);

      if (aboutContEl) {
        if (isNarrowViewport()) aboutContEl.style.transform = 'translateX(0)';
        else aboutContEl.style.transform = `translateX(${ease * -20}vw)`;
      }

      // Toggle string+photo drop with hysteresis to avoid flicker.
      if (stringGallery) {
        if (!areStringsActive && p >= 0.65) {
          stringGallery.classList.add('active');
          areStringsActive = true;
        } else if (areStringsActive && p <= 0.5) {
          stringGallery.classList.remove('active');
          areStringsActive = false;
        }
      }
    };
    window.addEventListener('scroll', onAboutFrame, { passive: true });
    onAboutFrame();
  }

  // ─── 10. ABOUT MOBILE PHOTO CARDS — FADE IN ON SCROLL ─────────────────────
  const aboutPhotoCards = document.querySelectorAll('.about-photo-card');
  if (aboutPhotoCards.length) {
    const cardObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -40px 0px' });

    aboutPhotoCards.forEach(card => cardObserver.observe(card));
  }

})();
