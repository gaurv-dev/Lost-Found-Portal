
function formatDate(dateString) {
  var dateObject = new Date(dateString);
  return dateObject.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

function renderSummaryCards() {
  var pendingClaimsReceived = claimsOnMyItems.filter(function (claim) {
    return claim.status === "pending";
  }).length;

  var summaryRow = document.getElementById("summary-row");

  summaryRow.innerHTML =
    buildSummaryCard(myReportedItems.length, "Items reported") +
    buildSummaryCard(claimsIMade.length, "Claims I made") +
    buildSummaryCard(claimsOnMyItems.length, "Claims on my items") +
    buildSummaryCard(pendingClaimsReceived, "Waiting for my response");
}

function buildSummaryCard(number, label) {
  return (
    '<div class="summary-card">' +
      '<span class="summary-number">' + number + "</span>" +
      '<span class="summary-label">' + label + "</span>" +
    "</div>"
  );
}

document.getElementById("dashboard-tabs").addEventListener("click", function (event) {
  var clickedTab = event.target.closest(".dashboard-tab");
  if (!clickedTab) return;

  var allTabs = document.querySelectorAll(".dashboard-tab");
  allTabs.forEach(function (tab) {
    tab.classList.remove("active");
  });
  clickedTab.classList.add("active");

  var allPanels = document.querySelectorAll(".tab-panel");
  allPanels.forEach(function (panel) {
    panel.hidden = true;
  });

  var selectedTab = clickedTab.dataset.tab;
  document.getElementById("panel-" + selectedTab).hidden = false;
});

function renderMyItems() {
  var listContainer = document.getElementById("my-items-list");
  var emptyMessage = document.getElementById("my-items-empty");

  if (myReportedItems.length === 0) {
    listContainer.hidden = true;
    emptyMessage.hidden = false;
    return;
  }

  listContainer.hidden = false;
  emptyMessage.hidden = true;
  listContainer.innerHTML = "";

  for (var i = 0; i < myReportedItems.length; i++) {
    var item = myReportedItems[i];

    var row = document.createElement("div");
    row.className = "item-row";

    row.innerHTML =
      '<div class="item-row-main">' +
        '<span class="item-row-status ' + item.status + '">' + item.status + "</span>" +
        "<div>" +
          '<p class="item-row-title">' + item.title + "</p>" +
          '<p class="item-row-meta">' + item.category + " - " + item.location + " - " + formatDate(item.date) + "</p>" +
        "</div>" +
      "</div>" +
      '<span class="item-row-claims">' + item.claimCount + " claim(s)</span>";

    listContainer.appendChild(row);
  }
}

function renderClaimsIMade() {
  var listContainer = document.getElementById("claims-made-list");
  var emptyMessage = document.getElementById("claims-made-empty");

  if (claimsIMade.length === 0) {
    listContainer.hidden = true;
    emptyMessage.hidden = false;
    return;
  }

  listContainer.hidden = false;
  emptyMessage.hidden = true;
  listContainer.innerHTML = "";

  for (var i = 0; i < claimsIMade.length; i++) {
    var claim = claimsIMade[i];

    var row = document.createElement("div");
    row.className = "claim-row";

    row.innerHTML =
      "<div>" +
        '<p class="claim-row-title">' + claim.itemTitle + "</p>" +
        '<p class="claim-row-meta">' + claim.itemLocation + " - claimed on " + formatDate(claim.dateClaimed) + "</p>" +
      "</div>" +
      '<span class="claim-status-tag ' + claim.status + '">' + claim.status + "</span>";

    listContainer.appendChild(row);
  }
}

function renderClaimsReceived() {
  var listContainer = document.getElementById("claims-received-list");
  var emptyMessage = document.getElementById("claims-received-empty");

  if (claimsOnMyItems.length === 0) {
    listContainer.hidden = true;
    emptyMessage.hidden = false;
    return;
  }

  listContainer.hidden = false;
  emptyMessage.hidden = true;
  listContainer.innerHTML = "";

  for (var i = 0; i < claimsOnMyItems.length; i++) {
    var claim = claimsOnMyItems[i];

    var row = document.createElement("div");
    row.className = "claim-row";

    var actionButtonsHtml = "";

    if (claim.status === "pending") {
      actionButtonsHtml =
        '<div class="claim-row-actions">' +
          '<button type="button" class="btn btn-ghost btn-small" data-action="reject" data-claim-id="' + claim.id + '">Reject</button>' +
          '<button type="button" class="btn btn-gold btn-small" data-action="approve" data-claim-id="' + claim.id + '">Approve</button>' +
        "</div>";
    } else {
      actionButtonsHtml = '<span class="claim-status-tag ' + claim.status + '">' + claim.status + "</span>";
    }

    row.innerHTML =
      "<div>" +
        '<p class="claim-row-title">' + claim.itemTitle + "</p>" +
        '<p class="claim-row-meta">Claimed by ' + claim.claimantName + " on " + formatDate(claim.dateClaimed) + "</p>" +
      "</div>" +
      actionButtonsHtml;

    listContainer.appendChild(row);
  }
}

var confirmModalBackground = document.getElementById("confirm-modal-background");
var pendingAction = null;

document.getElementById("claims-received-list").addEventListener("click", function (event) {
  var clickedButton = event.target.closest("button[data-action]");
  if (!clickedButton) return;

  var claimId = Number(clickedButton.dataset.claimId);
  var action = clickedButton.dataset.action;

  pendingAction = { claimId: claimId, action: action };

  var claim = findClaimById(claimId);
  var modalTitle = document.getElementById("confirm-modal-title");
  var modalText = document.getElementById("confirm-modal-text");

  if (action === "approve") {
    modalTitle.textContent = "Approve this claim?";
    modalText.textContent = "You are about to approve " + claim.claimantName + "'s claim on \"" + claim.itemTitle + "\".";
  } else {
    modalTitle.textContent = "Reject this claim?";
    modalText.textContent = "You are about to reject " + claim.claimantName + "'s claim on \"" + claim.itemTitle + "\".";
  }

  confirmModalBackground.classList.add("open");
});

function findClaimById(claimId) {
  for (var i = 0; i < claimsOnMyItems.length; i++) {
    if (claimsOnMyItems[i].id === claimId) {
      return claimsOnMyItems[i];
    }
  }
  return null;
}

document.getElementById("confirm-modal-cancel").addEventListener("click", function () {
  pendingAction = null;
  confirmModalBackground.classList.remove("open");
});

document.getElementById("confirm-modal-confirm").addEventListener("click", function () {
  if (!pendingAction) return;

  var claim = findClaimById(pendingAction.claimId);

  if (pendingAction.action === "approve") {
    claim.status = "approved";
  } else {
    claim.status = "rejected";
  }

  pendingAction = null;
  confirmModalBackground.classList.remove("open");

  renderClaimsReceived();
  renderSummaryCards();
});

confirmModalBackground.addEventListener("click", function (event) {
  if (event.target === confirmModalBackground) {
    pendingAction = null;
    confirmModalBackground.classList.remove("open");
  }
});

renderSummaryCards();
renderMyItems();
renderClaimsIMade();
renderClaimsReceived();