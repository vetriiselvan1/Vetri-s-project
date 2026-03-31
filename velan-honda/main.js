/**
 * Velan Honda - Main Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       Sticky Navbar
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    
    const checkScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    
    // Check initial scroll position
    checkScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', checkScroll);

    /* ==========================================================================
       Mobile Menu Toggle
       ========================================================================== */
    const toggleBtn = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    const icon = toggleBtn.querySelector('i');

    toggleBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    /* ==========================================================================
       Intersection Observer for Animations
       ========================================================================== */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .slide-up');
    animatedElements.forEach(el => observer.observe(el));

    /* ==========================================================================
       Form Submission Mock
       ========================================================================== */
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Mock submission state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate network request
            setTimeout(() => {
                formStatus.style.color = 'green';
                formStatus.innerText = 'Thank you! Your inquiry has been sent to Velan Honda.';
                contactForm.reset();
                
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
                
                // Clear message after 5 seconds
                setTimeout(() => {
                    formStatus.innerText = '';
                }, 5000);
            }, 1500);
        });
    }

    /* ==========================================================================
       Highlight Active Nav Link
       ========================================================================== */
    const currentPath = window.location.pathname.split('/').pop();
    navLinks.querySelectorAll('a').forEach(link => {
        const linkHref = link.getAttribute('href');
        // If the link href matches the current path exactly, or if it's the home page and empty/index.html
        if (linkHref === currentPath || (currentPath === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else if (linkHref !== 'index.html' && linkHref !== '') {
            // Remove active from others
            link.classList.remove('active');
        }
    });

    // Handle initial state if no exact match (default to Home if on root)
    if (currentPath === '' || currentPath === '/') {
        const homeLink = document.querySelector('.nav-links a[href="index.html"]');
        if(homeLink) homeLink.classList.add('active');
    }
});
