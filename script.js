// ======================================
// NURSING PRO NG - MAIN JAVASCRIPT
// ======================================

// SUPABASE CONNECTION
const SUPABASE_URL = "https://wcwgegnylgwnylaaijzp.supabase.co";

const SUPABASE_KEY = "sb_publishable_gwH7Qocg-atzoNAJlnK4ZA_KSaDSJp-";

let supabaseClient = null;

// Load Supabase
async function connectSupabase() {
    try {
        const { createClient } = await import(
            "https://esm.sh/@supabase/supabase-js@2"
        );

        supabaseClient = createClient(
            SUPABASE_URL,
            SUPABASE_KEY
        );

        console.log("Supabase connected successfully!");
    } catch (error) {
        console.error("Supabase connection error:", error);
        alert("Unable to connect. Please check your internet connection.");
    }
}

// ======================================
// CREATE ACCOUNT
// ======================================

async function signup() {

    if (!supabaseClient) {
        alert("Please wait. Connecting to Nursing Pro NG...");
        return;
    }

    const email = prompt("Enter your email address:");

    if (!email) return;

    const password = prompt("Create a password (at least 6 characters):");

    if (!password) return;

    if (password.length < 6) {
        alert("Your password must contain at least 6 characters.");
        return;
    }

    const { data, error } = await supabaseClient.auth.signUp({
        email: email.trim(),
        password: password
    });

    if (error) {
        alert("Registration failed: " + error.message);
        return;
    }

    alert(
        "Account created successfully! Check your email for a confirmation link if requested."
    );
}

// ======================================
// LOGIN
// ======================================

async function login() {

    if (!supabaseClient) {
        alert("Please wait. Connecting to Nursing Pro NG...");
        return;
    }

    const email = prompt("Enter your registered email:");

    if (!email) return;

    const password = prompt("Enter your password:");

    if (!password) return;

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email.trim(),
        password: password
    });

    if (error) {
        alert("Login failed: " + error.message);
        return;
    }

    alert("Welcome back to Nursing Pro NG!");

    console.log("User logged in:", data.user.email);
}

// ======================================
// START LEARNING
// ======================================

document.getElementById("startLearning")?.addEventListener("click", function () {
    document.getElementById("dashboard")?.scrollIntoView({
        behavior: "smooth"
    });
});

// ======================================
// SIGN UP BUTTON
// ======================================

document.getElementById("signupBtn")?.addEventListener("click", signup);

// ======================================
// LOGIN BUTTON
// ======================================

document.getElementById("loginBtn")?.addEventListener("click", login);

// ======================================
// LEARNING MODULES
// ======================================

document.querySelectorAll(".open-btn").forEach(button => {

    button.addEventListener("click", function () {

        const feature = this.getAttribute("data-feature");

        alert(
            feature + " will be available soon on Nursing Pro NG!"
        );

    });

});

// ======================================
// MENU BUTTON
// ======================================

document.getElementById("menuBtn")?.addEventListener("click", function () {

    alert("Welcome to Nursing Pro NG!");

});

// ======================================
// OFFLINE SUPPORT
// ======================================

if ("serviceWorker" in navigator) {

    window.addEventListener("load", function () {

        navigator.serviceWorker.register("./service-worker.js")
            .then(() => console.log("Offline support activated."))
            .catch(error => console.log("Offline support error:", error));

    });

}

// ======================================
// START APPLICATION
// ======================================

connectSupabase();
