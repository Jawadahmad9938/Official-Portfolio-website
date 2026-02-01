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
// Floating Icons - Enhanced with More Technologies
// ===========================
function initFloatingIcons() {
  const container = document.getElementById("floating-icons");
  if (!container) return;

  // Increase floating icons count for better visual effect
  const iconCount = isMobile ? 20 : 40;
  
  // All technologies you're expert in
  const icons = [
    // Core Web Technologies
    "/img/html.svg",
    "/img/css-3.svg", 
    "/img/javascript.svg",
    "/img/tailwind.svg",
    
    // Frontend Frameworks & Libraries
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
    
    // Backend Technologies
    "/img/node-js.svg",
    "/img/express.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    
    // Databases
    "/img/mongodb.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
    
    // Modern Technologies
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
    
    // DevOps & Tools
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    
    // Cloud & Deployment
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg",
    
    // Additional Technologies
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    
    // Excel & Business Tools (using Font Awesome classes as data attributes)
    "excel-icon", // Special case for Excel
    "chart-icon", // For analytics
    "database-icon", // For data management
  ];

  for (let i = 0; i < iconCount; i++) {
    const iconElement = document.createElement("div");
    const selectedIcon = icons[Math.floor(Math.random() * icons.length)];
    
    // Handle special Font Awesome icons
    if (selectedIcon === "excel-icon") {
      iconElement.innerHTML = '<i class="fas fa-file-excel" style="font-size: 32px; color: #217346;"></i>';
      iconElement.className = "floating-icon fa-icon";
    } else if (selectedIcon === "chart-icon") {
      iconElement.innerHTML = '<i class="fas fa-chart-line" style="font-size: 32px; color: #10b981;"></i>';
      iconElement.className = "floating-icon fa-icon";
    } else if (selectedIcon === "database-icon") {
      iconElement.innerHTML = '<i class="fas fa-database" style="font-size: 32px; color: #2563eb;"></i>';
      iconElement.className = "floating-icon fa-icon";
    } else {
      // Regular image icons
      const img = document.createElement("img");
      img.src = selectedIcon;
      img.alt = "Technology Icon";
      img.loading = "lazy";
      img.style.width = "40px";
      img.style.height = "40px";
      img.style.objectFit = "contain";
      iconElement.appendChild(img);
      iconElement.className = "floating-icon";
    }
    
    // Random positioning and animation
    iconElement.style.left = `${Math.random() * 100}%`;
    iconElement.style.top = `${Math.random() * 100}%`;
    iconElement.style.animationDelay = `${Math.random() * 10}s`;
    iconElement.style.animationDuration = `${15 + Math.random() * 10}s`; // Vary speed
    
    container.appendChild(iconElement);

    // Only add click handlers on desktop
    if (!isMobile) {
      iconElement.addEventListener("click", function() {
        this.style.animation = "none";
        this.style.transform = "scale(1.5) rotate(360deg)";
        setTimeout(() => {
          this.style.animation = `floatIcon ${15 + Math.random() * 10}s infinite ease-in-out`;
          this.style.transform = "scale(1) rotate(0deg)";
        }, 500);
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
