/* =====================================
   NURSING PRO NG
   MAIN APPLICATION
===================================== */

const SUPABASE_URL = "https://wcwgegnylgwnylaaijzp.supabase.co";

const SUPABASE_KEY = "sb_publishable_gwH7Qocg-atzoNAJlnK4ZA_KSaDSJp-";

const SESSION_KEY = "nursingProSession";


/* =====================================
   DISPLAY STUDENT
===================================== */

function displayStudent(user) {

    const welcome = document.getElementById("studentWelcome");

    if (!welcome || !user) return;

    const name =
        user.user_metadata?.full_name ||
        user.email?.split("@")[0] ||
        "Nursing Student";

    welcome.textContent = `Welcome, ${name}! 👋`;
}


/* =====================================
   SIGN UP
===================================== */

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
                    password: password,
                    data: {
                        full_name: fullName.trim()
                    }
                })
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.msg ||
                result.message ||
                result.error_description ||
                "Registration failed."
            );
        }

        if (result.session && result.user) {

            localStorage.setItem(
                SESSION_KEY,
                JSON.stringify(result.session)
            );

            displayStudent(result.user);

            alert(`Welcome to Nursing Pro NG, ${fullName}!`);

        } else {

            alert(
                "Account created successfully! Please check your email and confirm your account before logging in."
            );
        }

    } catch (error) {

        alert(error.message);

    }
}


