document.addEventListener('DOMContentLoaded', function() {
    // ================== CAROUSEL ==================
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.feature-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.carousel-dots');

    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth + 30;
    let visibleCards = window.innerWidth >= 992 ? 3 : window.innerWidth >= 768 ? 2 : 1;

    // Create dots
    for (let i = 0; i < Math.ceil(cards.length / visibleCards); i++) {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => moveToSlide(i));
        dotsContainer.appendChild(dot);
    }
    const dots = document.querySelectorAll('.carousel-dot');

    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * cardWidth * visibleCards}px)`;
        updateDots();
    }
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    function moveToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }
    nextBtn.addEventListener('click', () => {
        if (currentIndex < Math.ceil(cards.length / visibleCards) - 1) {
            currentIndex++;
            updateCarousel();
        }
    });
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
    window.addEventListener('resize', () => {
        const newVisibleCards = window.innerWidth >= 992 ? 3 : window.innerWidth >= 768 ? 2 : 1;
        if (newVisibleCards !== visibleCards) {
            visibleCards = newVisibleCards;
            currentIndex = 0;
            updateCarousel();
        }
    });
    updateCarousel();

    // ================== SECTION NAVIGATION ==================
    const navLinks = document.querySelectorAll('.nav-menu a');
const sections = document.querySelectorAll('section');

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');

        if (targetId.startsWith('#')) {
            // Special handling: scroll only for sponsors & contact
            if (targetId === '#sponsors-section' || targetId === '#contact-section') {
                // Let browser do smooth scroll (prevent hide/show)
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                return; // stop here
            }

            // Otherwise (home/about) → use hide/show system
            e.preventDefault();

            sections.forEach(sec => sec.classList.remove('active-section'));

            const target = document.querySelector(targetId);
            if (target) {
                target.classList.add('active-section');
            }

            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        }
    });
});
});
