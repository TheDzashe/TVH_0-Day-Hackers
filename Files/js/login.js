function goBack() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = 'index.html';
    }
}

// Optional: Keyboard shortcut (Esc key)
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') goBack();
});

// --- Hash function (must match signup) ---
function hashPassword(password) {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
        hash = (hash << 5) - hash + password.charCodeAt(i);
        hash |= 0;
    }
    return hash.toString();
}

// --- Handle Login ---
function handleLogin() {
    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value;

    // Validation
    if (!email || !password) {
        alert("⚠️ Please enter both email and password.");
        return false;
    }

    if (password.length < 6) {
        alert("⚠️ Password must be at least 6 characters long.");
        return false;
    }

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || {};

    // Check if user exists
    if (!users[email]) {
        alert("⚠️ No account found with this email.");
        return false;
    }

    // Check password
    if (users[email].password !== hashPassword(password)) {
        alert("⚠️ Incorrect password.");
        return false;
    }

    // Store current user email for session usage
    localStorage.setItem('currentUser', email);

    // Redirect based on plan
    const plan = users[email].plan || 'free';
    if (plan === 'free') {
        window.location.href = 'freePlan.html';
    } else if (plan === 'premium') {
        window.location.href = 'premiumPlan.html';
    }

    return false;
}

// --- Forgot Password ---
function resetPassword(event) {
    event.preventDefault();

    const email = prompt("Enter your email to reset password:").trim().toLowerCase();
    if (!email) return;

    const users = JSON.parse(localStorage.getItem('users')) || {};
    if (!users[email]) {
        alert("⚠️ No account found with this email.");
        return;
    }

    let newPassword = prompt("Enter new password (min 6 characters):");
    if (!newPassword || newPassword.length < 6) {
        alert("⚠️ Password must be at least 6 characters long.");
        return;
    }

    users[email].password = hashPassword(newPassword);
    localStorage.setItem('users', JSON.stringify(users));

    alert("✅ Password reset successfully! You can now log in with the new password.");
}

// --- Social login (demo only) ---
const plan = users[email].plan || 'free'; // default to free if somehow missing
if (plan === 'free') {
    window.location.href = 'freePlan.html';
} else if (plan === 'premium') {
    window.location.href = 'premiumPlan.html';
}


// --- Attach event listeners ---
document.addEventListener('DOMContentLoaded', function() {
    // Enter key triggers login
    const formFields = document.querySelectorAll('.login-form input');
    formFields.forEach(field => {
        field.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleLogin();
            }
        });
    });

    // Social buttons
    const googleBtn = document.querySelector('.google-btn');
    const facebookBtn = document.querySelector('.facebook-btn');
    if (googleBtn) googleBtn.addEventListener('click', () => handleSocialLogin('Google'));
    if (facebookBtn) facebookBtn.addEventListener('click', () => handleSocialLogin('Facebook'));

    // Forgot password link
    const forgotLink = document.querySelector('.forgot-password');
    if (forgotLink) forgotLink.addEventListener('click', resetPassword);
});
