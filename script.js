// NURSING PRO NG
// Main application functionality

document.addEventListener("DOMContentLoaded", function () {

  const startButton = document.getElementById("startLearning");
  const dashboard = document.getElementById("dashboard");

  // Start learning button
  if (startButton && dashboard) {
    startButton.addEventListener("click", function () {
      dashboard.scrollIntoView({
        behavior: "smooth"
      });
    });
  }

  // Learning module buttons
  const featureButtons = document.querySelectorAll(".open-btn");

  featureButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const feature = button.getAttribute("data-feature");

      alert(
        feature + " is coming soon!\n\n" +
        "We are preparing this learning module for Nursing Pro NG."
      );
    });
  });

  // Registration button
  const signupButton = document.getElementById("signupBtn");

  if (signupButton) {
    signupButton.addEventListener("click", function () {
      alert(
        "Account registration is coming soon!\n\n" +
        "We will connect Nursing Pro NG to its online database."
      );
    });
  }

  // Login button
  const loginButton = document.getElementById("loginBtn");

  if (loginButton) {
    loginButton.addEventListener("click", function () {
      alert(
        "Login is coming soon!\n\n" +
        "Your personal learning account will be available soon."
      );
    });
  }

  // Mobile menu
  const menuButton = document.getElementById("menuBtn");

  if (menuButton) {
    menuButton.addEventListener("click", function () {
      alert("Welcome to Nursing Pro NG!");
    });
  }

  console.log("Nursing Pro NG successfully loaded!");

});
