// ===== ENHANCED MOBILE MENU FUNCTIONALITY =====
const menuButton = document.getElementById("menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const mobileOverlay = document.getElementById("mobile-overlay");
const mobileClose = document.getElementById("mobile-close");

function toggleMobileMenu() {
  const isOpening = !mobileMenu.classList.contains("active");

  mobileMenu.classList.toggle("active");
  mobileOverlay.classList.toggle("active");
  menuButton.classList.toggle("active");

  // Update aria-expanded attribute
  menuButton.setAttribute("aria-expanded", isOpening);

  // Prevent body scroll when menu is open
  document.body.style.overflow = isOpening ? "hidden" : "";
}

// Event listeners for mobile menu
menuButton.addEventListener("click", toggleMobileMenu);
mobileOverlay.addEventListener("click", toggleMobileMenu);
mobileClose.addEventListener("click", toggleMobileMenu);

// Close menu when clicking on links
document.querySelectorAll(".mobile-nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    toggleMobileMenu();
  });
});

// Close menu with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
    toggleMobileMenu();
  }
});

// ===== THEME TOGGLE FUNCTIONALITY =====
const themeToggleBtn = document.getElementById("theme-toggle-btn");
const themeIcon = document.getElementById("theme-icon");

// Load saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  document.body.classList.add("light-mode");
  themeIcon.classList.replace("fa-moon", "fa-sun");
}

// Toggle theme on click
themeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  const isLight = document.body.classList.contains("light-mode");
  themeIcon.classList.replace(isLight ? "fa-moon" : "fa-sun", isLight ? "fa-sun" : "fa-moon");

  localStorage.setItem("theme", isLight ? "light" : "dark");
});

// Enhanced structured data for philosophy posts
function generatePhilosophyStructuredData(essay) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: essay.title,
    description: essay.excerpt,
    image: essay.image,
    author: {
      "@type": "Person",
      name: "Jawad Ahmad",
      url: "https://jawadahmad.me",
    },
    publisher: {
      "@type": "Person",
      name: "Jawad Ahmad",
    },
    datePublished: essay.date,
    dateModified: essay.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://jawadahmad.me/philosophy-post.html?slug=${essay.slug}`,
    },
  };
}

// Generate unique cache buster with timestamp and random number
function getUniqueCacheBuster() {
  return `?v=${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Enhanced philosophy loading with structured data
async function loadPhilosophyEssays() {
  try {
    console.log("Loading philosophy essays...");

    const response = await fetch("./philosophy-data.json");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Philosophy essays loaded:", data);

    displayPhilosophyEssays(data.posts);
    setupFilters(data.posts);

    // Add structured data for each philosophy essay
    data.posts.forEach((essay) => {
      const structuredData = generatePhilosophyStructuredData(essay);
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.text = JSON.stringify(structuredData);
      document.head.appendChild(script);
    });
  } catch (error) {
    console.error("Error loading philosophy essays:", error);
    document.getElementById("philosophyGrid").innerHTML = `
      <div class="no-posts">
          <i class="fas fa-exclamation-triangle" aria-hidden="true"></i>
          <p>Error loading philosophy essays. Please check if philosophy-data.json file exists.</p>
          <p style="font-size: 0.8rem; margin-top: 0.5rem;">Error: ${error.message}</p>
      </div>
  `;
  }
}

function displayPhilosophyEssays(essays, category = "all", search = "") {
  const philosophyGrid = document.getElementById("philosophyGrid");
  const filteredEssays = essays.filter((essay) => {
    if (category !== "all" && essay.category !== category) return false;
    if (
      search &&
      !essay.title.toLowerCase().includes(search.toLowerCase()) &&
      !essay.excerpt.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    return true;
  });

  if (filteredEssays.length === 0) {
    philosophyGrid.innerHTML = `
      <div class="no-posts">
          <i class="fas fa-search" aria-hidden="true"></i>
          <p>No philosophy essays found for this category or search.</p>
      </div>
  `;
    return;
  }

  philosophyGrid.innerHTML = filteredEssays
    .map((essay) => {
      const uniqueCacheBuster = getUniqueCacheBuster();
      const imageUrl = `${essay.image}${uniqueCacheBuster}`;
      const fallbackImage =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Nietzsche187a.jpg/500px-Nietzsche187a.jpg";

      return `
      <article class="philosophy-card" data-category="${essay.category}">
          <div class="philosophy-image-container">
              <img src="${imageUrl}" 
                   alt="${essay.title}" 
                   class="philosophy-image"
                   loading="lazy"
                   onerror="this.onerror=null; this.src='${fallbackImage}'; console.log('Image failed to load:', '${imageUrl}')"
                   onload="console.log('Image loaded successfully:', '${imageUrl}')">
              <span class="philosophy-category">${essay.category.toUpperCase()}</span>
          </div>
          <div class="philosophy-content">
              <h3 class="philosophy-post-title">${essay.title}</h3>
              <p class="philosophy-excerpt">${essay.excerpt}</p>
              <div class="philosophy-meta">
                  <span class="meta-item"><i class="far fa-calendar"></i> ${
                    essay.date
                  }</span>
                  <span class="meta-item"><i class="far fa-clock"></i> ${
                    essay.readTime
                  }</span>
              </div>
              <a href="philosophy-post.html?slug=${
                essay.slug
              }" class="read-more-btn">
                  Read Essay <i class="fas fa-arrow-right"></i>
              </a>
          </div>
      </article>
  `;
    })
    .join("");
}

function setupFilters(essays) {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const searchInput = document.getElementById("philosophySearch");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      this.classList.add("active");

      // Filter philosophy essays based on category
      const category = this.getAttribute("data-category");
      const search = searchInput ? searchInput.value : "";
      displayPhilosophyEssays(essays, category, search);
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const search = searchInput.value;
      const activeCategory = document
        .querySelector(".filter-btn.active")
        .getAttribute("data-category");
      displayPhilosophyEssays(essays, activeCategory, search);
    });
  }
}

// Newsletter form handler
document
  .getElementById("newsletterForm")
  ?.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;

    // Here you would typically send this to your newsletter service
    console.log("Newsletter subscription:", email);

    // Show success message
    alert("Thank you for subscribing to our philosophical discourse!");
    this.reset();
  });

// Clear browser cache headers - add this to your HTML head or server configuration
function setCacheHeaders() {
  // This function helps with cache busting
  const metaTags = [
    {
      name: "Cache-Control",
      content: "no-cache, no-store, must-revalidate",
    },
    { name: "Pragma", content: "no-cache" },
    { name: "Expires", content: "0" },
  ];

  metaTags.forEach((tag) => {
    const meta = document.createElement("meta");
    meta.httpEquiv = tag.name;
    meta.content = tag.content;
    document.head.appendChild(meta);
  });
}

// Load philosophy essays when page loads
document.addEventListener("DOMContentLoaded", () => {
  setCacheHeaders();
  loadPhilosophyEssays();
});