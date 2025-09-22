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

// Handle signup without validation
function handleSignup() {
    // Get form values (but don't validate them)
    const businessName = document.getElementById('business-name').value;
    const fullName = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const termsAccepted = document.getElementById('terms').checked;
    
    console.log('Signup attempt:', { 
        businessName, 
        fullName, 
        email, 
        phone, 
        password, 
        confirmPassword, 
        termsAccepted 
    });
    
    // Redirect to dashboard (or any page you want)
    window.location.href = 'freePlan.html'; // Change to your desired page
    
    // Prevent form submission (since we're handling it with button click)
    return false;
}

// Handle social signup
function handleSocialSignup(provider) {
    console.log(`${provider} signup clicked`);
    // Redirect to dashboard or social signup handler
    window.location.href = 'freePlan.html'; // Change to your desired page
}

// Allow form submission with Enter key (but bypass validation)
document.addEventListener('DOMContentLoaded', function() {
    // Add Enter key support for all form fields
    const formFields = document.querySelectorAll('.login-form input');
    formFields.forEach(field => {
        field.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault(); // Prevent default form submission
                handleSignup();
            }
        });
    });
    
    // Remove required attributes to disable browser validation
    document.getElementById('business-name').removeAttribute('required');
    document.getElementById('fullname').removeAttribute('required');
    document.getElementById('email').removeAttribute('required');
    document.getElementById('phone').removeAttribute('required');
    document.getElementById('password').removeAttribute('required');
    document.getElementById('confirm-password').removeAttribute('required');
    document.getElementById('terms').removeAttribute('required');
    
    // Add click handlers to social buttons
    document.querySelector('.google-btn').addEventListener('click', function() {
        handleSocialSignup('google');
    });
    
    document.querySelector('.facebook-btn').addEventListener('click', function() {
        handleSocialSignup('facebook');
    });
});