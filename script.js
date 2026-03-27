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

    const requestParallaxUpdate = (x, y) => {
        targetX = (x / window.innerWidth - 0.5) * 2;
        targetY = (y / window.innerHeight - 0.5) * 2;
        if (!isTicking) {
            requestAnimationFrame(updateParallax);
            isTicking = true;
        }
    };

    document.addEventListener('mousemove', e => {
        requestParallaxUpdate(e.clientX, e.clientY);
    });

    document.addEventListener('touchmove', e => {
        if (e.touches.length > 0) {
            requestParallaxUpdate(e.touches[0].clientX, e.touches[0].clientY);
        }
    }, { passive: true });

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
