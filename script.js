const SUPABASE_URL = "https://wcwgegnylgwnylaaijzp.supabase.co";
const SUPABASE_KEY = "sb_publishable_gwH7Qocg-atzoNAJlnK4ZA_KSaDSJp-";

const SESSION_KEY = "nursingProSession";

// SIGN UP
async function signup() {
    const fullName = prompt("Enter your full name:");
    if (!fullName || !fullName.trim()) return;

    const email = prompt("Enter your email address:");
    if (!email || !email.trim()) return;

    const password = prompt("Create your password (minimum 8 characters):");
    if (!password) return;

    const confirmPassword = prompt("Confirm your password:");
    if (!confirmPassword) return;

    if (password.length < 8) {
        alert("Your password must contain at least 8 characters.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Your passwords do not match.");
        return;
    }

    try {
        const response = await fetch(
            `${SUPABASE_URL}/auth/v1/signup`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "apikey": SUPABASE_KEY
                },
                body: JSON.stringify({
                    email: email.trim(),
                    password: password,
                    data: {
                        full_name: fullName.trim()
                    }
                })
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.msg || result.message || result.error_description || "Registration failed.");
        }

        if (result.session) {
            localStorage.setItem(SESSION_KEY, JSON.stringify(result.session));
            alert(`Welcome to Nursing Pro NG, ${fullName}!`);
        } else {
            alert("Your account has been created. Please check your email to confirm your account before logging in.");
        }

    } catch (error) {
        alert(error.message);
    }
}

// LOGIN
async function login() {
    const email = prompt("Enter your email address:");
    if (!email || !email.trim()) return;

    const password = prompt("Enter your password:");
    if (!password) return;

    try {
        const response = await fetch(
            `${SUPABASE_URL}/auth/v1/token?grant_type=password`,
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
            throw new Error(result.msg || result.message || result.error_description || "Login failed.");
        }

        if (result.session || result.access_token) {
            localStorage.setItem(SESSION_KEY, JSON.stringify(result));
        }

        alert("Welcome back to Nursing Pro NG!");

    } catch (error) {
        alert(error.message);
    }
}

// PAGE BUTTONS
document.addEventListener("DOMContentLoaded", function () {

    const signupBtn = document.getElementById("signupBtn");
    const loginBtn = document.getElementById("loginBtn");
    const startLearning = document.getElementById("startLearning");
    const menuBtn = document.getElementById("menuBtn");

    if (signupBtn) {
        signupBtn.addEventListener("click", signup);
    }

    if (loginBtn) {
        loginBtn.addEventListener("click", login);
    }

    if (startLearning) {
        startLearning.addEventListener("click", function () {
            document.getElementById("dashboard")?.scrollIntoView({
                behavior: "smooth"
            });
        });
    }

    if (menuBtn) {
        menuBtn.addEventListener("click", function () {
            alert("Nursing Pro NG menu");
        });
    }

    // MODULE BUTTONS
    document.querySelectorAll(".open-btn").forEach(button => {
        button.addEventListener("click", function () {
            const feature = this.dataset.feature || "This feature";

            alert(feature + " is coming soon!");
        });
    });

});

// OFFLINE SUPPORT
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker.register("./service-worker.js")
            .catch(error => console.log("Offline support error:", error));
    });
    }
