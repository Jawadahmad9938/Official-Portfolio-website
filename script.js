// ===========================
// Newsletter Form Enhancement
// ===========================
document
  .querySelector(".newsletter-form")
  ?.addEventListener("submit", function (e) {
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

// ===========================
// Social Link Animation
// ===========================
document.querySelectorAll(".social-link").forEach((link) => {
  link.addEventListener(
    "mouseenter",
    () => (link.style.transform = "translateY(-5px) scale(1.05)")
  );
  link.addEventListener(
    "mouseleave",
    () => (link.style.transform = "translateY(0) scale(1)")
  );
});

function initThreeJS() {
}
function initHeroThreeJS() {
  
}

// ===========================
// Floating Icons
// ===========================
function initFloatingIcons() {
  const container = document.getElementById("floating-icons");
  if (!container) return;

  const icons = [
    "/img/html.svg",
    "/img/css-3.svg",
    "/img/javascript.svg",
    "/img/tailwind.svg",
    "/img/node-js (1).svg",
  ];

  for (let i = 0; i < 20; i++) {
    const icon = document.createElement("img");
    icon.src = icons[Math.floor(Math.random() * icons.length)];
    icon.className = "floating-icon";
    icon.style.left = `${Math.random() * 100}%`;
    icon.style.top = `${Math.random() * 100}%`;
    icon.style.animationDelay = `${Math.random() * 5}s`;
    container.appendChild(icon);

    icon.addEventListener("click", () => {
      icon.style.animation = "clickPulse 0.3s ease";
      setTimeout(
        () => (icon.style.animation = "floatIcon 10s infinite ease-in-out"),
        300
      );
    });
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
  item.addEventListener('click', (e) => {
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
// Theme Toggle
// ===========================
const themeToggleBtn = document.getElementById("theme-toggle-btn");
const themeIcon = document.getElementById("theme-icon");

themeToggleBtn?.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  if (document.body.classList.contains("light-mode")) {
    localStorage.setItem("theme", "light");
    themeIcon.classList.replace("fa-moon", "fa-sun");
  } else {
    localStorage.setItem("theme", "dark");
    themeIcon.classList.replace("fa-sun", "fa-moon");
  }
});

if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light-mode");
  themeIcon?.classList.replace("fa-moon", "fa-sun");
} else {
  themeIcon?.classList.replace("fa-sun", "fa-moon");
}

// ===========================
// DOM Ready Initializations
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  initThreeJS();
  initHeroThreeJS();
  initFloatingIcons();

  // Animate service & project cards
  document
    .querySelectorAll(".service-card, .project-card")
    .forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`;
      card.classList.add("animate__animated", "animate__fadeInUp");
    });

  // 3D hover effect
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transition = "none";
      card.style.transform = "translateY(-10px) scale(1.05)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transition = "all 0.5s ease";
      card.style.transform = "translateY(0) scale(1)";
    });
  });

  // Section reveal on scroll
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate__animated", "animate__fadeInUp");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document
    .querySelectorAll(
      ".about-section, .services-section, .projects-section, .clients-section, .skills-section, .testimonials-section, .contact-section"
    )
    .forEach((section) => revealObserver.observe(section));
});
