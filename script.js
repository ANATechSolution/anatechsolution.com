/* =========================================================
   ANATECHSOLUTION - WEBSITE INTERACTIONS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const header = document.querySelector(".header");

    /* -------------------------
       MOBILE NAVIGATION
       ------------------------- */

    const closeMenu = () => {
        if (!menuToggle || !navLinks) return;

        navLinks.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation"
        );

        menuToggle.textContent = "☰";
    };

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", (event) => {
            event.stopPropagation();

            const isOpen =
                navLinks.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation"
                    : "Open navigation"
            );

            menuToggle.textContent =
                isOpen ? "✕" : "☰";
        });

        /* Close menu after clicking a navigation link */

        navLinks.querySelectorAll("a").forEach((link) => {

            link.addEventListener("click", () => {
                closeMenu();
            });

        });

        /* Close menu when clicking outside */

        document.addEventListener("click", (event) => {

            if (
                navLinks.classList.contains("open") &&
                !navLinks.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                closeMenu();
            }

        });

        /* Close mobile menu when returning to desktop */

        window.addEventListener("resize", () => {

            if (window.innerWidth > 760) {
                closeMenu();
            }

        });
    }


    /* -------------------------
       COPYRIGHT YEAR
       ------------------------- */

    const yearElement =
        document.getElementById("year");

    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }


    /* -------------------------
       HEADER SHADOW ON SCROLL
       ------------------------- */

    const updateHeader = () => {

        if (!header) return;

        header.style.boxShadow =
            window.scrollY > 12
                ? "0 8px 28px rgba(16,29,58,.08)"
                : "none";

    };

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    /* -------------------------
       ACTIVE NAVIGATION
       ------------------------- */

    const sections = Array.from(
        document.querySelectorAll(
            "main section[id]"
        )
    );

    const navigationLinks = Array.from(
        document.querySelectorAll(
            ".nav-links a[href^='#']"
        )
    );

    const updateActiveNavigation = () => {

        if (
            !sections.length ||
            !navigationLinks.length
        ) {
            return;
        }

        const scrollPosition =
            window.scrollY + 150;

        let currentSection =
            sections[0].id;

        sections.forEach((section) => {

            if (
                scrollPosition >=
                section.offsetTop
            ) {
                currentSection =
                    section.id;
            }

        });

        navigationLinks.forEach((link) => {

            const target =
                link.getAttribute("href");

            link.classList.toggle(
                "active",
                target ===
                    `#${currentSection}`
            );

        });

    };

    updateActiveNavigation();

    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );


    /* -------------------------
       SMOOTH INTERNAL NAVIGATION
       ------------------------- */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach((link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(
                            targetId
                        );

                    if (!target) {
                        return;
                    }

                    event.preventDefault();

                    const headerHeight =
                        header
                            ? header.offsetHeight
                            : 0;

                    const targetTop =
                        target
                            .getBoundingClientRect()
                            .top +
                        window.scrollY -
                        headerHeight -
                        10;

                    window.scrollTo({
                        top: targetTop,
                        behavior: "smooth"
                    });

                    history.replaceState(
                        null,
                        "",
                        targetId
                    );

                    closeMenu();

                }
            );

        });


    /* -------------------------
       SCROLL REVEAL ANIMATION
       ------------------------- */

    const revealTargets = [

        ".section-heading",

        ".about-card",

        ".service-card",

        ".process-item",

        ".why-card",

        ".contact-item"

    ];

    const revealElements =
        document.querySelectorAll(
            revealTargets.join(",")
        );


    if (
        "IntersectionObserver" in window &&
        revealElements.length
    ) {

        const observer =
            new IntersectionObserver(
                (entries, obs) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }

                            entry.target.classList.add(
                                "reveal",
                                "visible"
                            );

                            obs.unobserve(
                                entry.target
                            );

                        }
                    );

                },
                {
                    threshold: 0.12,

                    rootMargin:
                        "0px 0px -45px 0px"
                }
            );


        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "reveal"
                );

                observer.observe(
                    element
                );

            }
        );

    }

});
