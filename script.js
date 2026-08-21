document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  // Mobile navigation
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(open));
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Active navigation link while scrolling
  const sections = [...document.querySelectorAll("main section[id]")];
  const links = [...document.querySelectorAll(".main-nav a[href^='#']")];

  const updateActiveLink = () => {
    const y = window.scrollY + 140;
    let current = sections[0]?.id || "home";

    sections.forEach(section => {
      if (y >= section.offsetTop) {
        current = section.id;
      }
    });

    links.forEach(link => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${current}`
      );
    });
  };

  window.addEventListener("scroll", updateActiveLink, {
    passive: true
  });

  updateActiveLink();

  // Smooth entrance animation for cards
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  document
    .querySelectorAll(
      ".service-card, .approach-grid article, .why-grid article, .principles article"
    )
    .forEach(el => {
      el.style.opacity = "0";
      el.style.transform = "translateY(18px)";
      el.style.transition =
        "opacity .55s ease, transform .55s ease";

      observer.observe(el);
    });

  // Animation visibility class
  const style = document.createElement("style");

  style.textContent = `
    .is-visible {
      opacity: 1 !important;
      transform: none !important;
    }
  `;

  document.head.appendChild(style);
});
