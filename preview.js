// Aperçu en direct : réutilise exactement le même rendu que le site public.
CMS.registerPreviewStyle("/assets/style.css");
CMS.registerPreviewTemplate("contenu", function (props) {
  var data = props.entry.get("data").toJS();
  var img = function (path) {
    if (!path) return "";
    var asset = props.getAsset(path);
    return asset ? asset.toString() : path;
  };
  var style = {};
  if (data.couleur) style["--accent"] = data.couleur;
  return h("div", {
    className: "preview-root",
    style: style,
    dangerouslySetInnerHTML: { __html: window.renderSite(data, img) }
  });
});
