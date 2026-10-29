# Jojo cooker

Application web d'une seule page pour les repas de la famille : 2 adultes et Johan, 13 mois. Chaque portion de Johan pèse 200 g et se prélève avant l'assaisonnement des adultes.

Elle n'a pas d'étape de build : HTML, CSS et JavaScript simples. Un projet Firebase gratuit (plan Spark) sert pour l'accès par compte Google et pour le partage en direct entre vous deux.

## Onglets

- **Calendrier** : menus du lundi au dimanche, midi et soir, avec une mini-assiette pour chaque repas.
  - **Déplacer ou échanger des repas** : touchez le repas à déplacer, puis la case de destination, même dans une autre semaine. Si la case est occupée, les deux repas sont échangés.
  - **Rétablir le repas prévu** : remet en place un repas de la semaine de base que vous aviez déplacé.
- **Courses** : liste par rayon avec cases à cocher, partagée en direct. Chaque article indique qui l'a coché.
  - **Articles libres** : lessive, couches, café… Ils sont rangés automatiquement par rayon, dont « Divers & maison ».
  - **Copier la liste** : copie ce qui reste à acheter, en texte, pour l'envoyer par message.
- **Recettes** : une fiche par repas, avec :
  - l'assiette illustrée de Johan ;
  - les ingrédients ;
  - les étapes, dont celle du prélèvement de sa portion ;
  - les conseils de sécurité.

  Chaque étape qui contient une durée (« 20 min », « 1 h 15 ») affiche un bouton minuteur. Les étoiles sous le titre notent la recette.

  Deux boutons sur chaque fiche :
  - **Cuisiner** : mode cuisine, une étape à la fois en grand, avec minuteurs détectés dans le texte (« 15 min », « 1 h 15 »…) et sonnerie. L'écran reste allumé.
  - **Modifier la fiche** : corrige tout ce qui est sur la fiche.
- **Biblio (Bibliothèque de recettes)** : toutes les recettes notées (étoiles sous le titre de chaque fiche), triables par note, par date ou par ordre alphabétique, filtrables par type et note minimale. **Planifier** replace une recette à la date et au repas choisis ; **Cuisiner** ouvre le mode cuisine.
- **Sucré (Plaisir sucré)** : desserts et goûters pour Johan, sans sucre ajouté, sans date.
  - 8 recettes de base.
  - Ajout des vôtres par photo ou par texte.
  - **Ajouter aux courses** envoie les ingrédients dans la liste de la semaine.
- **Johan** : suivi des aliments goûtés.
  - Les nouveaux aliments de la semaine, avec le jour de la première fois et les allergènes majeurs signalés.
  - La réaction de Johan pour chaque aliment : aime, mitigé, refuse, réaction.
  - Dans les fiches recettes, la mention « nouveau » repère ce qu'il n'a jamais goûté.
- **Importer** : photo d'une recette (une photo par page), texte, fichier .txt / .md / .docx / .pdf, ou JSON au format de l'appli. La fiche reconnue s'ouvre pour vérification avant l'ajout. Choisissez « Plaisir sucré (sans date) » comme créneau pour un dessert.

---

## Mise en ligne

### 1. Publier sur GitHub Pages

1. Créez un dépôt, par exemple `jojo-cooker`, et déposez le contenu de ce dossier à la racine.
2. Allez dans **Settings → Pages → Deploy from a branch** et choisissez la branche `main` et le dossier `/ (root)`.
3. Notez l'adresse du site : `https://<votre-compte>.github.io/jojo-cooker/`.

Si vous aviez déjà publié l'ancienne version, remplacez simplement les fichiers dans le même dépôt. Les données restent, car le site lit toujours la même base Firebase.

### 2. Créer le projet Firebase (10 minutes, gratuit)

1. Allez sur <https://console.firebase.google.com>, puis **Ajouter un projet**.
2. **Authentication** :
   - Cliquez sur **Commencer**, puis sur l'onglet **Sign-in method**. Choisissez **Google** et cliquez sur **Activer**.
   - Dans **Paramètres → Domaines autorisés**, ajoutez `<votre-compte>.github.io`.
3. **Firestore Database** :
   - Créez la base en choisissant la région `europe-west9 (Paris)` et le **mode production**.
   - Dans **Règles**, collez le contenu de `firestore.rules` avec vos deux adresses Gmail, puis cliquez sur **Publier**.
4. **Paramètres du projet → Vos applications → Web `</>`** : copiez l'objet `firebaseConfig`.

> **Mise à jour depuis la version précédente** : recollez `firestore.rules`. Les collections utilisées sont `meals`, `checks`, `extras` (articles libres), `foods` (aliments goûtés), `sweets` (Plaisir sucré) et `ratings` (notes et bibliothèque). Sans ces règles, ces trois fonctions restent sur l'appareil.

### 3. Brancher le site

Dans `firebase-config.js` :

```js
window.FIREBASE_CONFIG = { apiKey: "...", authDomain: "...", projectId: "...", appId: "..." };
window.ALLOWED_EMAILS = ["votre.adresse@gmail.com", "adresse.de.votre.conjoint@gmail.com"];
```

Le site affiche alors **Se connecter avec Google** et n'accepte que ces deux adresses.

### À savoir

- **Ce qui est protégé.** Les données (repas importés, courses, aliments goûtés, recettes sucrées ajoutées) sont réservées aux comptes autorisés. En revanche, le code du site et les recettes de base inscrites dans `assets/app.js` sont publics pour qui connaît l'adresse.
- **La clé `apiKey`** de Firebase n'est pas un secret : la sécurité repose sur les règles Firestore.
- **Hors connexion**, coches et ajouts sont gardés et partent au retour du réseau.
- **Photos sur GitHub.** Elles sont lues sur l'appareil (OCR Tesseract, environ 15 Mo au premier usage), ce qui est moins précis que la lecture par Claude. D'où l'écran de vérification.
- **Mode cuisine.** La sonnerie des minuteurs fonctionne tant que la page est ouverte, et l'écran reste allumé quand le navigateur le permet.

---

## Import par fichier JSON

Un objet `{"semaine": "AAAA-MM-JJ", "repas": [...]}` avec, pour chaque repas, les champs suivants.

| Champ | Contenu |
|---|---|
| `jour` | jour de la semaine, ou `null` |
| `creneau` | `midi` ou `soir` |
| `titre` | le plat des adultes |
| `bebe` | la déclinaison pour Johan |
| `temps` | durée totale |
| `ingredientsAdultes` | liste des ingrédients |
| `portionBebe` | liste de `{nom, g, cat}`, total de 200 g |
| `courses` | liste de `{nom, quantite, rayon}` |
| `etapes` | liste des étapes |
| `etapeBebe` | index de l'étape de prélèvement de la portion bébé |
| `conseils` | conseils de texture et de sécurité |
| `recetteFournie` | `true` ou `false` |

Pour un dessert, ajoutez `"dessert": true`, `type`, `rendement` et `sucre` : la recette va dans Plaisir sucré.

## Structure

```
index.html              page principale
firebase-config.js      configuration Firebase + adresses autorisées
firestore.rules         règles de sécurité à coller dans la console Firebase
assets/style.css        styles (thème clair et sombre)
assets/app.js           données, rendu, import, mode cuisine, synchronisation
assets/icon.svg         icône
manifest.webmanifest    installation sur l'écran d'accueil
.nojekyll               désactive Jekyll sur GitHub Pages
```

Ces données sont dans `assets/app.js` :
- les 14 recettes de base : tableau `R` ;
- leur liste de courses : `BASE_LIST` ;
- les recettes sucrées de base : `SWEETS`.
