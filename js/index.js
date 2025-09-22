document.addEventListener('DOMContentLoaded', function() {
    // Carousel functionality
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.feature-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth + 30; // width + gap
    const visibleCards = window.innerWidth >= 992 ? 3 : window.innerWidth >= 768 ? 2 : 1;
    
    // Create dots
    for (let i = 0; i < Math.ceil(cards.length / visibleCards); i++) {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => moveToSlide(i));
        dotsContainer.appendChild(dot);
    }
    
    const dots = document.querySelectorAll('.carousel-dot');
    
    // Update carousel position
    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * cardWidth * visibleCards}px)`;
        updateDots();
    }
    
    // Update active dot
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Move to specific slide
    function moveToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }
    
    // Next slide
    nextBtn.addEventListener('click', () => {
        if (currentIndex < Math.ceil(cards.length / visibleCards) - 1) {
            currentIndex++;
            updateCarousel();
        }
    });
    
    // Previous slide
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const newVisibleCards = window.innerWidth >= 992 ? 3 : window.innerWidth >= 768 ? 2 : 1;
        if (newVisibleCards !== visibleCards) {
            currentIndex = 0;
            updateCarousel();
        }
    });
    
    // Initialize carousel
    updateCarousel();
});

