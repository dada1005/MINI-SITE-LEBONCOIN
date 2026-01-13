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

let photo = ""; // stocke l’image sélectionnée

// Lecture de l’image
idImage.addEventListener("change", function(){
    const file = this.files[0];
    const reader = new FileReader();

    reader.onload = function () {
        photo = reader.result;
    };

    if (file) {
        reader.readAsDataURL(file);
    } else {
    }
});

btnAjout.addEventListener("click", function () {
    let titreOk = afficherTitre();
    let descriptionOk = afficherDescription();
    let prixOk = afficherPrix();
    let typeOk = idType.value;
    let categorieOk = idCategorie.value;
    let imageOk = photo;
    let msgAnnonce = document.getElementById("msgAnnonce");
    let msgImage = document.getElementById("msgImage");

    if (!titreOk || !descriptionOk ||
        !prixOk || typeOk === "" ||
        categorieOk === "" || imageOk === "") {

        msgAnnonce.innerText = "Veuillez remplir tous les champs";
        msgImage.innerText = "ajouter une image";
        msgAnnonce.style.color = "red";
        return;
    }
    msgAnnonce.innerText = "";
    msgImage.innerText = "";

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

    // Sauvegarder l'annonce
    localStorage.setItem("annonces", JSON.stringify(annonces));

    //Afficher l'annonce
    divAnnonce.innerHTML += `
        <div class="card" style="width: 18rem;">
            <img src="${annonce.image}" class="card-img-top" alt="photo">
            <div class="card-body">
                <h5 class="card-title">${annonce.titre}</h5>
                <p class="card-text">${annonce.type}</p>
                <p class="card-text">${annonce.categorie}</p>
                <p class="card-text">${annonce.description}</p>
                <p class="card-text">${annonce.prix} $</p>
            </div>
        </div>
    `;

    msgAnnonce.innerText = "Annonce ajoutée avec succès!";
        msgAnnonce.style.color = "green";
        return;
    // vider les champs
    idTitre.value = "";
    idType.value = "";
    idCategorie.value = "";
    idDescription.value = "";
    idPrix.value = "";
    idImage.value = "";
    photo = "";
});

// Validation champs
idTitre.addEventListener("keyup", afficherTitre);

function afficherTitre() {
    let msgTitre = document.getElementById("msgTitre");
    if (idTitre.value.trim() === "") {
        msgTitre.innerText = "ajouter un titre";
        return false;
    } else {
        msgTitre.innerText = "";
        return true;
    }
}

idDescription.addEventListener("keyup", afficherDescription);

function afficherDescription() {
    let msgDescription = document.getElementById("msgDescription");
    if (idDescription.value.trim() === "") {
        msgDescription.innerText = "ajouter une description";
        return false;
    } else {
        msgDescription.innerText = "";
        return true;
    }
}

idPrix.addEventListener("keyup", afficherPrix);

function afficherPrix() {
    let msgPrix = document.getElementById("msgPrix");
    if (idPrix.value.trim() === "") {
        msgPrix.innerText = "ajouter un prix";
        return false;
    } else {
        msgPrix.innerText = "";
        return true;
    }
}
