// Define some test users
const testUsers = [
    { email: 'lethabo@gmail.com', password: 'pass1', plan: 'free' },
    { email: 'admin@gmail.com', password: 'pass2', plan: 'premium' },
];

function goBack() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = 'index.html';
    }
}

// Optional: Keyboard shortcut (Esc key)
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        goBack();
    }
});

// Handle login simulation
function handleLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Find user in testUsers array
    const user = testUsers.find(u => u.email === email && u.password === password);

    if (user) {
        // Redirect based on user's plan
        if (user.plan === 'free') {
            window.location.href = 'freePlan.html';
        } else if (user.plan === 'premium') {
            window.location.href = 'premiumPlan.html';
        }
    } else {
        alert('Invalid test user credentials');
    }

    return false; // Prevent form submission
}

// Handle social login (optional)
function handleSocialLogin(provider) {
    console.log(`${provider} login clicked`);
    // Redirect to free plan for testing
    window.location.href = 'freePlan.html';
}

// Allow Enter key to submit
document.getElementById('login-btn').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        handleLogin();
    }
});

// Remove required attributes to disable browser validation
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('email').removeAttribute('required');
    document.getElementById('password').removeAttribute('required');
});
