    // Newsletter form enhancement
    document.querySelector('.newsletter-form').addEventListener('submit', function (e) {
      e.preventDefault();

      const form = this;
      const submitBtn = form.querySelector('.newsletter-btn');
      const originalText = submitBtn.innerHTML;

      // Show loading state
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
      submitBtn.disabled = true;

      // Simulate form submission
      setTimeout(() => {
        // Here you would typically send the data to your backend
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

        // Reset form
        form.reset();

        // Reset button after 2 seconds
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          submitBtn.style.background = 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
        }, 2000);
      }, 1500);
    });

    // Add animation to social links
    document.querySelectorAll('.social-link').forEach(link => {
      link.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-5px) scale(1.05)';
      });

      link.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
      });
    });
    // Three.js initialization for main background
    function initThreeJS() {
      const container = document.getElementById("threejs-container");
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });

      renderer.setSize(window.innerWidth, window.innerHeight);
      container.appendChild(renderer.domElement);

      // Enhanced Particles
      const particlesGeometry = new THREE.BufferGeometry();
      const particleCount = 2000;

      const posArray = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * 15;
        posArray[i + 1] = (Math.random() - 0.5) * 15;
        posArray[i + 2] = (Math.random() - 0.5) * 15;

        const color = new THREE.Color(
          Math.random() * 0.5 + 0.5,
          Math.random() * 0.5,
          Math.random() * 0.5
        );
        colors[i] = color.r;
        colors[i + 1] = color.g;
        colors[i + 2] = color.b;
      }

      particlesGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(posArray, 3)
      );
      particlesGeometry.setAttribute(
        "color",
        new THREE.BufferAttribute(colors, 3)
      );

      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.03,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
      });

      const particlesMesh = new THREE.Points(
        particlesGeometry,
        particlesMaterial
      );
      scene.add(particlesMesh);

      camera.position.z = 5;

      function animate() {
        requestAnimationFrame(animate);
        particlesMesh.rotation.x += 0.0003;
        particlesMesh.rotation.y += 0.0003;
        particlesMesh.rotation.z += 0.0002;

        const positions = particlesGeometry.attributes.position.array;
        for (let i = 0; i < particleCount * 3; i += 3) {
          positions[i + 1] +=
            Math.sin(Date.now() * 0.001 + positions[i]) * 0.005;
        }
        particlesGeometry.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);
      }

      animate();

      window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    }

    // Three.js initialization for hero section
    function initHeroThreeJS() {
      const container = document.getElementById("hero-threejs-container");
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });

      renderer.setSize(window.innerWidth, window.innerHeight);
      container.appendChild(renderer.domElement);

      // Enhanced Particles for Hero Section
      const particlesGeometry = new THREE.BufferGeometry();
      const particleCount = 1000;

      const posArray = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * 10;
        posArray[i + 1] = (Math.random() - 0.5) * 10;
        posArray[i + 2] = (Math.random() - 0.5) * 10;

        const color = new THREE.Color(
          Math.random() * 0.3 + 0.7,
          Math.random() * 0.3,
          Math.random() * 0.3
        );
        colors[i] = color.r;
        colors[i + 1] = color.g;
        colors[i + 2] = color.b;
      }

      particlesGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(posArray, 3)
      );
      particlesGeometry.setAttribute(
        "color",
        new THREE.BufferAttribute(colors, 3)
      );

      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        vertexColors: true,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
      });

      const particlesMesh = new THREE.Points(
        particlesGeometry,
        particlesMaterial
      );
      scene.add(particlesMesh);

      camera.position.z = 4;

      function animate() {
        requestAnimationFrame(animate);
        particlesMesh.rotation.x += 0.0002;
        particlesMesh.rotation.y += 0.0002;
        particlesMesh.rotation.z += 0.0001;

        const positions = particlesGeometry.attributes.position.array;
        for (let i = 0; i < particleCount * 3; i += 3) {
          positions[i + 1] +=
            Math.sin(Date.now() * 0.0008 + positions[i]) * 0.003;
        }
        particlesGeometry.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);
      }

      animate();

      window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    }

    // Floating Icons Initialization
    function initFloatingIcons() {
      const container = document.getElementById("floating-icons");
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
          setTimeout(() => {
            icon.style.animation = "floatIcon 10s infinite ease-in-out";
          }, 300);
        });
      }
    }

    // Mobile menu toggle
    const menuButton = document.getElementById("menu-button");
    const mobileMenu = document.getElementById("mobile-menu");
    menuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("active");
      menuButton.classList.toggle("active");
    });

    document.querySelectorAll(".mobile-nav-menu a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
      });
    });

    // Dark/Light mode toggle
    const themeToggleBtn = document.getElementById("theme-toggle-btn");
    const themeIcon = document.getElementById("theme-icon");

    themeToggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");

      if (document.body.classList.contains("light-mode")) {
        localStorage.setItem("theme", "light");
        themeIcon.classList.replace("fa-moon", "fa-sun");
      } else {
        localStorage.setItem("theme", "dark");
        themeIcon.classList.replace("fa-sun", "fa-moon");
      }
    });

    // Load theme from localStorage
    if (localStorage.getItem("theme") === "light") {
      document.body.classList.add("light-mode");
      themeIcon.classList.replace("fa-moon", "fa-sun");
    } else {
      themeIcon.classList.replace("fa-sun", "fa-moon");
    }


    document.addEventListener("DOMContentLoaded", () => {
      initThreeJS();
      initHeroThreeJS();
      initFloatingIcons();

      document.querySelectorAll(".service-card").forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add("animate__animated", "animate__fadeInUp");
      });

      document.querySelectorAll(".project-card").forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
        card.classList.add("animate__animated", "animate__fadeInUp");
      });

      // 3D hover effect for project cards
      document.querySelectorAll(".project-card").forEach((card) => {
        card.addEventListener("mousemove", (e) => {
          card.style.transform = `translateY(-10px) scale(1.05)`;
        });

        card.addEventListener("mouseenter", () => {
          card.style.transition = "none";
        });

        card.addEventListener("mouseleave", () => {
          card.style.transition = "all 0.5s ease";
          card.style.transform = "translateY(0) scale(1)";
        });
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              "animate__animated",
              "animate__fadeInUp"
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document
      .querySelectorAll(
        ".about-section, .services-section, .projects-section, .clients-section, .skills-section, .testimonials-section, .contact-section"
      )
      .forEach((section) => {
        observer.observe(section);
      });

    // Light animation for testimonials
    document.addEventListener('DOMContentLoaded', function () {
      const testimonialCards = document.querySelectorAll('.testimonial-card');

      // Simple fade-in animation
      testimonialCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 100 * index);
      });

      // Simple hover effect for stats
      const statItems = document.querySelectorAll('.stat-item');
      statItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
          this.style.transform = 'scale(1.03)';
        });

        item.addEventListener('mouseleave', function () {
          this.style.transform = 'scale(1)';
        });
      });
    });

    // Services section animations
    document.addEventListener('DOMContentLoaded', function () {
      const serviceCards = document.querySelectorAll('.service-card');

      // Staggered animation for service cards
      serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 150 * index);
      });

      // Hover effect for tech stack icons
      const techIcons = document.querySelectorAll('.tech-stack i');
      techIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function () {
          this.style.transform = 'scale(1.2)';
        });

        icon.addEventListener('mouseleave', function () {
          this.style.transform = 'scale(1)';
        });
      });
    });