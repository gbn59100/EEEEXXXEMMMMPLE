// Génère le HTML du site à partir des données. Utilisé par le site public ET par l'aperçu du CMS.
// Tous les champs sont facultatifs : une section vide n'est simplement pas affichée.
(function () {
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function para(s) { return esc(s).replace(/\n/g, "<br>"); }
  function has(s) { return s != null && String(s).trim() !== ""; }
  function list(x) { return Array.isArray(x) ? x : []; }

  window.renderSite = function (d, img) {
    img = img || function (p) { return p; };
    d = d || {};
    var a = d.accueil || {}, ap = d.apropos || {}, c = d.contact || {};
    var carte = list(d.carte).filter(function (k) { return k && (has(k.categorie) || list(k.plats).length); });
    var horaires = list(d.horaires).filter(function (h) { return h && (has(h.jour) || has(h.heures)); });
    var hasContact = has(c.adresse) || has(c.telephone) || has(c.email);
    var o = "";

    // En-tête
    o += '<header class="top"><a class="brand" href="#accueil">' + esc(d.nom || "Votre restaurant") + "</a><nav>";
    if (carte.length) o += '<a href="#carte">La carte</a>';
    if (has(ap.titre) || has(ap.texte)) o += '<a href="#histoire">Notre histoire</a>';
    if (horaires.length || hasContact) o += '<a href="#infos">Infos pratiques</a>';
    o += "</nav></header>";

    // Accueil
    o += '<section class="hero" id="accueil"><div class="hero-text">';
    o += "<h1>" + esc(has(a.titre) ? a.titre : d.nom || "") + "</h1>";
    if (has(d.slogan)) o += '<p class="slogan">' + esc(d.slogan) + "</p>";
    if (has(a.texte)) o += "<p>" + para(a.texte) + "</p>";
    if (has(c.telephone)) o += '<a class="btn" href="tel:' + esc(String(c.telephone).replace(/\s/g, "")) + '">' + esc(has(c.reservation_texte) ? c.reservation_texte : "Réserver : " + c.telephone) + "</a>";
    o += "</div>";
    if (has(a.image)) o += '<figure class="hero-img"><img src="' + esc(img(a.image)) + '" alt=""></figure>';
    o += "</section>";

    // Carte
    if (carte.length) {
      o += '<section class="carte" id="carte"><div class="board"><h2>La carte</h2>';
      carte.forEach(function (k) {
        o += '<div class="cat">';
        if (has(k.categorie)) o += "<h3>" + esc(k.categorie) + "</h3>";
        o += "<ul>";
        list(k.plats).forEach(function (p) {
          if (!p || !(has(p.nom) || has(p.description))) return;
          o += '<li><span class="plat"><strong>' + esc(p.nom) + "</strong>";
          if (has(p.description)) o += "<em>" + esc(p.description) + "</em>";
          o += '</span><span class="dots"></span>';
          if (has(p.prix)) o += '<span class="prix">' + esc(p.prix) + "</span>";
          o += "</li>";
        });
        o += "</ul></div>";
      });
      o += "</div></section>";
    }

    // Notre histoire
    if (has(ap.titre) || has(ap.texte) || has(ap.image)) {
      o += '<section class="histoire" id="histoire">';
      if (has(ap.image)) o += '<figure><img src="' + esc(img(ap.image)) + '" alt=""></figure>';
      o += "<div>";
      if (has(ap.titre)) o += "<h2>" + esc(ap.titre) + "</h2>";
      if (has(ap.texte)) o += "<p>" + para(ap.texte) + "</p>";
      o += "</div></section>";
    }

    // Infos pratiques
    if (horaires.length || hasContact) {
      o += '<section class="infos" id="infos">';
      if (horaires.length) {
        o += "<div><h2>Horaires</h2><dl>";
        horaires.forEach(function (h) { o += "<dt>" + esc(h.jour) + "</dt><dd>" + esc(h.heures) + "</dd>"; });
        o += "</dl></div>";
      }
      if (hasContact) {
        o += "<div><h2>Nous trouver</h2>";
        if (has(c.adresse)) o += "<p>" + para(c.adresse) + "</p>";
        if (has(c.telephone)) o += '<p><a href="tel:' + esc(String(c.telephone).replace(/\s/g, "")) + '">' + esc(c.telephone) + "</a></p>";
        if (has(c.email)) o += '<p><a href="mailto:' + esc(c.email) + '">' + esc(c.email) + "</a></p>";
        o += "</div>";
      }
      o += "</section>";
    }

    o += '<footer class="foot">© ' + new Date().getFullYear() + " " + esc(d.nom || "") + "</footer>";
    return o;
  };
})();
