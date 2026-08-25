
async function loadComponent(id, file) {
  const response = await fetch(file);
  const html = await response.text();
  document.getElementById(id).innerHTML = html;
}
async function loadLayout() {

  await loadComponent("header", "header.html");
  await loadComponent("home", "home.html");
  await loadComponent("footer", "footer.html");

  await loadComponent("reportModalContainer", "report-modal.html");
  await loadComponent("detailModalContainer", "detail-modal.html");

  await loadComponent("hero", "hero.html");
  await loadComponent("stats", "stats.html");
  await loadComponent("filters", "filters.html");
  await loadComponent("items", "items.html");

}

loadLayout();