/* =====================================
   LOGIN
===================================== */

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
            throw new Error(
                result.msg ||
                result.message ||
                result.error_description ||
                "Login failed."
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


/* =====================================
   LOGOUT
===================================== */

function logout() {

    const confirmLogout = confirm(
        "Are you sure you want to log out?"
    );

    if (!confirmLogout) return;

    localStorage.removeItem(SESSION_KEY);

    const welcome = document.getElementById("studentWelcome");

    if (welcome) {
        welcome.textContent = "Welcome, Nursing Student! 👋";
    }

    alert("You have logged out successfully.");

}


/* =====================================
   RESTORE LOGIN SESSION
===================================== */

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


/* =====================================
   COURSE MATERIALS
===================================== */

const courses = {

    "Fundamentals of Nursing": [
        "Introduction to Nursing",
        "History of Nursing",
        "Principles of Nursing",
        "Nursing Process",
        "Vital Signs",
        "Patient Hygiene",
        "Infection Prevention"
    ],

    "Anatomy & Physiology": [
        "Introduction to Anatomy",
        "Cells and Tissues",
        "Skeletal System",
        "Muscular System",
        "Cardiovascular System",
        "Respiratory System",
        "Digestive System",
        "Urinary System",
        "Nervous System"
    ],

    "Pharmacology": [
        "Introduction to Pharmacology",
        "Classification of Drugs",
        "Pharmacokinetics",
        "Pharmacodynamics",
        "Routes of Drug Administration",
        "Medication Administration Rights",
        "Drug Calculations",
        "Drug Interactions"
    ],

    "Medical-Surgical Nursing": [
        "Introduction to Medical-Surgical Nursing",
        "Patient Assessment",
        "Respiratory Disorders",
        "Cardiovascular Disorders",
        "Digestive Disorders",
        "Renal Disorders",
        "Diabetes Mellitus",
        "Nursing Care Plans"
    ],

    "Community Health Nursing": [
        "Introduction to Community Health",
        "Community Assessment",
        "Disease Prevention",
        "Health Promotion",
        "Immunization",
        "Environmental Health",
        "Home Visits"
    ],

    "Primary Health Care": [
        "Meaning of Primary Health Care",
        "Principles of PHC",
        "Elements of PHC",
        "Community Participation",
        "Health Education",
        "Immunization",
        "Referral System"
    ],

    "Foundation of Nursing": [
        "Concept of Nursing",
        "Nursing Theories",
        "Professional Ethics",
        "Communication in Nursing",
        "Patient Rights",
        "Nursing Responsibilities"
    ],

    "Nursing Research": [
        "Introduction to Nursing Research",
        "Research Problems",
        "Research Questions",
        "Research Designs",
        "Data Collection",
        "Research Ethics",
        "Research Reports"
    ],

    "Statistics & Biostatistics": [
        "Introduction to Statistics",
        "Types of Data",
        "Data Presentation",
        "Mean, Median and Mode",
        "Range and Standard Deviation",
        "Basic Probability"
    ],

    "Reproductive Health": [
        "Introduction to Reproductive Health",
        "Male Reproductive System",
        "Female Reproductive System",
        "Menstrual Cycle",
        "Family Planning",
        "Sexual Health"
    ],

    "Mental Health Nursing": [
        "Introduction to Mental Health",
        "Mental Health Assessment",
        "Stress and Anxiety",
        "Depression",
        "Psychiatric Nursing",
        "Therapeutic Communication"
    ],

    "Paediatric Nursing": [
        "Introduction to Paediatric Nursing",
        "Growth and Development",
        "Newborn Care",
        "Child Assessment",
        "Paediatric Vital Signs",
        "Common Childhood Illnesses",
        "Emergency Paediatric Care"
    ],

    "Emergency Nursing": [
        "Introduction to Emergency Nursing",
        "Triage",
        "Primary Survey",
        "Basic Life Support",
        "Shock",
        "Emergency Assessment",
        "Trauma Nursing"
    ],

    "Nutrition & Dietetics": [
        "Introduction to Nutrition",
        "Classes of Nutrients",
        "Carbohydrates",
        "Proteins",
        "Fats and Oils",
        "Vitamins and Minerals",
        "Balanced Diet"
    ],

    "Psychology & Sociology": [
        "Introduction to Psychology",
        "Human Behaviour",
        "Personality",
        "Emotions",
        "Growth and Development",
        "Social Interaction"
    ],

    "Maternal & Newborn Nursing": [
        "Introduction to Maternal Nursing",
        "Antenatal Care",
        "Stages of Labour",
        "Normal Delivery",
        "Postnatal Care",
        "Newborn Assessment",
        "Breastfeeding"
    ]

};


/* =====================================
   OPEN COURSE
===================================== */

function openCourse(courseName) {

    const lessons = courses[courseName];

    if (!lessons) {

        alert("Course materials are being prepared.");

        return;
    }

    const lessonList = lessons
        .map((lesson, index) => `${index + 1}. ${lesson}`)
        .join("\n");

    alert(
        courseName +
        "\n\nCOURSE CONTENT\n\n" +
        lessonList +
        "\n\nDetailed lessons will be added next."
    );

}


/* =====================================
   PAGE BUTTONS
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    // SIGN UP BUTTON

    document.getElementById("signupBtn")
        ?.addEventListener("click", signup);


    // LOGIN BUTTON

    document.getElementById("loginBtn")
        ?.addEventListener("click", login);


    // START LEARNING BUTTON

    document.getElementById("startLearning")
        ?.addEventListener("click", function () {

            document.getElementById("dashboard")
                ?.scrollIntoView({
                    behavior: "smooth"
                });

        });


    // MENU BUTTON

    document.getElementById("menuBtn")
        ?.addEventListener("click", function () {

            alert("Welcome to Nursing Pro NG!");

        });


    // COURSE BUTTONS

    document.querySelectorAll(".open-btn")
        .forEach(button => {

            button.addEventListener("click", function () {

                openCourse(this.dataset.feature);

            });

        });


    // SUBSCRIPTION BUTTONS

    document.querySelectorAll(".subscription-btn")
        .forEach(button => {

            button.addEventListener("click", function () {

                alert(
                    "Subscription payment is not yet available. No payment will be collected."
                );

            });

        });


    // ADMIN BUTTON

    document.getElementById("adminBtn")
        ?.addEventListener("click", function () {

            alert("Admin dashboard is under development.");

        });


    // RESTORE SESSION

    restoreSession();

});


/* =====================================
   OFFLINE SUPPORT
===================================== */

if ("serviceWorker" in navigator) {

    window.addEventListener("load", function () {

        navigator.serviceWorker.register("./service-worker.js")

            .catch(error => {

                console.log("Offline support error:", error);

            });

    });

}
