# Les menus de Johan

Application web d'une seule page qui organise les repas d'automne de la famille : 2 adultes et Johan, 13 mois. Chaque portion de Johan pèse 200 g et se prélève avant l'assaisonnement des adultes.

Elle n'a ni dépendance ni étape de build : HTML, CSS et JavaScript simples.

## Onglets

- **Calendrier** : menus du lundi au dimanche, midi et soir. Chaque repas montre la déclinaison bébé et une mini-assiette.
- **Courses** : liste par rayon avec des cases à cocher. Les quantités couvrent les 2 adultes et les portions de Johan.
- **Recettes** : une fiche par repas. Elle contient :
  - l'assiette illustrée de Johan, avec la répartition des 200 g ;
  - les ingrédients ;
  - les étapes, dont celle du prélèvement de la portion bébé ;
  - les conseils de texture et de sécurité.
- **Importer** : ajoute un menu ou une recette à partir d'un texte collé ou d'un fichier (.txt, .md, .docx, .pdf).
  - Si les jours sont nommés, l'appli demande seulement la semaine.
  - Sinon, elle demande la date et midi ou soir pour chaque recette.

## Mise en ligne sur GitHub Pages

1. Créez un dépôt, par exemple `menus-johan`.
2. Déposez le contenu de ce dossier à la racine du dépôt.
3. Allez dans **Settings → Pages → Build and deployment**. Choisissez **Deploy from a branch**, puis la branche `main` et le dossier `/ (root)`.
4. Au bout d'une minute, l'appli est en ligne à l'adresse `https://<votre-compte>.github.io/menus-johan/`.

Sur téléphone, vous pouvez utiliser « Ajouter à l'écran d'accueil » pour l'ouvrir comme une application.

## Différences avec la version publiée sur Claude

- **Stockage.** Sur Claude, les repas importés et les cases cochées sont synchronisés entre vos appareils. Sur GitHub Pages, ils sont enregistrés dans le navigateur (`localStorage`) : chaque appareil garde les siens.
- **Analyse des imports.** Sur Claude, l'analyse peut lire les photos et compléter les fiches. Sur GitHub Pages, c'est l'analyse intégrée qui lit le texte :
  - les jours (`Lundi`…) ;
  - `Midi :` / `Soir :` ;
  - la déclinaison bébé, après `| Bébé :` ou sur une ligne `Bébé :` ;
  - les sections `Ingrédients` / `Préparation` / `Conseils` d'une recette.

  Les photos ne sont pas lues dans ce mode.

## Structure

```
index.html              page principale
assets/style.css        styles (thème clair et sombre)
assets/app.js           données des menus, rendu, import, illustrations
assets/icon.svg         icône
manifest.webmanifest    installation sur l'écran d'accueil
.nojekyll               désactive Jekyll sur GitHub Pages
```

## Modifier les menus de base

Les 14 recettes de la semaine du 12 octobre 2026 se trouvent dans le tableau `R`, en haut de `assets/app.js`. La liste de courses correspondante se trouve dans `BASE_LIST`.

Pour placer cette semaine à une autre date, changez la constante `BASE_WEEK`. Sa valeur doit être un lundi, au format `AAAA-MM-JJ`.
