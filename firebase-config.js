// ─────────────────────────────────────────────────────────────
// Configuration de l'accès partagé de Jojo cooker (voir README, étape par étape)
// ─────────────────────────────────────────────────────────────

// 1. Collez ici l'objet « firebaseConfig » de votre projet Firebase
//    (Console Firebase → ⚙ Paramètres du projet → Vos applications → Web).
//    Tant que la valeur est null, l'appli fonctionne sans connexion
//    et garde les données sur chaque appareil.
window.FIREBASE_CONFIG = null;
/* Exemple :
window.FIREBASE_CONFIG = {
  apiKey: "AIza...",
  authDomain: "menus-johan.firebaseapp.com",
  projectId: "menus-johan",
  storageBucket: "menus-johan.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
*/

// 2. Les adresses Gmail autorisées. Mettez les MÊMES dans firestore.rules :
//    c'est ce fichier-là qui protège réellement les données.
window.ALLOWED_EMAILS = [
  "votre.adresse@gmail.com",
  "adresse.de.votre.conjoint@gmail.com"
];
