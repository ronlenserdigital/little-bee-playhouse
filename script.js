/* ============================================
   BUSY BEES: LITTLE BEE SENSORY PLAYHOUSE
   script.js — Premium Interactions
   ============================================ */

// ─── Web3Forms Key ───────────────────────────
const WEB3FORMS_KEY = '5eaa66de-2d99-47be-ab8f-6e7a51d23583'; // Replace with actual key

// ─── DOM Ready ───────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.overflow = 'visible';
  initCursor();
  initNav();
  initMobileMenu();
  initCountdown();
  initScrollReveal();
  initForm();
  initSmoothScroll();
  initFAQ();
  initExtraForms();
});

// ─── Event & Newsletter Forms ────────────────
function initExtraForms() {
  const forms = [
    { id: 'eventForm', btn: 'eventSubmitBtn', success: 'eventFormSuccess', label: 'Reserve Spot 🐝' },
    { id: 'newsletterForm', btn: 'newsletterBtn', success: 'newsletterSuccess', label: 'Subscribe 🍯' },
  ];

  forms.forEach(cfg => {
    const form = document.getElementById(cfg.id);
    const btn = document.getElementById(cfg.btn);
    const success = document.getElementById(cfg.success);
    if (!form) return;

    form.addEventListener('submit', async e => {
      e.preventDefault();
      const original = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      const data = Object.fromEntries(new FormData(form).entries());

      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const json = await res.json();
        if (json.success) {
          form.reset();
          btn.textContent = 'Done! ✅';
          if (success) success.classList.add('visible');
          setTimeout(() => {
            btn.textContent = original;
            btn.disabled = false;
            if (success) success.classList.remove('visible');
          }, 5000);
        } else { throw new Error(); }
      } catch (err) {
        btn.textContent = 'Try Again';
        btn.disabled = false;
        alert('Something went wrong. Please email us at info@busybeesplayhousesc.com');
      }
    });
  });
}

// ─── Custom Cursor ───────────────────────────
function initCursor() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (!cursor || !follower) return;
  if (window.innerWidth < 768) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Grow on hover over links/buttons
  const hoverEls = document.querySelectorAll('a, button, .pillar, .session-card, .membership-card, .party-card');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '18px';
      cursor.style.height = '18px';
      follower.style.width = '50px';
      follower.style.height = '50px';
      follower.style.borderColor = 'rgba(245, 200, 66, 0.8)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '10px';
      cursor.style.height = '10px';
      follower.style.width = '32px';
      follower.style.height = '32px';
      follower.style.borderColor = 'rgba(245, 200, 66, 0.5)';
    });
  });
}

// ─── Navigation ──────────────────────────────
function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const scroll = window.scrollY;

    if (scroll > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    lastScroll = scroll;
  }, { passive: true });
}

// ─── Mobile Menu ─────────────────────────────
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;

  let isOpen = false;

  hamburger.addEventListener('click', () => {
    isOpen = !isOpen;
    hamburger.classList.toggle('active', isOpen);
    mobileMenu.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      isOpen = false;
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ─── Countdown Timer ─────────────────────────
function initCountdown() {
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  if (!daysEl) return;

  const openingDate = new Date('2026-07-01T10:00:00');

  function updateCountdown() {
    const now = new Date();
    const diff = openingDate - now;

    if (diff <= 0) {
      // Already open!
      const strip = document.querySelector('.countdown-strip');
      if (strip) {
        strip.innerHTML = `
          <div class="countdown-content">
            <p class="countdown-label">🎉 We Are Open! Come Play!</p>
            <p style="font-family: var(--font-display); font-size: 1.1rem; color: var(--gold-light);">
              5483-B Sunset Blvd, Lexington, SC · Mon–Sat 9 AM – 6 PM
            </p>
          </div>`;
      }
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// ─── Scroll Reveal ───────────────────────────
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger siblings
          const siblings = entry.target.parentElement.querySelectorAll('.reveal:not(.visible)');
          let delay = 0;
          siblings.forEach((sib, idx) => {
            if (sib === entry.target) delay = idx * 80;
          });

          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px 0px 0px' }
  );

  reveals.forEach(el => observer.observe(el));

  // Safety net: reveal anything already in the viewport on load
  const revealVisible = () => {
    reveals.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('visible');
      }
    });
  };
  revealVisible();
  setTimeout(revealVisible, 200);

  // Final fallback: if anything is still hidden after 2s, show all
  setTimeout(() => {
    reveals.forEach(el => el.classList.add('visible'));
  }, 2000);
}

// ─── Contact Form ─────────────────────────────
function initForm() {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const successMsg = document.getElementById('formSuccess');
  if (!form) return;

  // Update access key
  const keyInput = form.querySelector('input[name="access_key"]');
  if (keyInput) keyInput.value = WEB3FORMS_KEY;

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending... 🐝';
    submitBtn.disabled = true;

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (json.success) {
        form.reset();
        submitBtn.textContent = 'Sent! ✅';
        successMsg.classList.add('visible');
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          successMsg.classList.remove('visible');
        }, 5000);
      } else {
        throw new Error('Submission failed');
      }
    } catch (err) {
      submitBtn.textContent = 'Try Again';
      submitBtn.disabled = false;
      alert('Something went wrong. Please email us directly at Ikeiyab@gmail.com');
    }
  });
}

// ─── Smooth Scroll ───────────────────────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navH = document.getElementById('nav')?.offsetHeight || 80;
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

// ─── FAQ Accordion ───────────────────────────
function initFAQ() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const btn = item.querySelector('.faq-q');
    const answer = item.querySelector('.faq-a');
    if (!btn || !answer) return;

    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      // Close all
      items.forEach(i => {
        i.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        i.querySelector('.faq-a').classList.remove('open');
      });

      // Open clicked if it was closed
      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true');
        answer.classList.add('open');
      }
    });
  });
}
