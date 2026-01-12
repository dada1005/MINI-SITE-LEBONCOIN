"use strict";

let user = JSON.parse(localStorage.getItem("userConnecte"));
let msg = document.getElementById("msgBienvenue");

if (user) {
     msg.innerText = "Bienvenue " + user.nom + " ! sur le site de vente leboncoin";
} else {
     // Si aucun utilisateur n'est connecté → retour à la page de connexion
     window.location.href = "seConnecter.html";
}
setTimeout(() => {
     message.innerText = "";
}, 5000);


let annonces = JSON.parse(localStorage.getItem("annonces"));
let listAnnonces = document.getElementById("listAnnonces");

// S'il y a aucune annonce
if (!annonces) {
    listAnnonces.innerHTML = "<p>Aucune annonce disponible pour le moment.</p>";
} else {

    annonces.forEach(annonce => {
        listAnnonces.innerHTML += ` 
        <div class="card m-2" style="width: 18rem;"> 
            <img src="${annonce.image}" class="card-img-top" alt="photo"> 
            <div class="card-body"> 
                <h5 class="card-title">${annonce.titre}</h5> 
                <p class="card-text">${annonce.type}</p> 
                <p class="card-text">${annonce.categorie}</p> 
                <p class="card-text">${annonce.description}</p> 
                <p class="card-text fw-bold">${annonce.prix} €</p> 
            </div> 
        </div>`;
    });
}

//localStorage.removeItem("annonces");