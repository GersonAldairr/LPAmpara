document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".btn-burger");
  const mobileMenu = document.querySelector(".mobile-menu");
  const closeBtn = document.querySelector(".btn-close");

  if (!burger || !mobileMenu) return;

  const toggleMenu = () => {
    const isOpen = mobileMenu.classList.toggle("is-open");
    mobileMenu.setAttribute("aria-hidden", String(!isOpen));
    burger.setAttribute("aria-expanded", String(isOpen));
  };

  burger.addEventListener("click", toggleMenu);

  if (closeBtn) {
    closeBtn.addEventListener("click", toggleMenu);
  }
});
