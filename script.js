/* =====================================
   NURSING PRO NG
   MAIN APPLICATION SCRIPT
===================================== */

const SUPABASE_URL = "https://wcwgegnylgwnylaaijzp.supabase.co";

const SUPABASE_KEY = "sb_publishable_gwH7Qocg-atzoNAJlnK4ZA_KSaDSJp-";

const SESSION_KEY = "nursingProSession";

/* =====================================
   COURSE MATERIALS
===================================== */

const courses = {

    "Fundamentals of Nursing": [
        "Introduction to Nursing",
        "History of Nursing",
        "Nursing Principles",
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
        "Rights of Medication Administration",
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
        "Sexual Health",
        "Reproductive Health Education"
    ],

    "Mental Health Nursing": [
        "Introduction to Mental Health",
        "Mental Health Assessment",
        "Stress and Anxiety",
        "Depression",
        "Psychiatric Nursing",
        "Therapeutic Communication",
        "Mental Health Promotion"
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
        "Balanced Diet",
        "Nutritional Assessment"
    ],

    "Psychology & Sociology": [
        "Introduction to Psychology",
        "Human Behaviour",
        "Personality",
        "Emotions",
        "Growth and Development",
        "Social Interaction",
        "Psychology in Nursing"
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
   STUDENT WELCOME MESSAGE
===================================== */

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


/* =====================================
   STUDENT REGISTRATION
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
                "Registration failed."
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
                "Account created! Check your email and confirm your account before logging in."
            );
        }

    } catch (error) {

        alert(error.message);
    }
}


/* =====================================
   STUDENT LOGIN
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

                body
