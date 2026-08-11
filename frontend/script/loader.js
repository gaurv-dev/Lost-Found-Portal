async function loadComponent(id, file) {
    const response = await fetch(file);
    const html = await response.text();
    document.getElementById(id).innerHTML = html;
}

async function loadLayout() {

    await loadComponent("header", "pages/header.html");
    await loadComponent("home", "pages/home.html");
    await loadComponent("footer", "pages/footer.html");

    await loadComponent("reportModalContainer", "pages/report-modal.html");
    await loadComponent("detailModalContainer", "pages/detail-modal.html");

    await loadComponent("hero", "pages/hero.html");
    await loadComponent("stats", "pages/stats.html");
    await loadComponent("filters", "pages/filters.html");
    await loadComponent("items", "pages/items.html");

}

loadLayout();