"use strict";

let msg = document.getElementById("msg");

// Supprimer l'utilisateur connecté
localStorage.removeItem("userConnecte");

// Message à l'utilisateur
msg.innerText = "Vous êtes maintenant déconnecté.";
msg.style.color = "red";

// Redirection après 1 seconde
setTimeout(() => {
    window.location.href = "seConnecter.html";
}, 1000);
