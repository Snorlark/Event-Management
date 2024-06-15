document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.querySelector('.cursor');

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

    const setupCarousel = (carouselSelector, dotSelector, intervalTime = 3000) => {
        let count = 1;
        let customChange = false;

        const sliding = (x) => {
            const left = `-${x * 100}%`;
            const allSlide = document.querySelector(carouselSelector).querySelectorAll('img');
            const allDots = document.querySelector(dotSelector).querySelectorAll('div');

            allSlide.forEach((element) => {
                element.style.transition = 'transform 0.6s ease-in-out';
                element.style.transform = `translateX(${left})`;
            });

            allDots.forEach((dots) => {
                dots.style.transform = 'scale(1)';
                dots.style.opacity = '50%';
            });

            allDots[x].style.transition = 'transform 0.6s ease-in-out, opacity 0.6s ease-in-out';
            allDots[x].style.transform = 'scale(1.5)';
            allDots[x].style.opacity = '100%';
        };

        const leftSwipe = () => {
            customChange = true;
            setTimeout(() => { customChange = false; }, 2000);
            if (count === 1) {
                sliding(document.querySelector(carouselSelector).querySelectorAll('img').length - 1);
                count = document.querySelector(carouselSelector).querySelectorAll('img').length;
            } else {
                count -= 1;
                sliding(count - 1);
            }
        };

        const rightSwipe = () => {
            customChange = true;
            setTimeout(() => { customChange = false; }, 2000);
            if (count === document.querySelector(carouselSelector).querySelectorAll('img').length) {
                sliding(0);
                count = 1;
            } else {
                sliding(count);
                count += 1;
            }
        };

        document.querySelectorAll('.left').forEach(btn => {
            btn.addEventListener('click', leftSwipe);
        });

        document.querySelectorAll('.right').forEach(btn => {
            btn.addEventListener('click', rightSwipe);
        });

        document.querySelectorAll(carouselSelector).forEach(carousel => {
            carousel.addEventListener('pointerdown', (e) => {
                const initX = e.clientX;
                carousel.addEventListener('pointerup', (up) => {
                    const finalX = up.clientX;
                    if (finalX - initX > 0) {
                        leftSwipe();
                    } else {
                        rightSwipe();
                    }
                });
            });
        });
    };

    // Setup carousels for different sections
    setupCarousel('.debuts-carousel', '.dots');
    setupCarousel('.events-carousel', '.events-dots');
    setupCarousel('.weddings-carousel', '.weddings-dots');

    // Modal functionality for portfolio images
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("img01");

    // Get all portfolio images
    const portfolioImages = document.querySelectorAll(".portfolio-container img");

    // Loop through each portfolio image and attach click event
    portfolioImages.forEach((img, index) => {
        img.onclick = function() {
            modal.style.display = "block";
            modalImg.src = this.src;
            modalImg.alt = this.alt; // Optional: Set alt text as caption
        }
    });

    // Get the <span> element that closes the modal
    const span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() { 
        modal.style.display = "none";
    }
});
