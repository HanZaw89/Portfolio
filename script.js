document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const flexCards = document.querySelectorAll('.fade-in');
    
    const cardAppearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    flexCards.forEach(card => {
        cardAppearOnScroll.observe(card);
    });

    // Mouse tracking glass glow effect
    document.querySelectorAll('.glass-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Global tracking for background parallax (Mouse & Touch)
    const blobsContainer = document.querySelector('.blobs-container');
    let targetX = 0;
    let targetY = 0;
    let isTicking = false;

    const updateParallax = () => {
        if (blobsContainer) {
            blobsContainer.style.setProperty('--global-mouse-x', targetX);
            blobsContainer.style.setProperty('--global-mouse-y', targetY);
        }
        isTicking = false;
    };

    const requestParallaxUpdate = (nx, ny) => {
        targetX = nx;
        targetY = ny;
        if (!isTicking) {
            requestAnimationFrame(updateParallax);
            isTicking = true;
        }
    };

    // Desktop: Mouse tracking
    document.addEventListener('mousemove', e => {
        const nx = (e.clientX / window.innerWidth - 0.5) * 2;
        const ny = (e.clientY / window.innerHeight - 0.5) * 2;
        requestParallaxUpdate(nx, ny);
    });

    // Mobile: Gyroscope (Device Orientation) tracking for 60fps true parallax
    window.addEventListener('deviceorientation', e => {
        if (e.gamma !== null && e.beta !== null) {
            // e.gamma is left-to-right tilt in degrees (-90 to 90)
            // e.beta is front-to-back tilt in degrees (-180 to 180)

            // Normalize tilt values roughly between -1 and 1
            const nx = Math.max(-1, Math.min(1, e.gamma / 45)); 
            
            // Assume 45 degress resting angle for phone (beta is usually 30-60 when holding phone).
            const ny = Math.max(-1, Math.min(1, (e.beta - 45) / 45));
            
            requestParallaxUpdate(nx, ny);
        }
    }, true);

    // Back to top button functionality
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
