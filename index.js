function hideNavBar() {
  const navBar = document.querySelector("header");
  navBar.style.display = "none";
}

function showNavBar() {
  const navBar = document.querySelector("header");
  navBar.style.display = "flex";
}

document.addEventListener("DOMContentLoaded", function () {
  // Sélectionnez l'élément HTML avec l'ID "projectGallery"
  const projectGallery = document.getElementById("projectGallery");

  const modal = document.getElementById("myModal");
  const modalImg = document.getElementById("modal-content");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const modalImages = document.querySelector(".modal-images");
  const modalElements = document.getElementById("modal-elements");

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
      showNavBar();
    }
  });
  const closeBtn = document.querySelector(".close");

  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
    showNavBar();
  });

  fetch("/photos.json")
    .then((response) => response.json())
    .then((data) => {
      data.slice(0, 5).forEach((project, index) => {
        const projectDiv = document.createElement("div");
        projectDiv.classList.add("project");

        const img = document.createElement("img");
        img.src = project.images[0].img;
        img.alt = project.images[0].alt;
        img.classList.add("project-image");

        projectDiv.appendChild(img);

        const title = document.createElement("h3");
        title.textContent = project.title || "Titre du projet";
        title.classList.add("project-title");

        projectDiv.appendChild(title);

        projectGallery.appendChild(projectDiv);

        if (index % 2 === 1) {
          projectDiv.style.order = 1;
        }

        img.addEventListener("click", function () {
          modal.style.display = "block";
          hideNavBar();
          modalTitle.textContent = project.title || "Titre du projet";
          modalDescription.textContent =
            project.Description || "Description non disponible";
          modalElements.textContent =
            project.elements || "Éléments non disponibles";
          modalImages.innerHTML = "";

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
