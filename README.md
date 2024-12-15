# Portfolio Architecte - Sophie Bluel

Ce projet, réalisé dans le cadre du parcours **Développeur Web** d'OpenClassrooms, consiste à développer le portfolio de Sophie Bluel, une architecte d'intérieur, en intégrant des fonctionnalités dynamiques avec **JavaScript** et en interagissant avec une **API REST**.

---

## Objectifs du projet

- **Intégration dynamique** : Afficher les projets du portfolio en récupérant les données depuis une API.
- **Gestion des filtres** : Permettre aux utilisateurs de filtrer les projets par catégorie.
- **Mode administrateur** : Offrir à l'administrateur la possibilité de gérer les projets (ajout, modification, suppression) après authentification.

---

## Fonctionnalités principales

1. **Affichage dynamique des projets**
   - Récupération des projets via des requêtes HTTP à l'API.
   - Affichage des projets dans la galerie avec leurs détails.

2. **Filtres par catégorie**
   - Affichage dynamique des boutons de filtre basés sur les catégories disponibles.
   - Filtrage des projets affichés en fonction de la catégorie sélectionnée.

3. **Authentification administrateur**
   - Formulaire de connexion pour l'administrateur.
   - Gestion de la session administrateur avec des tokens.

4. **Gestion des projets (mode administrateur)**
   - Ajout de nouveaux projets via un formulaire.
   - Suppression de projets existants.
   - Modification des informations des projets.

---

## Prérequis

- **Backend** : Le backend est fourni par OpenClassrooms. Assurez-vous de l'avoir configuré et en cours d'exécution.
- **Navigateur moderne** : Compatible avec les dernières versions de Chrome, Firefox, et Edge.

---

## Installation

1. **Cloner le dépôt** :
   ```bash
   git clone https://github.com/RacoonyThibault/OpenClassroom-Projet3.git
   ```

2. **Naviguer dans le répertoire du projet** :
   ```bash
   cd OpenClassroom-Projet3
   ```

3. **Ouvrir les fichiers HTML dans un navigateur** pour visualiser le site.

4. **Configurer le backend** :
   - Suivez les instructions fournies par OpenClassrooms pour configurer et lancer le backend.

---

## Structure du projet

```
├── css/
│   └── styles.css          # Feuille de style principale
├── js/
│   ├── script.js           # Gestion principale de l'application
│   ├── api.js              # Interactions avec l'API
│   └── admin.js            # Gestion des fonctionnalités administrateur
├── assets/
│   ├── images/             # Images du portfolio
│   └── icons/              # Icônes utilisées sur le site
├── index.html              # Page principale
├── login.html              # Page de connexion
└── README.md               # Documentation
```

---

## Fonctionnement

### Affichage dynamique des projets
- Les projets sont récupérés via une requête `GET` à l'API.
- Ils sont affichés dynamiquement dans une galerie avec leurs titres et images.

### Gestion des filtres
- Les filtres sont générés dynamiquement en fonction des catégories disponibles dans l'API.
- Cliquer sur un filtre affiche uniquement les projets correspondants.

### Mode administrateur
- Une fois authentifié, l'administrateur peut :
  - Ajouter un nouveau projet via une modale.
  - Supprimer un projet existant directement depuis la galerie.
  - Modifier les détails d'un projet.

---

## Outils utilisés

- **JavaScript natif** : Pour manipuler le DOM et effectuer des appels API.
- **API REST** : Fournie par OpenClassrooms pour gérer les données.
- **HTML5/CSS3** : Pour la structure et la mise en page statique.

---

## Auteur

- **Thibault Frégier** : [Profil GitHub](https://github.com/RacoonyThibault)

---

## Licence

Ce projet est réalisé dans le cadre d'un programme de formation et n'a pas vocation à être utilisé à des fins commerciales.

