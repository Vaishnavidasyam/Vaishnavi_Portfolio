/**
 * ==========================================================================
 * D. VAISHNAVI — NOIR RADIANCE PORTFOLIO SCRIPT
 * Vanilla JavaScript (No Frameworks, No External Dependencies)
 * Recruiter-ready, accessible, modular and error-resilient.
 * ==========================================================================
 */

'use strict';

/**
 * Centralized Configuration Object
 * Update repository links, live demos, contact details, or image paths here.
 */
const PORTFOLIO_CONFIG = {
  profile: {
    name: "D. Vaishnavi",
    title: "Computer Science Engineer | Full-Stack Developer | AI/ML Enthusiast",
    email: "dasyam.vaishnavi12@gmail.com",
    github: "https://github.com/Vaishnavidasyam",
    linkedin: "https://linkedin.com/in/dasyam-vaishnavi-02a309273",
    photoPath: "assets/vaishnavi.jpg"
  },
  projects: {
    universityManagementSystem: {
      title: "University Timetable and Attendance Management System",
      imageDesktop: "assets/utms-desktop.png",
      liveDemo: "https://utms.infinityfreeapp.com/?i=1",
      githubRepo: "https://github.com/Vaishnavidasyam/UniversityManagementSystemWeb"
    },
    mobileBiometricAttendance: {
      title: "Mobile Biometric Attendance Application",
      image: "assets/mobile-app.png",
      liveDemo: null,
      githubRepo: "https://github.com/Vaishnavidasyam/UniversityManagementSystem"
    },
    healthcareRiskPrediction: {
      title: "Healthcare Risk Prediction — SmartMed Analytics",
      image: "assets/smartmed-analytics.png",
      liveDemo: "https://healthcare-risk-prediction.vercel.app/",
      githubRepo: "https://github.com/Vaishnavidasyam/healthcare-risk-prediction"
    }
  },
  certifications: [
    {
      title: "Cyber Security & Ethical Hacking",
      issuer: "Rinex & E-Cell, IIT Bhubaneswar",
      url: "https://drive.google.com/file/d/1L6Qkw2ppfbRb9zPt5BqrmoQPhKuad0M-/view?usp=sharing"
    },
    {
      title: "Digital Marketing",
      issuer: "Campalin Innovations Pvt. Ltd.",
      url: "https://drive.google.com/file/d/16rMJ3nmH41-tg9OWpCvUh-qUnqf7A_E9/view?usp=sharing"
    },
    {
      title: "AutoCAD Mechanical",
      issuer: "Coincent & ArIES, IIT Roorkee",
      url: "https://drive.google.com/file/d/1miCeBky1tvoecFeVXh7rGEokSOgHjRk-/view?usp=sharing"
    }
  ]
};

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileNavigation();
  initScrollSpy();
  initCopyEmail();
  initDynamicYear();
  initBentoCardReveal();
  initAccessibilityEnhancements();
});

/* --------------------------------------------------------------------------
   1. Header Sticky Scroll Indicator
   -------------------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --------------------------------------------------------------------------
   2. Mobile Navigation Drawer
   -------------------------------------------------------------------------- */
function initMobileNavigation() {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileClose = document.getElementById('mobile-close');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileBackdrop = document.getElementById('mobile-backdrop');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!menuToggle || !mobileNav || !mobileBackdrop) return;

  function openMenu() {
    mobileNav.classList.add('open');
    mobileBackdrop.classList.add('active');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileNav.classList.remove('open');
    mobileBackdrop.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  menuToggle.addEventListener('click', openMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMenu);
  mobileBackdrop.addEventListener('click', closeMenu);

  // Close when a link inside the mobile drawer is clicked
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close when Escape key is pressed
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
      closeMenu();
    }
  });
}

/* --------------------------------------------------------------------------
   3. Active Section ScrollSpy using IntersectionObserver
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!('IntersectionObserver' in window) || sections.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        updateActiveLinks(id);
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));

  function updateActiveLinks(activeId) {
    desktopLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${activeId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    mobileLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${activeId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}

/* --------------------------------------------------------------------------
   4. Image Lightbox Modal for Screenshots
   -------------------------------------------------------------------------- */
function openImageModal(imgSrc, captionText) {
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-image');
  const caption = document.getElementById('modal-caption');

  if (!modal || !modalImg) return;

  modalImg.src = imgSrc;
  modalImg.alt = captionText || 'Project Preview';
  if (caption) caption.textContent = captionText || '';

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeImageModal(event) {
  if (event.target.id === 'image-modal' || event.target.classList.contains('image-modal-close')) {
    closeImageModalDirectly();
  }
}

function closeImageModalDirectly() {
  const modal = document.getElementById('image-modal');
  if (!modal) return;

  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// Bind lightbox functions to global window object
window.openImageModal = openImageModal;
window.closeImageModal = closeImageModal;
window.closeImageModalDirectly = closeImageModalDirectly;

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeImageModalDirectly();
  }
});

/* --------------------------------------------------------------------------
   5. Copy Email to Clipboard & Toast Notification
   -------------------------------------------------------------------------- */
function initCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  const copyBtnText = document.getElementById('copy-btn-text');
  const toast = document.getElementById('toast-popup');
  const toastMsg = document.getElementById('toast-msg');

  if (!copyBtn) return;

  copyBtn.addEventListener('click', async () => {
    const email = copyBtn.getAttribute('data-email') || PORTFOLIO_CONFIG.profile.email;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        // Fallback for non-secure contexts
        const textArea = document.createElement('textarea');
        textArea.value = email;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }

      showToast(`Copied ${email} to clipboard!`);
      if (copyBtnText) copyBtnText.textContent = "Email Copied!";
      setTimeout(() => {
        if (copyBtnText) copyBtnText.textContent = "Copy Email Address";
      }, 3000);

    } catch (err) {
      showToast(`Email: ${email}`);
    }
  });

  function showToast(message) {
    if (!toast) return;
    if (toastMsg) toastMsg.textContent = message;
    toast.classList.add('active');

    setTimeout(() => {
      toast.classList.remove('active');
    }, 3800);
  }
}

/* --------------------------------------------------------------------------
   6. Dynamic Copyright Year
   -------------------------------------------------------------------------- */
function initDynamicYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/* --------------------------------------------------------------------------
   7. Accessibility & Keyboard Navigation Focus
   -------------------------------------------------------------------------- */
function initAccessibilityEnhancements() {
  // Ensure keyboard focus skips smoothly to target sections
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.setAttribute('tabindex', '-1');
        targetElement.focus({ preventScroll: true });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   8. Viewport Scroll-Reveal for Bento Cards
   -------------------------------------------------------------------------- */
function initBentoCardReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const cards = document.querySelectorAll('.bento-card');
  if (!cards.length || !('IntersectionObserver' in window)) return;

  cards.forEach(card => card.classList.add('reveal-ready'));

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  });

  cards.forEach(card => observer.observe(card));
}
