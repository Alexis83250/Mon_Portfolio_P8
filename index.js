function hideNavBar() {
  const navBar = document.querySelector("header");
  navBar.style.display = "none";
}

// Fonction pour afficher la barre de navigation
function showNavBar() {
  const navBar = document.querySelector("header");
  navBar.style.display = "flex";
}

document.addEventListener("DOMContentLoaded", function () {
  // Sélectionnez l'élément HTML avec l'ID "projectGallery"
  const projectGallery = document.getElementById("projectGallery");

  // Sélectionnez la modal et le contenu de la modal à un niveau supérieur
  const modal = document.getElementById("myModal");
  const modalImg = document.getElementById("modal-content");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const modalImages = document.querySelector(".modal-images");

  // Gestionnaire d'événements pour fermer la modal en cliquant en dehors
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none"; // Fermez la modal en cliquant en dehors
      showNavBar(); // Affichez à nouveau la barre de navigation
    }
  });
  const closeBtn = document.querySelector(".close");

  // Ajoutez un gestionnaire d'événements pour le clic sur le bouton Close
  closeBtn.addEventListener("click", function () {
    modal.style.display = "none"; // Fermez la modal
    showNavBar(); // Affichez à nouveau la barre de navigation
  });

  fetch("/photos.json")
    .then((response) => response.json())
    .then((data) => {
      data.slice(0, 5).forEach((project, index) => {
        // Créez un élément de div pour le projet
        const projectDiv = document.createElement("div");
        projectDiv.classList.add("project");

        // Créez un élément d'image pour la première image du projet
        const img = document.createElement("img");
        img.src = project.images[0].img;
        img.alt = project.images[0].alt;
        img.classList.add("project-image");

        // Ajoutez l'image à la div du projet
        projectDiv.appendChild(img);

        // Créez un élément de titre pour le projet
        const title = document.createElement("h3");
        title.textContent = project.title || "Titre du projet"; // Utilisez le titre du projet s'il existe
        title.classList.add("project-title");

        // Ajoutez le titre à la div du projet
        projectDiv.appendChild(title);

        // Ajoutez la div du projet à la galerie
        projectGallery.appendChild(projectDiv);

        // Si l'index est pair, déplacez le projet à droite
        if (index % 2 === 1) {
          projectDiv.style.order = 1;
        }

        // Bouclez sur chaque image pour ajouter un gestionnaire d'événements
        img.addEventListener("click", function () {
          modal.style.display = "block"; // Affichez la modal
          hideNavBar(); // Masquez la barre de navigation
          modalTitle.textContent = project.title || "Titre du projet"; // Mettez à jour le titre de la modal
          modalDescription.textContent =
            project.Description || "Description non disponible"; // Mettez à jour la description de la modal
          modalImages.innerHTML = ""; // Effacez le contenu précédent

          // Ajoutez toutes les images du projet à la modal
          project.images.forEach((image) => {
            const img = document.createElement("img");
            img.src = image.img;
            img.alt = image.alt;
            img.classList.add("modal-image");
            modalImages.appendChild(img);
          });
        });
      });
    })
    .catch((error) => {
      console.error("Une erreur s'est produite : ", error);
    });
});
