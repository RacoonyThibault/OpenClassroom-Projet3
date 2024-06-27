// Création de la gallery
const gallery = document.createElement('div')
gallery.setAttribute('class', 'gallery')
const portfolio = document.getElementById('portfolio')
portfolio.appendChild(gallery);
//Fonction generation gallery d'image principal
async function generateGallery (){
    const res = await fetch(`http://localhost:5678/api/works`);
    const project = await res.json();
        gallery.innerHTML = ''
        for (let i = 0; i < project.length; i++){
            const projectElement = project[i];

            // Création de la balise dédié au réalisation de l'architecte pour la gallery
            const figure = document.createElement('figure');

            // Création de chaque balises
            const imageElement = document.createElement('img');
            imageElement.src = projectElement.imageUrl;
            const titreElement = document.createElement("figcaption");
            titreElement.innerText = projectElement.title ?? "aucun titre";

            // Rattachement des balises au DOM
            portfolio.appendChild(gallery);
            gallery.appendChild(figure);
            figure.appendChild(imageElement);
            figure.appendChild(titreElement);
        }
        const buttonFilter = document.createElement('div');
        portfolio.appendChild(buttonFilter);
}
// Appel de la fonction
generateGallery ()

// Création des filtres


// Changement de la page si token

// Recuperation du token via le local storage
const tokens = localStorage.getItem("token")
if (tokens){
    document.getElementById('login-link').style.display = 'none';
    document.getElementById('logout-link').style.display = 'block';
    document.getElementById('modify-banner').style.display = 'block';
    document.getElementById('open-modal').style.display = 'flex';
}

// Fonctionnalité logout efface le token
const logOutLink = document.getElementById("logout-link");
logOutLink.addEventListener("click", function(){
    localStorage.removeItem("token");
})

// Gestion Modal
// Recuperation de la modal et des bouton d'ouverture et fermeture avec la methode dialog
const openModal = document.querySelector('[data-open-modal]');
const closeModal = document.querySelector('[data-close-modal]');
const modal = document.querySelector('[data-modal]')

//ouverture modal
openModal.addEventListener('click', () =>{
    modal.showModal();
})

//fermeture modale
closeModal.addEventListener('click', () => {
    modal.close();
})

// Fermeture de la modal si click en dehors

modal.addEventListener('click', (e) => {
    const modalDimensions = modal.getBoundingClientRect();
    if(
        e.clientX < modalDimensions.left ||
        e.clientX > modalDimensions.right ||
        e.clientY < modalDimensions.top ||
        e.clientY > modalDimensions.bottom
    ){
        modal.close()
    }
})

// Generation de la gallery de la modal

// Création de la gallery modal
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
                generateModalGallery()
                const gallery = document.querySelector(".gallery");
                gallery.innerHTML = ""
                generateGallery ()
            })
        })
    }
    })   
}

// Appel de la fonction generation de la gallery modal
generateModalGallery()

// Suppression des projets

// Selection de tout les divs de suppression dans une variable
const deleteBtnList = document.querySelectorAll('.delete-gallery')
// pour tout les bouton de la liste
for(const btn of deleteBtnList){
    // EventListener sur chaque click de bouton
    btn.addEventListener('click', (e) =>{
        e.preventDefault();
        const deleteId = e.target.parentElement.id;
        // Appel de l'api avec la method 'DELETE'
        fetch(`http://localhost:5678/api/works/${deleteId}`,{
            method:'DELETE',
            headers:{'Authorization':'Bearer ' + tokens},
        }).then(del =>{
            const modalGallery = document.querySelector('.modal-photo');
            modalGallery.innerHTML = ""
            generateModalGallery ()
        })
    })
}

// passage à la deuxieme modal

const addPhotoButton = document.querySelector('.add-photo-modal-button');
addPhotoButton.addEventListener('click', function(event){
    event.preventDefault()
    const modalGallery = document.querySelector('.modal-photo');
    const galleryTitle = document.querySelector('.title-modal-gallery');
    const modalForm = document.getElementById('modal-form');
    const modalTitle = document.getElementById('title-add-photo');
    modalGallery.style.display = "none";
    galleryTitle.style.display = "none";
    addPhotoButton.style.display = "none";
    modalTitle.style.display = 'block';
    modalForm.style.display = 'flex';
    document.querySelector('.js-modal-previous').style.display = 'flex';
})

// bouton retour modal precedente

const previousButton = document.getElementById('switch-button-two');
previousButton.addEventListener('click', function(event){
    event.preventDefault()
    const modalGallery = document.querySelector('.modal-photo');
    const galleryTitle = document.querySelector('.title-modal-gallery');
    const modalForm = document.getElementById('modal-form');
    const modalTitle = document.getElementById('title-add-photo');
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

// Selection du formulaire de la modale
const formAddProject = document.getElementById('modal-form');
// validForm ()
formAddProject.addEventListener('submit', sendProject);

// Création d'une fonction pour l'ajout de nouveaux projets
async function sendProject(event){
    event.preventDefault();
    const imageForm = document.getElementById('add-photo');
    const titleForm = document.getElementById('title-form');
    const categoryForm = document.getElementById('category-form');
    // Création d'un dataForm pour l'envoi des données
    const formData = new FormData();
    // Vérification, récupération et formatage des données
    if(titleForm.value !== null && titleForm.value !==""){
        formData.append('title', titleForm.value);
    }else{
        document.querySelector('.alert-title').style.display = 'block';
    }
    formData.append('category', categoryForm.value);
    if(imageForm.files.length > 0 && imageForm.size <= 4 * 1024 * 1024){
        formData.append('image', imageForm.files[0], imageForm.files[0].type);
    }else{
        document.querySelector('.alert-image').style.display = 'block';
    }
    fetch("http://localhost:5678/api/works",{
        method: 'POST',
        headers: {'Authorization':'Bearer ' + tokens},
        body: formData,
    }).then((res)=>{
        if (res.ok){
            return res.json();
        }
    }).then(res => {
        const modalGallery = document.querySelector('.modal-photo');
        modalGallery.innerHTML = ""
        generateModalGallery ()
        const gallery = document.querySelector(".gallery");
        gallery.innerHTML = ""
        generateGallery ()
    })
}

// Fonction verification validiter des champs du formulaire

// function validForm () {
//     const submitButton = document.getElementById('submit-photo');
//     const imageForm = document.getElementById('add-photo');
//     const titleForm = document.getElementById('title-form');
//     submitButton.addEventListener('mouseover', (e) => {
//         if(imageForm.files.length <= 0 && imageForm.size > 4 * 1024 * 1024){
//         document.querySelector('.alert-image').style.display = 'block';
//     }else if (titleForm.value == null && titleForm.value ==""){
//         
//     }else if (titleForm.value !== null && titleForm.value !=="" && imageForm.files.length > 0){
//         submitButton.style.backgroundColor = '#1D6154';
//     }
//     })
// }