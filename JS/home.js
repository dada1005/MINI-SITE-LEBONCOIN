"use strict";

let user = JSON.parse(localStorage.getItem("userConnecte"));
let msg = document.getElementById("msgBienvenue");

if (user) {
     msg.innerText = "Bienvenue " +user.nom+ " ! sur le site de vente leboncoin";
} else {
    // Si aucun utilisateur n'est connecté → retour à la page de connexion
     window.location.href = "seConnecter.html";
 }
setTimeout(() => {
     message.innerText = ""; 
    }, 5000);