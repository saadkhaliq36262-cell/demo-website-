/**
 * The Artisan Brew - Premium Cafe Demo
 * Modern, robust Vanilla ES6+ JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {

  /* =========================================================================
     1. Sticky Navbar on Scroll
     ========================================================================= */
  const navbar = document.querySelector('.navbar');
  
  const updateNavbar = () => {
    if (!navbar) return;
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  /* =========================================================================
     2. Mobile Menu Toggle & Dynamic Overlay
     ========================================================================= */
  const hamburger = document.querySelector('.hamburger');
  let mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
  
  // If overlay doesn't exist in HTML, build it automatically from .nav-menu
  if (!mobileNavOverlay) {
    mobileNavOverlay = document.createElement('div');
    mobileNavOverlay.className = 'mobile-nav-overlay';
    
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
      const links = navMenu.querySelectorAll('a');
      links.forEach(link => {
        const clone = link.cloneNode(true);
        mobileNavOverlay.appendChild(clone);
      });
      
      const reserveBtn = document.querySelector('.nav-cta');
      if (reserveBtn) {
        const ctaClone = reserveBtn.cloneNode(true);
        ctaClone.style.marginTop = '15px';
        mobileNavOverlay.appendChild(ctaClone);
      }
    }
    document.body.appendChild(mobileNavOverlay);
  }

  const toggleMobileMenu = () => {
    if (!hamburger || !mobileNavOverlay) return;
    const isOpen = hamburger.classList.contains('active');
    if (isOpen) {
      hamburger.classList.remove('active');
      mobileNavOverlay.classList.remove('active');
      document.body.classList.remove('menu-open');
    } else {
      hamburger.classList.add('active');
      mobileNavOverlay.classList.add('active');
      document.body.classList.add('menu-open');
    }
  };

  if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
  }

  if (mobileNavOverlay) {
    mobileNavOverlay.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (hamburger && hamburger.classList.contains('active')) {
          toggleMobileMenu();
        }
      });
    });
  }

  /* =========================================================================
     3. Active Nav Link Detection
     ========================================================================= */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-overlay a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* =========================================================================
     4. Scroll Animation Observer (.animate-on-scroll, .fade-in, etc.)
     ========================================================================= */
  const animatedElements = document.querySelectorAll(
    '.animate-on-scroll, .fade-in, .fade-in-up, .fade-in-left, .fade-in-right'
  );

  if ('IntersectionObserver' in window && animatedElements.length > 0) {
    const animObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    animatedElements.forEach(el => animObserver.observe(el));
  } else {
    // Fallback if observer not supported
    animatedElements.forEach(el => el.classList.add('is-visible'));
  }

  /* =========================================================================
     5. Menu Category Filtering (menu.html)
     ========================================================================= */
  const menuFilterBtns = document.querySelectorAll('.menu-filter-btn, .filter-btn');
  const menuItems = document.querySelectorAll('.menu-item');

  if (menuFilterBtns.length > 0 && menuItems.length > 0) {
    menuFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        menuFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter') || btn.getAttribute('data-category') || 'all';

        menuItems.forEach(item => {
          const itemCat = item.getAttribute('data-category');
          if (filter === 'all' || itemCat === filter) {
            item.classList.remove('hidden');
          } else {
            item.classList.add('hidden');
          }
        });
      });
    });
  }

  /* =========================================================================
     6. Gallery Filtering & Lightbox (gallery.html)
     ========================================================================= */
  // Gallery Filtering
  const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (galleryFilterBtns.length > 0 && galleryItems.length > 0) {
    galleryFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        galleryFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter') || 'all';

        galleryItems.forEach(item => {
          const cat = item.getAttribute('data-category');
          if (filter === 'all' || cat === filter) {
            item.classList.remove('hidden');
          } else {
            item.classList.add('hidden');
          }
        });
      });
    });
  }

  // Gallery Lightbox
  let lightbox = document.getElementById('lightbox') || document.querySelector('.lightbox');
  let lightboxImg = document.getElementById('lightboxImage') || (lightbox ? lightbox.querySelector('img') : null);
  let lightboxClose = document.getElementById('lightboxClose') || (lightbox ? lightbox.querySelector('.lightbox-close') : null);

  // If lightbox doesn't exist on page with gallery items, build it
  if (!lightbox && galleryItems.length > 0) {
    lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.id = 'lightbox';

    lightboxClose = document.createElement('button');
    lightboxClose.className = 'lightbox-close';
    lightboxClose.id = 'lightboxClose';
    lightboxClose.innerHTML = '&times;';
    lightboxClose.setAttribute('aria-label', 'Close image viewer');

    lightboxImg = document.createElement('img');
    lightboxImg.className = 'lightbox-image';
    lightboxImg.id = 'lightboxImage';
    lightboxImg.alt = 'Enlarged gallery view';

    lightbox.appendChild(lightboxClose);
    lightbox.appendChild(lightboxImg);
    document.body.appendChild(lightbox);
  }

  if (galleryItems.length > 0 && lightbox && lightboxImg) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt || 'Gallery Image';
          lightbox.classList.add('active');
          document.body.classList.add('menu-open');
        }
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.classList.remove('menu-open');
    };

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  /* =========================================================================
     7. Back to Top Button
     ========================================================================= */
  let backToTopBtn = document.getElementById('backToTop') || document.querySelector('.back-to-top');

  if (!backToTopBtn) {
    backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.id = 'backToTop';
    backToTopBtn.innerHTML = '&#8593;';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopBtn);
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('active');
    } else {
      backToTopBtn.classList.remove('active');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  /* =========================================================================
     8. Contact Form Handling & Validation
     ========================================================================= */
  const contactForm = document.getElementById('contactForm') || document.querySelector('form.contact-form') || document.querySelector('.contact-form form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const requiredInputs = contactForm.querySelectorAll('[required]');
      let isValid = true;

      requiredInputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = '#e74c3c';
        } else {
          input.style.borderColor = '#25D366';
        }
      });

      if (!isValid) return;

      const submitBtn = contactForm.querySelector('button[type="submit"]') || contactForm.querySelector('.btn-primary');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Send Message';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending...';
      }

      setTimeout(() => {
        // Success feedback
        if (submitBtn) {
          submitBtn.innerHTML = '✓ Message Sent Successfully!';
          submitBtn.style.backgroundColor = 'var(--success)';
          submitBtn.style.borderColor = 'var(--success)';
          submitBtn.style.color = '#fff';
        }

        contactForm.reset();

        setTimeout(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            submitBtn.style.backgroundColor = '';
            submitBtn.style.borderColor = '';
            submitBtn.style.color = '';
            requiredInputs.forEach(input => {
              input.style.borderColor = '';
            });
          }
        }, 4000);
      }, 1000);
    });
  }

  /* Newsletter Form in Footer */
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = newsletterForm.querySelector('button');
      if (btn) {
        const orig = btn.innerText;
        btn.innerText = 'Subscribed!';
        btn.style.backgroundColor = 'var(--success)';
        newsletterForm.reset();
        setTimeout(() => {
          btn.innerText = orig;
          btn.style.backgroundColor = '';
        }, 3000);
      }
    });
  }

  /* =========================================================================
     9. Stats Counter Animation (about.html)
     ========================================================================= */
  const counters = document.querySelectorAll('.stat-number, .stat-counter, .counter');

  if (counters.length > 0 && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const text = counter.innerText.trim();
          
          // Match numbers and any suffix (like +, K+)
          const match = text.match(/^(\d+)(.*)$/);
          if (match) {
            const targetNum = parseInt(match[1], 10);
            const suffix = match[2] || '';
            const duration = 1800; // ms
            const stepTime = 20;
            const steps = duration / stepTime;
            const increment = targetNum / steps;
            let current = 0;

            const timer = setInterval(() => {
              current += increment;
              if (current >= targetNum) {
                counter.innerText = targetNum + suffix;
                clearInterval(timer);
              } else {
                counter.innerText = Math.floor(current) + suffix;
              }
            }, stepTime);
          }
          observer.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => counterObserver.observe(c));
  }

});
