function loadHTML(elementId, fileName, callback) {
  fetch(fileName)
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      document.getElementById(elementId).innerHTML = data;
      if (callback) {
        callback();
      }
    })
    .catch((err) => console.error("Помилка завантаження:", err));
}

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

function initSlider() {
  const sliders = document.querySelectorAll(".productSwiper");

  sliders.forEach((sliderElement) => {
    new Swiper(sliderElement, {
      observer: true,
      observeParents: true,

      slidesPerView: "auto",
      spaceBetween: 20,
      loop: false,

      navigation: {
        nextEl: ".next-slide",
        prevEl: ".prev-slide",
      },

      scrollbar: {
        el: sliderElement.querySelector(".swiper-scrollbar"),
        draggable: true,
        hide: false,
        snapOnRelease: false,
      },

      breakpoints: {
        320: { spaceBetween: 10 },
        768: { spaceBetween: 20 },
      },
    });
  });

  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabPanes = document.querySelectorAll(".tab-pane");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => b.classList.remove("active"));
      tabPanes.forEach((p) => p.classList.remove("active"));

      btn.classList.add("active");

      const targetId = btn.getAttribute("data-target");
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add("active");
      }
    });
  });

  console.log("Слайдери та Таби запущено!");
}

loadHTML("header-placeholder", "components/header.html", () => {
  initMobileMenu();
  initCatalog();
});

loadHTML("main-slider-placeholder", "components/main-slider.html", initSlider);
loadHTML("brand-section-placeholder", "components/brand-section.html");
loadHTML("often-section-placeholder", "components/often-section.html");

loadHTML("footer-placeholder", "components/footer.html");
