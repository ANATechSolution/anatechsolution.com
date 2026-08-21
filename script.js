/* =========================================================
   ANATECHSOLUTION WEBSITE JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       MOBILE NAVIGATION
    ========================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            const isOpen = navLinks.classList.toggle("open");

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

            menuToggle.textContent = isOpen ? "✕" : "☰";
        });


        /* Close menu after selecting a navigation item */

        document
            .querySelectorAll(".nav-links a")
            .forEach(link => {

                link.addEventListener("click", () => {

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
                });

            });


        /* Close menu when clicking outside */

        document.addEventListener("click", event => {

            const clickedInsideMenu =
                navLinks.contains(event.target);

            const clickedToggle =
                menuToggle.contains(event.target);

            if (
                !clickedInsideMenu &&
                !clickedToggle &&
                navLinks.classList.contains("open")
            ) {

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
            }

        });

    }


    /* =========================
       COPYRIGHT YEAR
    ========================== */

    const yearElement =
        document.getElementById("year");

    if (yearElement) {
        yearElement.textContent =
            new Date().getFullYear();
    }


    /* =========================
       ACTIVE NAVIGATION
    ========================== */

    const sections =
        document.querySelectorAll("main section[id]");

    const navigationLinks =
        document.querySelectorAll(".nav-links a[href^='#']");


    const updateActiveNavigation = () => {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 130;

            if (window.scrollY >= sectionTop) {
                currentSection = section.id;
            }

        });

        navigationLinks.forEach(link => {

            link.classList.remove("active");

            const target =
                link.getAttribute("href");

            if (target === `#${currentSection}`) {
                link.classList.add("active");
            }

        });

    };


    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive:true }
    );

    updateActiveNavigation();


    /* =========================
       HEADER SHADOW ON SCROLL
    ========================== */

    const header =
        document.querySelector(".header");

    const updateHeader =
        () => {

            if (!header) return;

            if (window.scrollY > 20) {

                header.style.boxShadow =
                    "0 6px 25px rgba(16,29,58,.07)";

            } else {

                header.style.boxShadow =
                    "none";

            }

        };


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive:true }
    );

    updateHeader();


    /* =========================
       SMOOTH INTERNAL NAVIGATION
    ========================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener("click", event => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(targetId);

                if (!target) {
                    return;
                }

                event.preventDefault();

                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight -
                    15;

                window.scrollTo({
                    top:targetPosition,
                    behavior:"smooth"
                });

            });

        });

});
