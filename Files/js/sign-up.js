function goBack() {
    // Check if there's a previous page in history
    if (window.history.length > 1) {
        window.history.back();
    } else {
        // If no history, redirect to login page
        window.location.href = 'login.html';
    }
}

// Optional: Add keyboard shortcut (Esc key) to go back
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        goBack();
    }
});

// --- Simple hash function (for demo purposes only, not secure for production) ---
function hashPassword(password) {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
        hash = (hash << 5) - hash + password.charCodeAt(i);
        hash |= 0; // Convert to 32bit int
    }
    return hash.toString();
}

// --- Handle Signup ---
function handleSignup() {
    const businessName = document.getElementById('business-name').value.trim();
    const fullName = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim().toLowerCase();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const termsAccepted = document.getElementById('terms').checked;

    // ✅ Validation
    if (!businessName || !fullName || !email || !phone || !password || !confirmPassword) {
        alert("⚠️ Please fill in all fields.");
        return false;
    }

    // ✅ Password length check
    if (password.length < 6) {
        alert("⚠️ Password must be at least 6 characters long.");
        return false;
    }

    if (password !== confirmPassword) {
        alert("⚠️ Passwords do not match.");
        return false;
    }

    if (!termsAccepted) {
        alert("⚠️ You must agree to the Terms & Conditions.");
        return false;
    }

    // ✅ Get existing users from localStorage
    let users = JSON.parse(localStorage.getItem("users")) || {};

    // ✅ Check if email already exists
    if (users[email]) {
        alert("⚠️ This email is already registered. Please log in instead.");
        return false;
    }

    // ✅ Save new user
    users[email] = {
        businessName,
        fullName,
        email,
        phone,
        password: hashPassword(password),
        plan: 'free', // first-time users automatically get free plan
        createdAt: new Date().toISOString()
    };

    localStorage.setItem("users", JSON.stringify(users));

    alert("✅ Account created successfully! You can now log in.");
    window.location.href = "login.html"; // redirect to login
    return false;
}

// --- Handle Social Signup (demo only) ---
function handleSocialSignup(provider) {
    console.log(`${provider} signup clicked`);
    alert(`${provider} signup not implemented yet. Redirecting...`);
    window.location.href = 'index.html'; // redirect to homepage
}


document.addEventListener('DOMContentLoaded', function() {
    // Enter key triggers signup
    const formFields = document.querySelectorAll('.login-form input');
    formFields.forEach(field => {
        field.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSignup();
            }
        });
    });

    // Attach social buttons (✅ will now find them in your HTML)
    const googleBtn = document.querySelector('.google-btn');
    const facebookBtn = document.querySelector('.facebook-btn');

    if (googleBtn) {
        googleBtn.addEventListener('click', function() {
            handleSocialSignup('Google');
        });
    }

    if (facebookBtn) {
        facebookBtn.addEventListener('click', function() {
            handleSocialSignup('Facebook');
        });
    }
});

