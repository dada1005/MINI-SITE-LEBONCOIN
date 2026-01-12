"use strict";

// Récupération des éléments
let idEmail = document.getElementById("idEmail");
let idPassword = document.getElementById("idPassword");
let btnConnexion = document.getElementById("btnConnexion");

// Vérification email 
idEmail.addEventListener("keyup", afficherEmail);

function afficherEmail() {
    let email = idEmail.value;
    let message = document.getElementById("msgEmail");
    let car1 = "@";
    let car2 = "."

    if (email.includes(car1) && email.includes(car2)) {
        let pos = email.indexOf(car1);
        let souschaine = email.substring(pos);

        if (souschaine.includes(car2)) {
            message.innerHTML = "Email valide";
            return true;
        }
    }

    message.innerHTML = "Email non valide";
    return false;
}

// Vérification mot de passe 
idPassword.addEventListener("keyup", afficherPassword);

function afficherPassword() {
    let password = idPassword.value;
    let msg = document.getElementById("msgPassword");

    let regex1 = /[a-z]/;
    let regex2 = /[A-Z]/;
    let regex3 = /[0-9]/;
    let regex4 = /[@$!%*?&]/;

    let cpt = 0;

    if (regex1.test(password)) cpt++;
    if (regex2.test(password)) cpt++;
    if (regex3.test(password)) cpt++;
    if (regex4.test(password)) cpt++;
    if (password.length >= 10) cpt++;

    switch (cpt) {
        case 1:
            msg.innerHTML = "Mot de passe faible";
            break;
        case 2:
            msg.innerHTML = "Mot de passe moyen";
            break;
        case 3:
            msg.innerHTML = "Mot de passe sécurisé";
            break;
        case 4:
            msg.innerHTML = "Mot de passe très sécurisé";
            break;
        case 5:
            msg.innerHTML = "Mot de passe valide";
            break;
    }

    return cpt >= 3;
}

// Connexion
btnConnexion.addEventListener("click", function () {

    let emailOK = afficherEmail();
    let passOK = afficherPassword();
    let msgConnexion = document.getElementById("msgConnexion");
    let message = document.getElementById("msgEmail");


    if (!emailOK || !passOK) {
        message.innerHTML = "Veuillez remplir correctement les champs";
        message.style.color = "white";
        return;
    }
    
    // Récupérer la liste des utilisateurs
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Chercher un utilisateur correspondant
    let userFound = users.find(u =>
        u.email === idEmail.value && u.password === idPassword.value
    );

    if (!userFound) {
        msgConnexion.innerHTML = "Email ou mot de passe incorrect";
        msgConnexion.style.color = "white";
        return;
    }

    // Sauvegarder l'utilisateur connecté
    localStorage.setItem("userConnecte", JSON.stringify(userFound));

    msgConnexion.innerHTML = "Connexion réussie !";
    msgConnexion.style.color = "white";

    setTimeout(() => {
        window.location.href = "home.html";
    }, 1500);
});
