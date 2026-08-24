
var currentFilters = {
  status: "all",
  category: "all",
  searchText: "",
  sortBy: "newest",
  itemsToShow: 8
};

var itemGrid = document.getElementById("item-grid");
var resultCountText = document.getElementById("result-count");
var noResultsBox = document.getElementById("no-results");
var loadMoreButton = document.getElementById("load-more-btn");

function formatDate(dateString) {
  var dateObject = new Date(dateString);
  return dateObject.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

function formatCategoryName(category) {
  return category.charAt(0).toUpperCase() + category.slice(1);
}


function getMatchingItems() {
  var matchingItems = [];

  for (var i = 0; i < sampleItems.length; i++) {
    var item = sampleItems[i];

    var statusMatches = currentFilters.status === "all" || item.status === currentFilters.status;
    var categoryMatches = currentFilters.category === "all" || item.category === currentFilters.category;

    var searchText = currentFilters.searchText.toLowerCase();
    var searchMatches =
      searchText === "" ||
      item.title.toLowerCase().includes(searchText) ||
      item.location.toLowerCase().includes(searchText);

    if (statusMatches && categoryMatches && searchMatches) {
      matchingItems.push(item);
    }
  }

  sortItems(matchingItems);

  return matchingItems;
}

function sortItems(items) {
  if (currentFilters.sortBy === "newest") {
    items.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });
  } else if (currentFilters.sortBy === "oldest") {
    items.sort(function (a, b) {
      return new Date(a.date) - new Date(b.date);
    });
  } else if (currentFilters.sortBy === "az") {
    items.sort(function (a, b) {
      return a.title.localeCompare(b.title);
    });
  }
}

function createItemCard(item) {
  var card = document.createElement("article");
  card.className = "item-card";

  card.innerHTML =
    '<div class="item-card-photo" style="background-image: url(\'' + item.image + '\')">' +
      '<span class="item-card-status ' + item.status + '">' + item.status + "</span>" +
    "</div>" +
    '<div class="item-card-tear"></div>' +
    '<div class="item-card-body">' +
      '<span class="item-card-category">' + formatCategoryName(item.category) + "</span>" +
      '<h3 class="item-card-title">' + item.title + "</h3>" +
      '<p class="item-card-location">' + item.location + "</p>" +
      '<div class="item-card-footer">' +
        "<span>" + formatDate(item.date) + "</span>" +
        "<span>View details</span>" +
      "</div>" +
    "</div>";

  card.addEventListener("click", function () {
    openItemModal(item);
  });

  return card;
}

function renderItems() {
  var matchingItems = getMatchingItems();
  var itemsToDisplay = matchingItems.slice(0, currentFilters.itemsToShow);

  itemGrid.innerHTML = "";
  for (var i = 0; i < itemsToDisplay.length; i++) {
    var card = createItemCard(itemsToDisplay[i]);
    itemGrid.appendChild(card);
  }

  resultCountText.textContent =
    "Showing " + itemsToDisplay.length + " of " + matchingItems.length + " items";
  if (matchingItems.length === 0) {
    itemGrid.style.display = "none";
    noResultsBox.hidden = false;
  } else {
    itemGrid.style.display = "grid";
    noResultsBox.hidden = true;
  }

  if (currentFilters.itemsToShow >= matchingItems.length) {
    loadMoreButton.style.display = "none";
  } else {
    loadMoreButton.style.display = "inline-block";
  }
}

document.getElementById("status-buttons").addEventListener("click", function (event) {
  var clickedButton = event.target.closest(".status-btn");
  if (!clickedButton) return;

  var allButtons = document.querySelectorAll(".status-btn");
  allButtons.forEach(function (button) {
    button.classList.remove("active");
  });
  clickedButton.classList.add("active");

  currentFilters.status = clickedButton.dataset.status;
  currentFilters.itemsToShow = 8;
  renderItems();
});


document.getElementById("category-buttons").addEventListener("click", function (event) {
  var clickedButton = event.target.closest(".category-btn");
  if (!clickedButton) return;

  var allButtons = document.querySelectorAll(".category-btn");
  allButtons.forEach(function (button) {
    button.classList.remove("active");
  });
  clickedButton.classList.add("active");

  currentFilters.category = clickedButton.dataset.category;
  currentFilters.itemsToShow = 8;
  renderItems();
});

var searchDelayTimer;
document.getElementById("search-input").addEventListener("input", function (event) {
  clearTimeout(searchDelayTimer);
  searchDelayTimer = setTimeout(function () {
    currentFilters.searchText = event.target.value;
    currentFilters.itemsToShow = 8;
    renderItems();
  }, 200);
});

document.getElementById("sort-select").addEventListener("change", function (event) {
  currentFilters.sortBy = event.target.value;
  renderItems();
});

loadMoreButton.addEventListener("click", function () {
  currentFilters.itemsToShow += 8;
  renderItems();
});

document.getElementById("clear-filters-btn").addEventListener("click", function () {
  currentFilters.status = "all";
  currentFilters.category = "all";
  currentFilters.searchText = "";
  currentFilters.itemsToShow = 8;

  document.getElementById("search-input").value = "";

  document.querySelectorAll(".status-btn").forEach(function (button) {
    button.classList.toggle("active", button.dataset.status === "all");
  });
  document.querySelectorAll(".category-btn").forEach(function (button) {
    button.classList.toggle("active", button.dataset.category === "all");
  });

  renderItems();
});


var modalBackground = document.getElementById("modal-background");

function openItemModal(item) {
  document.getElementById("modal-image").style.backgroundImage = "url('" + item.image + "')";

  var statusLabel = document.getElementById("modal-status-label");
  statusLabel.textContent = item.status.toUpperCase();
  statusLabel.className = "status-label " + item.status;

  document.getElementById("modal-title").textContent = item.title;
  document.getElementById("modal-meta").textContent =
    formatCategoryName(item.category) + " - " + item.location + " - " + formatDate(item.date);
  document.getElementById("modal-description").textContent = item.description;
  document.getElementById("modal-poster").textContent = "Posted by " + item.postedBy;

  modalBackground.classList.add("open");
}

function closeItemModal() {
  modalBackground.classList.remove("open");
}

document.getElementById("modal-close-btn").addEventListener("click", closeItemModal);

modalBackground.addEventListener("click", function (event) {
  if (event.target === modalBackground) {
    closeItemModal();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeItemModal();
  }
});

renderItems();