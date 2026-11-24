# EvalWeb Solutions — site web

Site statique (HTML / CSS / JavaScript), sans installation. Ouvrir `index.html` ou déployer le dossier tel quel (Vercel, Netlify, GitHub Pages…).

## Pages
Accueil · À propos · **Expertises** (Nos pôles, Services, Produits, Formations, Réalisations) · Actualités · Contact

## Ce qu'il faut renseigner : `config.js`

### 1. Formulaire de contact réel (EmailJS)
1. Créez un compte gratuit sur https://www.emailjs.com
2. **Email Services** → *Add New Service* → Gmail → connectez **evalwebsolutions@gmail.com** → notez le **Service ID**.
3. **Email Templates** → *Create New Template* :
   - **To email** : `evalwebsolutions@gmail.com`
   - **Reply-To** : `{{reply_to}}`
   - **Subject** : `[Site web] {{subject}} — {{from_name}}`
   - **Content** :
     ```
     Nom : {{from_name}}
     Organisation : {{organisation}}
     E-mail : {{reply_to}}
     Téléphone / WhatsApp : {{phone}}
     Objet : {{subject}}
     Langue du site : {{site_lang}}

     Message :
     {{message}}
     ```
   - notez le **Template ID**.
4. **Account → General** : copiez la **Public Key**.
5. Collez les 3 valeurs dans `config.js` (`EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_PUBLIC_KEY`).
6. Dans EmailJS (**Account → Security**), vous pouvez limiter l'envoi à votre nom de domaine.

Tant que ces valeurs sont vides, le formulaire ouvre la messagerie du visiteur (repli par e-mail). Testez toujours sur le site publié (pas en ouvrant le fichier directement).

### 2. Enregistrement du webinaire de M. Elmi
Collez le lien dans `WEBINAR_REPLAY_URL`. Le bouton « Revoir l'enregistrement » apparaît alors sur l'affiche (Réalisations).

### 3. Réseaux sociaux
Renseignez `FACEBOOK_URL` et `LINKEDIN_URL`.

## Fonctionnalités
- Français / English (bouton FR/EN, choix mémorisé)
- Mode clair / sombre (bouton ☀/☾, suit le réglage de l'appareil au premier passage)
- Menu mobile compact en haut à droite
- Chaque « En savoir plus » mène à la section correspondante
- Visionneuse d'images (attestations, affiches, photos)

## Couleurs (extraites du logo)
Bleu `#1c255f` · Orange `#f6671c` · Vert `#30984b`

## Modifier les textes
Les textes français sont dans les fichiers `.html`, les traductions anglaises dans `i18n.js` (clé `data-i18n` de l'élément).
