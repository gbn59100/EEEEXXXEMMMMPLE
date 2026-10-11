# Site restaurant + Decap CMS

## Structure
- `index.html`, `assets/` → le **site public** (ce que voit la clientèle)
- `admin/` → l'**interface Decap CMS** (`votresite.netlify.app/admin`), réservée au gérant
- `content/site.json` → **toutes les données** modifiées par le CMS

## Mise en ligne
1. Mets tous ces fichiers dans un dépôt GitHub (branche `main`).
2. Netlify → *Add new site → Import from Git* → choisis le dépôt (pas de commande de build, dossier de publication : `/`).
3. Netlify → *Project configuration → Identity* : activer, mettre l'inscription sur **Invite only**, puis activer **Git Gateway** (*Services*).
4. *Identity → Invite users* : invite ton email (puis celui du gérant). Clique le lien reçu, crée le mot de passe.
5. Va sur `/admin`, connecte-toi, modifie, regarde l'aperçu à droite, clique **Publier**.

## Test en local (optionnel)
`npx decap-server` dans un terminal, puis un serveur statique dans le dossier (`npx serve .`), et ouvre `/admin/`.

## Nouveau client
Copie le dépôt, change `content/site.json` et les champs de `admin/config.yml` si besoin.
