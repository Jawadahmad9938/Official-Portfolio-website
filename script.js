// ===========================
// Performance: Detect mobile early
// ===========================
const isMobile = window.matchMedia("(max-width: 768px)").matches;
const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ===========================
// Newsletter Form Enhancement
// ===========================
const newsletterForm = document.querySelector(".newsletter-form");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const form = this;
    const submitBtn = form.querySelector(".newsletter-btn");
    const originalText = submitBtn.innerHTML;

    // Show loading state
    submitBtn.innerHTML =
      '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
      submitBtn.style.background =
        "linear-gradient(135deg, #10b981 0%, #059669 100%)";
      form.reset();

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background =
          "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)";
      }, 2000);
    }, 1500);
  });
}

// ===========================
// Social Link Animation (debounced)
// ===========================
if (!isReducedMotion) {
  document.querySelectorAll(".social-link").forEach((link) => {
    link.addEventListener("mouseenter", function() {
      this.style.transform = "translateY(-5px) scale(1.05)";
    }, { passive: true });
    
    link.addEventListener("mouseleave", function() {
      this.style.transform = "translateY(0) scale(1)";
    }, { passive: true });
  });
}

// Empty Three.js functions (commented out for performance)
function initThreeJS() {
  // Disabled: Three.js initialization removed for performance
}

function initHeroThreeJS() {
  // Disabled: Hero Three.js initialization removed for performance
}

// ===========================
// Floating Icons - Mobile Optimized
// ===========================
function initFloatingIcons() {
  const container = document.getElementById("floating-icons");
  if (!container) return;

  // Reduce floating icons on mobile for better performance
  const iconCount = isMobile ? 10 : 25;
  const icons = [
    "/img/html.svg",
    "/img/css-3.svg",
    "/img/javascript.svg",
    "/img/tailwind.svg",
    "/img/node-js (1).svg",
  ];

  for (let i = 0; i < iconCount; i++) {
    const icon = document.createElement("img");
    icon.src = icons[Math.floor(Math.random() * icons.length)];
    icon.className = "floating-icon";
    icon.style.left = `${Math.random() * 100}%`;
    icon.style.top = `${Math.random() * 100}%`;
    icon.style.animationDelay = `${Math.random() * 5}s`;
    icon.loading = "lazy";
    container.appendChild(icon);

    // Only add click handlers on desktop
    if (!isMobile) {
      icon.addEventListener("click", function() {
        this.style.animation = "none";
        setTimeout(() => {
          this.style.animation = "floatIcon 15s infinite ease-in-out";
        }, 100);
      });
    }
  }
}

// ===== MOBILE MENU FUNCTIONALITY =====
const menuButton = document.getElementById('menu-button');
const mobileOverlay = document.getElementById('mobile-overlay');
const mobileMenuContainer = document.getElementById('mobile-menu-container');
const mobileCloseBtn = document.getElementById('mobile-close');
const mobileNavItems = document.querySelectorAll('.mobile-nav-item');

// Toggle Menu Open/Close
if (menuButton) {
  menuButton.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });
}

// Close Menu Function
function closeMenu() {
  if (menuButton) menuButton.classList.remove('active');
  if (mobileOverlay) mobileOverlay.classList.remove('active');
  if (mobileMenuContainer) mobileMenuContainer.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Toggle Menu Function
function toggleMenu() {
  if (menuButton) menuButton.classList.toggle('active');
  if (mobileOverlay) mobileOverlay.classList.toggle('active');
  if (mobileMenuContainer) mobileMenuContainer.classList.toggle('active');
  
  if (mobileMenuContainer?.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
}

// Close Menu on Close Button Click
if (mobileCloseBtn) {
  mobileCloseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeMenu();
  });
}

// Close Menu on Overlay Click
if (mobileOverlay) {
  mobileOverlay.addEventListener('click', (e) => {
    e.stopPropagation();
    closeMenu();
  });
}

// Close Menu on Navigation Item Click
mobileNavItems.forEach(item => {
  item.addEventListener('click', () => {
    closeMenu();
  });
});

// Close Menu on Escape Key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeMenu();
  }
});

// Prevent Menu from Closing when clicking inside it
if (mobileMenuContainer) {
  mobileMenuContainer.addEventListener('click', (e) => {
    e.stopPropagation();
  });
}

// ===========================
// Theme Toggle with localStorage optimization
// ===========================
const themeToggleBtn = document.getElementById("theme-toggle-btn");
const themeIcon = document.getElementById("theme-icon");
const THEME_KEY = "site-theme";

// Load theme preference
function loadThemePreference() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  
  if (savedTheme === "light" || (!savedTheme && !prefersDark)) {
    document.body.classList.add("light-mode");
    themeIcon?.classList.replace("fa-moon", "fa-sun");
  } else {
    themeIcon?.classList.replace("fa-sun", "fa-moon");
  }
}

// Toggle theme
themeToggleBtn?.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  if (document.body.classList.contains("light-mode")) {
    localStorage.setItem(THEME_KEY, "light");
    themeIcon.classList.replace("fa-moon", "fa-sun");
  } else {
    localStorage.setItem(THEME_KEY, "dark");
    themeIcon.classList.replace("fa-sun", "fa-moon");
  }
});

// Load theme on page load
loadThemePreference();

// ===========================
// DOM Ready Initializations
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  initThreeJS();
  initHeroThreeJS();
  initFloatingIcons();

  // Only animate cards if motion is not reduced
  if (!isReducedMotion) {
    // Animate service & project cards with passive listeners
    const cards = document.querySelectorAll(".service-card, .project-card");
    cards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`;
      card.classList.add("animate__animated", "animate__fadeInUp");
      
      // 3D hover effect on desktop only
      if (!isMobile) {
        card.addEventListener("mouseenter", function() {
          this.style.transform = "translateY(-10px) scale(1.05)";
        }, { passive: true });
        
        card.addEventListener("mouseleave", function() {
          this.style.transform = "translateY(0) scale(1)";
        }, { passive: true });
      }
    });
  }

  // Section reveal on scroll with IntersectionObserver
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isReducedMotion) {
          entry.target.classList.add("animate__animated", "animate__fadeInUp");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { 
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px" // Start animation 50px before visible
    }
  );

  document
    .querySelectorAll(
      ".about-section, .services-section, .projects-section, .clients-section, .skills-section, .testimonials-section, .contact-section"
    )
    .forEach((section) => revealObserver.observe(section));
});

// ===========================
// Optimize Resource Loading
// ===========================
// Defer non-critical image loading
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
        }
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach(img => imageObserver.observe(img));
}
