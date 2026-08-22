
var reportForm = document.getElementById("report-form");
var successBox = document.getElementById("success-box");
var itemStatusInput = document.getElementById("item-status");
var locationLabel = document.getElementById("location-label");

document.getElementById("type-buttons").addEventListener("click", function (event) {
  var clickedButton = event.target.closest(".type-btn");
  if (!clickedButton) return;

  var allTypeButtons = document.querySelectorAll(".type-btn");
  allTypeButtons.forEach(function (button) {
    button.classList.remove("active");
  });
  clickedButton.classList.add("active");

  var selectedType = clickedButton.dataset.type;
  itemStatusInput.value = selectedType;

  if (selectedType === "lost") {
    locationLabel.textContent = "Where did you lose it?";
  } else {
    locationLabel.textContent = "Where did you find it?";
  }
});

reportForm.addEventListener("submit", function (event) {
  event.preventDefault();

  var newItem = {
    status: itemStatusInput.value,
    title: document.getElementById("item-title").value,
    category: document.getElementById("item-category").value,
    date: document.getElementById("item-date").value,
    location: document.getElementById("item-location").value,
    description: document.getElementById("item-description").value,
    reporterName: document.getElementById("reporter-name").value,
    reporterEmail: document.getElementById("reporter-email").value
  };

  console.log("New item report:", newItem);

  reportForm.hidden = true;
  successBox.hidden = false;
  successBox.scrollIntoView({ behavior: "smooth" });
});