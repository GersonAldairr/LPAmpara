document.addEventListener("DOMContentLoaded", () => {
  // 1. Datos del directorio (se usan los nuevos nombres de archivos de icono que proporcionaste)
  const lines = [
    {
      id: 1,
      name: "Línea 100",
      description:
        "Descripción detallada de la línea de soporte y atención. Enfocada en casos graves.",
      number: "100",
      contactType: "tel",
      contactLink: "100",
      icons: "linea_100.png",
    },
    {
      id: 2,
      name: "Chat 105",
      description:
        "Chat de soporte y asesoría confidencial para situaciones de violencia. Para iniciar el chat.",
      number: "105",
      contactType: "chat",
      contactLink: "https://ejemplo.com/chat",
      icons: "105.png",
    },
    {
      id: 3,
      name: "Policía Nacional",
      description:
        "Línea de emergencia y denuncia para reportar actos delictivos.",
      number: "101",
      contactType: "tel",
      contactLink: "101",
      icons: "policia.png",
    },
    {
      id: 4,
      name: "Atención Mujer",
      description:
        "Asesoría legal y psicológica especializada en casos de violencia de género.",
      number: "102",
      contactType: "tel",
      contactLink: "102",
      icons: "atencion_mujer.png",
    },
  ];

  const directoryList = document.getElementById("directory-list");
  let favorites = loadFavorites();

  // 2. Cargar favoritos desde localStorage
  function loadFavorites() {
    const stored = localStorage.getItem("amparaDirectoryFavorites");
    return stored ? JSON.parse(stored) : [];
  }

  // 3. Guardar favoritos en localStorage
  function saveFavorites(favs) {
    localStorage.setItem("amparaDirectoryFavorites", JSON.stringify(favs));
  }

  // 4. Toggle de favoritos y re-filtrado
  window.toggleFavorite = function (id) {
    const index = favorites.indexOf(id);

    if (index > -1) {
      favorites.splice(index, 1); // Remover
    } else {
      favorites.push(id); // Añadir
    }

    saveFavorites(favorites);
    filterDirectory(); // Actualiza la vista completa
  };

  function createCardElement(line, isFavorite) {
    const card = document.createElement("div");
    card.className = "directory-card";
    card.dataset.lineId = line.id;

    // Cambia ícono según favorito
    const favoriteIcon = isFavorite ? "favoritos_on.png" : "favoritos_off.png";

    card.innerHTML = `
        <div class="card-avatar">
            <img src="icons/${
              line.icons || "avatar.png"
            }" alt="Icono de Contacto">
        </div>
        <div class="card-details">
            <h3 class="line-name">${line.name}</h3>
            <p class="line-description">${line.description}</p>
            <p class="line-number">Número: **${line.number}**</p>
        </div>
        <div class="card-actions">
            <button class="favorite-btn">
                <img src="icons/${favoriteIcon}" alt="Favoritos">
                <span>Favoritos</span>
            </button>
        </div>
    `;
    return card;
  }

  // 6. Función principal de Búsqueda y Filtro
  window.filterDirectory = function () {
    const searchText = document
      .getElementById("main-search-input")
      .value.toLowerCase();
    const showFavs = document.getElementById("show-favorites").checked;

    directoryList.innerHTML = "";

    lines.forEach((line) => {
      const lineId = line.id;
      const isFavorite = favorites.includes(lineId);

      const matchesSearch =
        line.name.toLowerCase().includes(searchText) ||
        line.description.toLowerCase().includes(searchText) ||
        line.number.includes(searchText);

      const matchesFavFilter = !showFavs || (showFavs && isFavorite);

      if (matchesSearch && matchesFavFilter) {
        const card = createCardElement(line, isFavorite);
        directoryList.appendChild(card);
      }
    });

    // Reasignar listeners a los botones de favoritos recién creados
    document.querySelectorAll(".favorite-btn").forEach((btn) => {
      btn.onclick = (e) => {
        e.preventDefault();
        toggleFavorite(parseInt(btn.closest(".directory-card").dataset.lineId));
      };
    });
  };

  // 7. Listeners correctos
  const searchInput = document.getElementById("main-search-input");
  if (searchInput) {
    searchInput.addEventListener("input", filterDirectory);
    searchInput.onkeyup = null;
  }

  const favoritesCheckbox = document.getElementById("show-favorites");
  if (favoritesCheckbox) {
    favoritesCheckbox.addEventListener("change", filterDirectory);
    favoritesCheckbox.onclick = null;
  }

  // Inicializar
  filterDirectory();
});
