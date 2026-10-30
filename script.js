// NURSING PRO NG
// Main application JavaScript

document.addEventListener("DOMContentLoaded", () => {

  console.log("Nursing Pro NG is ready!");

  // Display a welcome message
  const welcomeMessage = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good morning!";
    if (hour < 18) return "Good afternoon!";
    return "Good evening!";
  };

  // Make learning cards keyboard accessible
  document.querySelectorAll(".card").forEach(card => {
    card.setAttribute("tabindex", "0");
  });

  // Online/offline connection status
  function checkConnection() {
    if (!navigator.onLine) {
      console.log("You are currently offline.");
    } else {
      console.log("You are online.");
    }
  }

  checkConnection();

  window.addEventListener("online", checkConnection);
  window.addEventListener("offline", checkConnection);

  console.log(welcomeMessage() + " Welcome to Nursing Pro NG.");

});
