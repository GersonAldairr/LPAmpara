// Por ahora solo marcamos visualmente qué opción del menú está activa
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".account-menu-item");

  items.forEach((btn) => {
    btn.addEventListener("click", () => {
      items.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      // Aquí luego puedes cambiar el contenido de la derecha si quieres.
    });
  });
});
