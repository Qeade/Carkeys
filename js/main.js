// 1. Функція завантаження HTML
function loadHTML(elementId, fileName, callback) {
  fetch(fileName)
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      document.getElementById(elementId).innerHTML = data;
      // Якщо передали функцію-callback, запускаємо її
      if (callback) {
        callback();
      }
    })
    .catch((err) => console.error("Помилка завантаження:", err));
}

// 2. Логіка мобільного меню (твоя існуюча)
function initMobileMenu() {
  const mobileMenu = document.querySelector(".mobile-menu");
  const headerBtn = document.querySelector(".header-actions .burger-menu-btn");
  const internalCloseBtn = document.querySelector(
    ".mobile-menu .burger-menu-btn"
  );

  function closeMenu() {
    mobileMenu.classList.remove("is-open");
    if (headerBtn) headerBtn.classList.remove("is-active");
    document.body.style.overflow = "";
  }

  function toggleMenu() {
    const isOpen = mobileMenu.classList.contains("is-open");
    if (isOpen) {
      closeMenu();
    } else {
      mobileMenu.classList.add("is-open");
      if (headerBtn) headerBtn.classList.add("is-active");
      document.body.style.overflow = "hidden";
    }
  }

  if (headerBtn) headerBtn.addEventListener("click", toggleMenu);
  if (internalCloseBtn) internalCloseBtn.addEventListener("click", closeMenu);

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1250 && mobileMenu.classList.contains("is-open")) {
      closeMenu();
    }
  });
}

function initCatalog() {
  const catalogBtn = document.getElementById("catalogBtn");
  const catalogMenu = document.getElementById("catalogMenu");

  if (catalogBtn && catalogMenu) {
    catalogBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      catalogMenu.classList.toggle("active");
      catalogBtn.classList.toggle("open");
    });

    document.addEventListener("click", (e) => {
      if (!catalogMenu.contains(e.target) && !catalogBtn.contains(e.target)) {
        catalogMenu.classList.remove("active");
        catalogBtn.classList.remove("open");
      }
    });

    window.addEventListener("resize", () => {
      if (
        window.innerWidth <= 1250 &&
        catalogMenu.classList.contains("active")
      ) {
        catalogMenu.classList.remove("active");
        catalogBtn.classList.remove("open");
      }
    });
  }
}

loadHTML("header-placeholder", "components/header.html", () => {
  initMobileMenu();
  initCatalog();
});

loadHTML("footer-placeholder", "components/footer.html");
