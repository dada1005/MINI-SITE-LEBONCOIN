"use strict";

// Récupération des éléments
let idTitre = document.getElementById("idTitre");
let idType = document.getElementById("idType");
let idImage = document.getElementById("idImage");
let idCategorie = document.getElementById("idCategorie");
let idDescription = document.getElementById("idDescription");
let idPrix = document.getElementById("idPrix");
let btnAjout = document.getElementById("idAjouter");
let divAnnonce = document.getElementById("divAnnonces");
let msgAnnonce = document.getElementById("msgAnnonce");
let spanErr = document.getElementById("error");

let photo = ""; // stocke l’image sélectionnée

// Lecture de l’image
idImage.addEventListener("change", function () {
    const file = this.files[0];
    const reader = new FileReader();

    reader.onload = function () {
        photo = reader.result; // on stocke l’image dans la variable
    };

    if (file) {
        reader.readAsDataURL(file);
    }
});

// Ajouter une annonce
btnAjout.addEventListener("click", function () {

    // Validation
    if (
        idTitre.value === "" ||
        idType.value === "" ||
        idCategorie.value === "" ||
        idDescription.value === "" ||
        idPrix.value === "" ||
        photo === ""
    ) {
        spanErr.innerText = "Veuillez remplir tous les champs et ajouter une image.";
        return;
    }

    spanErr.innerText = "";

    // Récupérer les annonces existantes
    let annonces = JSON.parse(localStorage.getItem("annonces")) || [];

    // Nouvelle annonce
    let annonce = {
        image: photo,
        titre: idTitre.value,
        type: idType.value,
        categorie: idCategorie.value,
        description: idDescription.value,
        prix: idPrix.value
    };

    // Ajouter au tableau
    annonces.push(annonce);

    // Sauvegarder
    localStorage.setItem("annonces", JSON.stringify(annonces));

    // Afficher la carte
    divAnnonce.innerHTML += `
        <div class="card" style="width: 18rem;">
            <img src="${annonce.image}" class="card-img-top" alt="photo">
            <div class="card-body">
                <h5 class="card-title">${annonce.titre}</h5>
                <p class="card-text">${annonce.type}</p>
                <p class="card-text">${annonce.categorie}</p>
                <p class="card-text">${annonce.description}</p>
                <p class="card-text">${annonce.prix} €</p>
            </div>
        </div>
    `;

    // Message
    msgAnnonce.innerText = "Annonce ajoutée avec succès !";

    // Reset des champs
    idTitre.value = "";
    idType.value = "";
    idCategorie.value = "";
    idDescription.value = "";
    idPrix.value = "";
    idImage.value = "";
    photo = "";
});
