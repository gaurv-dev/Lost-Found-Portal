

var loginForm = document.getElementById("login-form");
var registerForm = document.getElementById("register-form");
var authSuccess = document.getElementById("auth-success");

document.getElementById("auth-tabs").addEventListener("click", function (event) {
  var clickedTab = event.target.closest(".auth-tab");
  if (!clickedTab) return;

  var allTabs = document.querySelectorAll(".auth-tab");
  allTabs.forEach(function (tab) {
    tab.classList.remove("active");
  });
  clickedTab.classList.add("active");

  var selectedTab = clickedTab.dataset.tab;

  if (selectedTab === "login") {
    loginForm.hidden = false;
    registerForm.hidden = true;
  } else {
    loginForm.hidden = true;
    registerForm.hidden = false;
  }
});

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  var email = document.getElementById("login-email").value;
  var password = document.getElementById("login-password").value;
  var errorText = document.getElementById("login-error");

  var emailLooksValid = email.includes("@") && email.includes(".");
  var passwordLooksValid = password.length >= 6;

  if (!emailLooksValid || !passwordLooksValid) {
    errorText.hidden = false;
    return;
  }

  errorText.hidden = true;
  showSuccessMessage("Welcome back", "You're now logged in. Redirecting you to the homepage.");
});

registerForm.addEventListener("submit", function (event) {
  event.preventDefault();

  var name = document.getElementById("register-name").value;
  var email = document.getElementById("register-email").value;
  var password = document.getElementById("register-password").value;
  var confirmPassword = document.getElementById("register-confirm-password").value;
  var errorText = document.getElementById("register-error");

  var emailLooksValid = email.includes("@") && email.includes(".");

  if (!emailLooksValid) {
    errorText.textContent = "Please enter a valid email address.";
    errorText.hidden = false;
    return;
  }

  if (password.length < 6) {
    errorText.textContent = "Password must be at least 6 characters long.";
    errorText.hidden = false;
    return;
  }

  if (password !== confirmPassword) {
    errorText.textContent = "Passwords do not match. Please try again.";
    errorText.hidden = false;
    return;
  }

  errorText.hidden = true;
  showSuccessMessage("Account created, " + name, "Your account is ready. Redirecting you to the homepage.");
});


// ---------------------------------------------------------
// Hides both forms and shows the success message with
// a custom heading and description.
// ---------------------------------------------------------
function showSuccessMessage(heading, message) {
  loginForm.hidden = true;
  registerForm.hidden = true;
  document.getElementById("auth-tabs").hidden = true;

  document.getElementById("success-heading").textContent = heading;
  document.getElementById("success-text").textContent = message;

  authSuccess.hidden = false;
}