document.addEventListener("DOMContentLoaded", () => {

    const links = document.querySelectorAll(".profile-link");
    const panels = document.querySelectorAll(".content-panel");
    const divInf = document.querySelector(".div-inf");

    function showPanel(targetId) {

        // Ocultar todos los paneles
        panels.forEach(panel => {
            if (panel.id === targetId) {
                panel.classList.remove("hidden");
            } else {
                panel.classList.add("hidden");
            }
        });

        // Activar/desactivar opción seleccionada
        links.forEach(link => {
            if (link.dataset.target === targetId) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });

        // Asegurar que el contenedor del contenido se muestre en móvil
        if (getComputedStyle(divInf).display === "none") {
            divInf.style.display = "block";
        }
    }

    // Click en menú
    links.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();

            const target = link.dataset.target;
            showPanel(target);
        });
    });

    // Mostrar sección por defecto
    showPanel("perfil");
});
