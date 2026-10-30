// =====================================
// NURSING PRO NG
// SUPABASE AUTHENTICATION
// =====================================

const SUPABASE_URL = "https://wcwgegnylgwnylaaijzp.supabase.co";

const SUPABASE_KEY = "sb_publishable_gwH7Qocg-atzoNAJlnK4ZA_KSaDSJp-";

// =====================================
// CREATE ACCOUNT
// =====================================

async function signup() {

    const email = prompt("Enter your email address:");

    if (!email) return;

    const password = prompt("Create a password (minimum 6 characters):");

    if (!password) return;

    if (password.length < 6) {
        alert("Password must contain at least 6 characters.");
        return;
    }

    try {

        const response = await fetch(
            SUPABASE_URL + "/auth/v1/signup",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "apikey": SUPABASE_KEY
                },
                body: JSON.stringify({
                    email: email.trim(),
                    password: password
                })
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.msg || result.message || "Registration failed.");
        }

        alert(
            "Registration successful! Check your email if confirmation is required."
        );

    } catch (error) {

        alert("Registration error: " + error.message);

    }
}

// =====================================
// LOGIN
// =====================================

async function login() {

    const email = prompt("Enter your email address:");

    if (!email) return;

    const password = prompt("Enter your password:");

    if (!password) return;

    try {

        const response = await fetch(
            SUPABASE_URL + "/auth/v1/token?grant_type=password",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "apikey": SUPABASE_KEY
                },
                body: JSON.stringify({
                    email: email.trim(),
                    password: password
                })
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.msg || result.message || "Login failed.");
        }

        localStorage.setItem(
            "nursingProSession",
            JSON.stringify(result)
        );

        alert("Welcome back to Nursing Pro NG!");

    } catch (error) {

        alert("Login error: " + error.message);

    }
}

// =====================================
// BUTTONS
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    const signupButton = document.getElementById("signupBtn");
    const loginButton = document.getElementById("loginBtn");
    const startButton = document.getElementById("startLearning");

    if (signupButton) {
        signupButton.addEventListener("click", signup);
    }

    if (loginButton) {
        loginButton.addEventListener("click", login);
    }

    if (startButton) {
        startButton.addEventListener("click", function () {

            document.getElementById("dashboard")?.scrollIntoView({
                behavior: "smooth"
            });

        });
    }

    document.querySelectorAll(".open-btn").forEach(button => {

        button.addEventListener("click", function () {

            const feature = this.getAttribute("data-feature");

            alert(feature + " is coming soon!");

        });

    });

});

// =====================================
// OFFLINE SUPPORT
// =====================================

if ("serviceWorker" in navigator) {

    window.addEventListener("load", function () {

        navigator.serviceWorker.register("./service-worker.js")
            .catch(error => console.log(error));

    });

}

console.log("Nursing Pro NG loaded successfully!");
