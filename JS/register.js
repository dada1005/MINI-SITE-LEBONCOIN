"use strict";
"use strict";

// inititalisation des variables
let idNom = document.getElementById("idNom");
let idNumero = document.getElementById("idTel");
let idEmail = document.getElementById("idEmail");
let idPassword = document.getElementById("idPassword");
let btnValider = document.getElementById("btnValider");

// abonnement du bouton valider
btnValider.addEventListener("click", function () {
    let nom = idNom.value;
    let tel = idNumero.value;
    let emailOK = afficherEmail();
    let passOK = afficherPassword();
    let msgUser = document.getElementById("msgUser");
    let msgEmail = document.getElementById("msgEmail");
    let msgPassword = document.getElementById("msgPassword");
    let msgInscription = document.getElementById("msgInscription");

    if (!nom || !tel) {
        msgUser.innerHTML = "Champ obligatoire";
        return;
    }

    if (!emailOK) {
        msgEmail.innerHTML = "Veuillez entrer une adresse valide";
        return;
    }

    if (!passOK) {
        msgPassword.innerHTML = "Mot de passe trop faible";
        return;
    }

    // Récupérer la liste des utilisateurs
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Vérifier email déjà utilisé
    let emailExiste = users.some(u => u.email === idEmail.value);
    if (emailExiste) {
        msgInscription.innerHTML = "Ce compte existe déjà !";
        msgInscription.style.color = "white";
        return;
    }

    // Vérifier nom déjà utilisé
    let nomExiste = users.some(u => u.nom === idNom.value);
    if (nomExiste) {
        msgUser.innerHTML = "Ce nom d'utilisateur existe déjà";
        return;
    }

    // Créer le nouvel utilisateur
    let user = {
        nom: idNom.value,
        tel: idNumero.value,
        email: idEmail.value,
        password: idPassword.value
    };

    // Ajouter dans le tableau
    users.push(user);

    // Sauvegarder l'utilisateur dans le localStorage
    localStorage.setItem("users", JSON.stringify(users));

    msgInscription.innerText = "Inscription réussie !";
    msgInscription.style.color = "white";

    setTimeout(() => {
        window.location.href = "seConnecter.html";
    }, 2000);
});


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

        if (souschaine.includes(".")) {
            message.innerHTML = "Adresse valide";
            return true;
        } else {
            message.innerHTML = "Adresse non valide";
            return false;
        }
    }

    message.innerHTML = "Adresse non valide";
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
        case 1: msg.innerHTML = "Mot de passe faible"; break;
        case 2: msg.innerHTML = "Mot de passe moyen"; break;
        case 3: msg.innerHTML = "Mot de passe sécurisé"; break;
        case 4: msg.innerHTML = "Mot de passe très sécurisé"; break;
        case 5: msg.innerHTML = "Mot de passe valide"; break;
    }

    return cpt >= 3;
}
