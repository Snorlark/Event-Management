document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.querySelector('.cursor');
    const slides = document.querySelectorAll('.debuts-carousel .slides img');
    const dots = document.querySelectorAll('.dot');
    const slidesContainer = document.querySelector('.debuts-carousel .slides');
    let currentIndex = 0;

    document.addEventListener('mousemove', function(e) {
        cursor.style.top = e.pageY + 'px';
        cursor.style.left = e.pageX + 'px';
    });

    const revealElements = document.querySelectorAll('.reveal');

    revealElements.forEach(element => {
        element.addEventListener('mouseover', function() {
            cursor.classList.add('reveal-grow');
        });
        element.addEventListener('mouseout', function() {
            cursor.classList.remove('reveal-grow');
        });
    });

    window.addEventListener('scroll', function() {
        revealElements.forEach(element => {
            var revealTop = element.getBoundingClientRect().top;
            var revealPoint = 150;
            var windowHeight = window.innerHeight;

            if (revealTop < windowHeight - revealPoint) {
                element.classList.add('active');
            } else {
                element.classList.remove('active');
            }
        });
    });

    function showSlide(index) {
        const offset = -index * 100;
        slidesContainer.style.transform = `translateX(${offset}%)`;
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    }

    function currentSlide(index) {
        currentIndex = index;
        showSlide(currentIndex);
    }

    let isDragging = false;
    let startX = 0;

    const carousel = document.querySelector('.debuts-carousel');
    carousel.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX;
        carousel.classList.add('dragging');
    });

    carousel.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const x = e.pageX;
            const walk = (x - startX) * 3;
            carousel.scrollLeft -= walk;
            startX = x;
        }
    });

    carousel.addEventListener('mouseup', () => {
        isDragging = false;
        carousel.classList.remove('dragging');
    });

    carousel.addEventListener('mouseleave', () => {
        isDragging = false;
        carousel.classList.remove('dragging');
    });

    showSlide(currentIndex);

    document.querySelector('.left').addEventListener('click', prevSlide);
    document.querySelector('.right').addEventListener('click', nextSlide);
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => currentSlide(index));
    });
});
