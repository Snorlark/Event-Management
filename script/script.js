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
});
