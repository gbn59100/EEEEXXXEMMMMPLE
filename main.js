// Charge le contenu édité par le CMS et affiche le site public.
fetch("/content/site.json?v=" + Date.now())
  .then(function (r) { return r.json(); })
  .then(function (data) {
    document.getElementById("app").innerHTML = window.renderSite(data);
    if (data.couleur) document.documentElement.style.setProperty("--accent", data.couleur);
    if (data.nom) document.title = data.nom + (data.slogan ? " – " + data.slogan : "");
  })
  .catch(function () {
    document.getElementById("app").innerHTML = "<p style='padding:2rem'>Le site est momentanément indisponible.</p>";
  });
