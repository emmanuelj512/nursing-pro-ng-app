const SUPABASE_URL = "https://wcwgegnylgwnylaaijzp.supabase.co";
const SUPABASE_KEY = "sb_publishable_gwH7Qocg-atzoNAJlnK4ZA_KSaDSJp-";

const SESSION_KEY = "nursingProSession";

// DISPLAY STUDENT NAME
function displayStudent(user) {
    const welcome = document.getElementById("studentWelcome");

    if (welcome && user) {
        const name =
            user.user_metadata?.full_name ||
            user.email?.split("@")[0] ||
            "Nursing Student";

        welcome.textContent = `Welcome, ${name}! 👋`;
    }
}

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
        alert("Password must contain at least 8 characters.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
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
                    password,
                    data: {
                        full_name: fullName.trim()
                    }
                })
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.msg || result.message || "Registration failed."
            );
        }

        if (result.session) {
            localStorage.setItem(
                SESSION_KEY,
                JSON.stringify(result.session)
            );
            displayStudent(result.user);
            alert(`Welcome to Nursing Pro NG, ${fullName}!`);
        } else {
            alert(
                "Account created! Please check your email and confirm your account before logging in."
            );
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
                    password
                })
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.msg || result.message || "Login failed."
            );
        }

        localStorage.setItem(
            SESSION_KEY,
            JSON.stringify(result)
        );

        displayStudent(result.user);

        alert("Welcome back to Nursing Pro NG!");

    } catch (error) {
        alert(error.message);
    }
}

// RESTORE LOGIN SESSION
async function restoreSession() {
    const savedSession = localStorage.getItem(SESSION_KEY);

    if (!savedSession) return;

    try {
        const session = JSON.parse(savedSession);

        const response = await fetch(
            `${SUPABASE_URL}/auth/v1/user`,
            {
                headers: {
                    "apikey": SUPABASE_KEY,
                    "Authorization": `Bearer ${session.access_token}`
                }
            }
        );

        if (!response.ok) {
            localStorage.removeItem(SESSION_KEY);
            return;
        }

        const user = await response.json();
        displayStudent(user);

    } catch (error) {
        console.log("Session restoration error:", error);
    }
}

// PAGE BUTTONS
document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("signupBtn")
        ?.addEventListener("click", signup);

    document.getElementById("loginBtn")
        ?.addEventListener("click", login);

    document.getElementById("startLearning")
        ?.addEventListener("click", function () {
            document.getElementById("dashboard")
                ?.scrollIntoView({ behavior: "smooth" });
        });

    document.getElementById("menuBtn")
        ?.addEventListener("click", function () {
            alert("Nursing Pro NG menu");
        });

    document.querySelectorAll(".open-btn").forEach(button => {
        button.addEventListener("click", function () {
            const feature = this.dataset.feature || "This feature";
            alert(feature + " is coming soon!");
        });
    });

    restoreSession();
});

// OFFLINE SUPPORT
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker.register("./service-worker.js")
            .catch(error => console.log(error));
    });
}
