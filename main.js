document.addEventListener("DOMContentLoaded", () => {
  // === Sélecteurs ===
  const form = document.getElementById("contactForm");
  const popup = document.getElementById("popup");
  const overlay = document.getElementById("popup-overlay");
  const toggleThemeBtn = document.getElementById("toggleTheme");
  const themeIcon = document.getElementById("themeIcon");
  const themeLabel = document.getElementById("themeLabel");
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const scrollBtn = document.getElementById("scrollTopBtn");

  // === Fonctions de thème ===
  const getTheme = () =>
    localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

  const applyTheme = (theme) => {
    document.body.classList.remove("dark", "light");
    document.body.classList.add(theme);

    if (themeIcon) themeIcon.textContent = theme === "dark" ? "🌑" : "☀️";
    if (themeLabel) themeLabel.textContent = theme === "dark" ? "Sombre" : "Clair";
  };

  const loadParticles = () => {
    const isDark = document.body.classList.contains("dark");

    tsParticles.load("tsparticles", {
      background: { color: { value: "transparent" } },
      fullScreen: { enable: false },
      particles: {
        number: { value: 50 },
        color: { value: isDark ? "#CCCCCC" : "#4A4A4A" },
        shape: { type: "circle" },
        opacity: { value: 0.5 },
        size: { value: 3 },
        links: {
          enable: true,
          distance: 120,
          color: isDark ? "#CCCCCC" : "#999999",
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 1,
          direction: "none",
          outModes: "out"
        }
      },
      interactivity: {
        events: { onHover: { enable: true, mode: "repulse" } },
        modes: { repulse: { distance: 100 } }
      },
      detectRetina: true
    });
  };

  // === Initialisation thème et particules ===
  const initTheme = () => {
    const theme = getTheme();
    applyTheme(theme);
    loadParticles();
  };
  initTheme();

  // === Toggle Thème ===
  if (toggleThemeBtn) {
    toggleThemeBtn.addEventListener("click", () => {
      const newTheme = document.body.classList.contains("dark") ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      applyTheme(newTheme);
      loadParticles();
    });
  }

  // === Formulaire de contact ===
  if (form && popup && overlay) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      const formData = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          popup.style.display = "block";
          overlay.style.display = "block";
          form.reset();

          setTimeout(() => {
            if (popup.style.display === "block") {
              hidePopup();
            }
          }, 15000);
        } else {
          alert("Une erreur s'est produite. Veuillez réessayer.");
        }
      } catch (error) {
        alert("Erreur réseau. Veuillez vérifier votre connexion.");
      }

      overlay.addEventListener("click", hidePopup);
    });

    function hidePopup() {
      popup.style.display = "none";
      overlay.style.display = "none";
    }
  }

  // === Bouton retour haut de page ===
  if (scrollBtn) {
    window.addEventListener("scroll", () => {
      scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
    });

    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // === Menu mobile ===
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
    });

    window.addEventListener("resize", () => {
      loadParticles();
      if (window.innerWidth > 768) {
        mobileMenu.classList.remove("open");
      }
    });

    document.querySelectorAll("#mobileMenu a").forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
      });
    });
  }
});

// === Table des matières ===
function toggleToc() {
  const toc = document.getElementById("toc");
  if (toc) toc.classList.toggle("visible");
}
