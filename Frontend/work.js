// Recuperation des information du serveur pour la gallery

// const works = await fetch(`http://localhost:5678/api/works`).then(works => works.json())

//creation fonction pour generer les photo depuis l'api

async function generateWorks(){
    const works = await fetch(`http://localhost:5678/api/works`).then(works => works.json())
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

generateWorks()

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
    document.getElementById('modify-banner').style.display = 'block';
    document.querySelector('.js-modal').style.display = 'flex';
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
    target.removeAttribute('aria-hidden',)
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
    target.setAttribute('aria-hidden');
    target.removeAttribute('aria-modal');
    modal.removeEventListener('click', closeModal);
    modal.querySelector('.modal-wrapper').removeEventListener('click', stopPropagation);
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

// fonction generation gallery image de la modal

async function generateModalGallery(){
    fetch('http://localhost:5678/api/works')
    .then(gallery => gallery.json())
    .then((gallery)=>{
        for(let i = 0; i < gallery.length; i++){
        const galleryElement = gallery[i];
        const modalGallery = document.querySelector('.modal-photo');
        const modalFigure = document.createElement('figure');
        const iconContainer = document.createElement('div');
        const iconDelete = document.createElement('i');
        const imageGallery = document.createElement('img');
        imageGallery.src = galleryElement.imageUrl;
        modalFigure.setAttribute('class', `figure-gallery`);
        imageGallery.setAttribute('class',`image-gallery`);
        iconContainer.setAttribute('id', `${galleryElement.id}`);
        iconContainer.setAttribute('class', `delete-gallery`);
        iconDelete.setAttribute('class',"fa-solid fa-trash-can");
        modalGallery.appendChild(modalFigure);
        modalFigure.appendChild(imageGallery);
        modalFigure.appendChild(iconContainer);
        iconContainer.appendChild(iconDelete);
        }
        //suppression des projets
        const deleteBtnList = document.querySelectorAll('.delete-gallery')
        for(const btn of deleteBtnList){
            btn.addEventListener('click', function (event){
            event.preventDefault()
            const deleteId = event.target.parentElement.id;
            fetch(`http://localhost:5678/api/works/${deleteId}`,{
                method:'DELETE',
                headers:{'Authorization':'Bearer ' + tokens},
            }).then(del => {
                const modalGallery = document.querySelector('.modal-photo');
                modalGallery.innerHTML = ""
                reGenerateModalGallery()
                const gallery = document.querySelector(".gallery");
                gallery.innerHTML = ""
                generateWorks()
            })
        })
    }
    })   
}

async function reGenerateModalGallery(){
    fetch('http://localhost:5678/api/works')
    .then(gallery => gallery.json())
    .then((gallery)=>{
        for(let i = 0; i < gallery.length; i++){
        const galleryElement = gallery[i];
        const modalGallery = document.querySelector('.modal-photo');
        const modalFigure = document.createElement('figure');
        const iconContainer = document.createElement('div');
        const iconDelete = document.createElement('i');
        const imageGallery = document.createElement('img');
        imageGallery.src = galleryElement.imageUrl;
        modalFigure.setAttribute('class', `figure-gallery`);
        imageGallery.setAttribute('class',`image-gallery`);
        iconContainer.setAttribute('id', `${galleryElement.id}`);
        iconContainer.setAttribute('class', `delete-gallery`);
        iconDelete.setAttribute('class',"fa-solid fa-trash-can");
        modalGallery.appendChild(modalFigure);
        modalFigure.appendChild(imageGallery);
        modalFigure.appendChild(iconContainer);
        iconContainer.appendChild(iconDelete);
        }
    })
}

generateModalGallery()

// passage à la deuxieme modal

const addPhotoButton = document.querySelector('.add-photo-modal-button');
addPhotoButton.addEventListener('click', function(event){
    event.preventDefault()
    const modalGallery = document.querySelector('.modal-photo');
    const galleryTitle = document.querySelector('.title-modal-gallery');
    const modalForm = document.getElementById('modal-form');
    const modalTitle = document.querySelector('.title-modal-add')
    modalGallery.style.display = "none";
    galleryTitle.style.display = "none";
    addPhotoButton.style.display = "none";
    modalTitle.style.display = 'block';
    modalForm.style.display = 'flex';
    document.querySelector('.js-modal-previous').style.display = 'flex';
})

const previousButton = document.getElementById('switch-button-two');
previousButton.addEventListener('click', function(event){
    event.preventDefault()
    const modalGallery = document.querySelector('.modal-photo');
    const galleryTitle = document.querySelector('.title-modal-gallery');
    const modalForm = document.getElementById('modal-form');
    const modalTitle = document.querySelector('.title-modal-add')
    modalGallery.style.display = "grid";
    galleryTitle.style.display = "block";
    addPhotoButton.style.display = "block";
    modalTitle.style.display = 'none';
    modalForm.style.display = 'none';
    document.querySelector('.js-modal-previous').style.display = 'none';
})



//gestion affichage apercu image

function previewImage(event){
    const defaultImage = document.getElementById('default-image')
    const input = event.target;
    const image = document.getElementById('image-reader')

    if (input.files && input.files[0]){
        const reader = new FileReader();

        reader.onload = function(event){
            image.src = event.target.result;
        }
        defaultImage.style.display = 'none'
        image.style.display = 'block'
        reader.readAsDataURL(input.files[0]);
    }
}

document.getElementById('add-photo').addEventListener('change', previewImage)


//ajout image

const formAddProject = document.getElementById('modal-form');
formAddProject.addEventListener('submit', sendProject);

async function sendProject(event){
    event.preventDefault();
    const imageForm = document.getElementById('add-photo');
    const titleForm = document.getElementById('title-form');
    const categoryForm = document.getElementById('category-form');
    const formData = new FormData();
    formData.append('image', imageForm.files[0], imageForm.files[0].type);
    formData.append('title', titleForm.value);
    formData.append('category', categoryForm.value);
    fetch("http://localhost:5678/api/works",{
        method: 'POST',
        headers: {'Authorization':'Bearer ' + tokens},
        body: formData,
    }).then((res)=>{
        if (res.ok){
            return res.json();
        }
    })
    .catch((error) => console.log(error))
}










        

