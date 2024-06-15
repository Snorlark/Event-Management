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

    var count = 1;
    var customChange = false;

    const sliding = (x)=>{
        var left = `-${x * 100}%`;
        var allSlide = document.querySelector('.debuts-carousel').querySelectorAll('img');
        var allDots = document.querySelector('.dots').querySelectorAll('div');

        allSlide.forEach((element)=>{
            element.style.left = left;
        })

        allDots.forEach((dots)=>{
            dots.style.transform = 'scale(1)';
            dots.style.opacity = '50%';
        });
        allDots[x].style.transition = '0.6s';
        allDots[x].style.transform = 'scale(1.5)';
        allDots[x].style.opacity = '100%';

    }

    setInterval(()=>{
        if(customChange != true) {
            if(count == 3) {
                sliding(0);
            }
            else {
                sliding(count);
                count += 1;
            }
        }
    }, 3000)

    const leftSwipe = () => {
        customChange = true;
        setTimeout(() => {customChange = false}, 2000);
        if (count == 1) {
            sliding(2);
            count = 3;
        }
        else {
            count -= 1;
            sliding(count-1);
        }
    }

    const rightSwipe = () => {
        customChange = true;
        setTimeout(() => {customChange = false}, 2000);
        if (count == 3) {
            sliding(0);
            count = 1;
        }
        else {
            sliding(count);
            count += 1;
        }
    }

    document.querySelector('.left').addEventListener('click', leftSwipe);
    document.querySelector('.right').addEventListener('click', rightSwipe);

    document.querySelector('.debuts-carousel').addEventListener('pointerdown', (e) => {
        var initX = e.clientX;
        document.querySelector('.debuts-carousel').addEventListener('pointerup', (up) => {
            var finalX = up.clientX;
            if (finalX - initX > 0) {
                leftSwipe();
            } else {
                rightSwipe();
            }
        });
    });
});
