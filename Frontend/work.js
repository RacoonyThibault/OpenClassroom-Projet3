// Recuperation des information du serveur pour la gallery

const reponse = await fetch(`http://localhost:5678/api/works`)
const works = await reponse.json()

function genererworks(works){
    for (let i = 0; i < works.length; i++){
        const workElement = works[i];
        // recuperation de l'élément du DOM qui acceuillera les figures
        const gallery = document.querySelector(".gallery");
        // création de la balise dédié au réalisation de l'architecte pour la gallery
        const figure = document.createElement("figure");
        // création de chaque balises
        const imageElement = document.createElement("img");
        imageElement.src = workElement.imgageUrl;
        const titreElement = document.createElement("figcaption");
        titreElement.innertext = workElement.title;

    // rattachement des balises au DOM
    gallery.appendChild(figure)
    figure.appendChild(imageElement)
    figure.appendChild(titreElement)
    }
}

genererworks(works)