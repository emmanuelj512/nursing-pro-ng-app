// NURSING PRO NG

document.addEventListener("DOMContentLoaded", function () {

  // Start Learning
  const startButton = document.getElementById("startLearning");
  const dashboard = document.getElementById("dashboard");

  if (startButton && dashboard) {
    startButton.addEventListener("click", function () {
      dashboard.scrollIntoView({ behavior: "smooth" });
    });
  }

  // Learning modules
  document.querySelectorAll(".open-btn").forEach(function (button) {
    button.addEventListener("click", function () {
      alert(button.dataset.feature + " is coming soon!");
    });
  });

  // Registration
  document.getElementById("signupBtn").addEventListener("click", function () {
    alert("Online registration is coming soon!");
  });

  // Login
  document.getElementById("loginBtn").addEventListener("click", function () {
    alert("Online login is coming soon!");
  });

  // Menu
  document.getElementById("menuBtn").addEventListener("click", function () {
    alert("Welcome to Nursing Pro NG!");
  });

  console.log("Nursing Pro NG is ready!");

});

// Offline support
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("./service-worker.js")
      .then(function () {
        console.log("Offline support activated!");
      })
      .catch(function (error) {
        console.log("Offline support error:", error);
      });
  });
    }
