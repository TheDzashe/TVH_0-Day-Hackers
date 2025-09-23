document.addEventListener('DOMContentLoaded', function() {
            // Simple animation for feature cards on scroll
            const featureCards = document.querySelectorAll('.feature-card');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = 1;
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, { threshold: 0.1 });
            
            featureCards.forEach(card => {
                card.style.opacity = 0;
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                observer.observe(card);
            });
            function handleLogout() {
    // Remove the current user from localStorage
    localStorage.removeItem('currentUser');

    // Optionally, show a message
    alert('✅ You have been logged out successfully.');

    // Redirect to login or homepage
    window.location.href = 'index.html'; // or 'login.html'
}
            
            // Login/signup button functionality
            const loginBtn = document.querySelector('.btn-login');
            
            loginBtn.addEventListener('click', function() {
                alert('Login feature would open here');
            });
        });