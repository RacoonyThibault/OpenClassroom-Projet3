// Recuperation des information du serveur pour la gallery

const works = await fetch(`http://localhost:5678/api/works`).then(works => works.json())

//creation fonction pour generer les photo depuis l'api

function generateWorks(works){
    for (let i = 0; i < works.length; i++){
        const workElement = works[i];
        // recuperation de l'élément du DOM qui acceuillera les figures
        const gallery = document.querySelector(".gallery");
        // création de la balise dédié au réalisation de l'architecte pour la gallery
        const figure = document.createElement("figure");
        // création de chaque balises
        const imageElement = document.createElement("img");
        imageElement.src = workElement.imageUrl;
        const titreElement = document.createElement("figcaption");
        titreElement.innerText = workElement.title ?? "aucun titre";

    // rattachement des balises au DOM
    gallery.appendChild(figure);
    figure.appendChild(imageElement);
    figure.appendChild(titreElement);
    }
}

generateWorks(works)

// filtre tout afficher
const buttonFilterAll = document.getElementById("filterAll");
buttonFilterAll.addEventListener(`click`, function(){
    const filterAll = works;
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(filterAll);
});

// filtre afficher category objet
const buttonFilterItems = document.getElementById("FilterItems");
buttonFilterItems.addEventListener(`click`, function(){
    const Filtercategory = works.filter(function (work) {
        return work.categoryId === 2;
    })
    
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(Filtercategory)
})

//filtre afficher category apartment

const buttonFilterApartment = document.getElementById("filterApartment");
buttonFilterApartment.addEventListener(`click`, function(){
    const Filtercategory = works.filter(function (work) {
        return work.categoryId === 1;
    })
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(Filtercategory)
})

//filtre afficher category HotelsAndRestaurants

const buttonFilterHotelsAndRestaurants = document.getElementById("filterHotelsAndRestaurants");
buttonFilterHotelsAndRestaurants.addEventListener(`click`, function(){
    const Filtercategory = works.filter(function (work) {
        return work.categoryId === 3;
    })
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(Filtercategory)
})

// changement de la page si token

const tokens = localStorage.getItem("token")

if (tokens){
    document.getElementById('login-link').style.display = 'none';
    document.getElementById('logout-link').style.display = 'block';
    document.getElementById('modify-banner').style.visibility = 'visible';
    document.querySelector('.js-modal').style.display = 'block';
}else{}

// Fonctionnalité logout efface le token

const logOutLink = document.getElementById("logout-link");
logOutLink.addEventListener("click", function(){
    localStorage.removeItem("token");
})

// fonctionnalité lancé la modale

// declaration de la variable modal null qui nous permettra de savoir qu'elle modal est ouverte
let modal = null;

// fonction d'ouverture de la modal + gestion aria
const openModal = function (e) {
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute('href'))
    target.style.display = null;
    target.removeAttribute('aria-hidden')
    target.setAttribute('aria-modal', 'true')
    modal = target
    modal.addEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
    modal.querySelector('.modal-wrapper').addEventListener('click', stopPropagation)
}

// fonction pour fermer la modal contenue dans la fonction ouvrir la modal
const closeModal = function (e) {
    if(modal === null) return
    e.preventDefault()
    modal.style.display = "none";
    target.setAttribute('aria-hidden')
    target.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.modal-wrapper').removeEventListener('click', stopPropagation)
    modal = null;
}

// fonction qui empeche la fermeture si on click sur la modal
const stopPropagation = function (e) {
    e.stopPropagation()
}

// selectionne la modal et applique la fonction ouvrir (et fermer) la modal
document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal)
})
