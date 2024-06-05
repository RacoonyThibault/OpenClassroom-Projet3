// Recuperation des information du serveur pour la gallery

const works = await fetch(`http://localhost:5678/api/works`).then(works => works.json())


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

