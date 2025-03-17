// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    preloader.classList.add('fade-out');
    
    setTimeout(function() {
        preloader.style.display = 'none';
    }, 500);
});

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation handling
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navToggleLabel = document.querySelector('.nav-toggle-label');
    
    // Simple direct toggle for mobile menu
    if (navToggleLabel) {
        navToggleLabel.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle menu visibility with display property
            if (window.getComputedStyle(navMenu).display === 'block') {
                navMenu.style.display = 'none';
            } else {
                navMenu.style.display = 'block';
                navMenu.classList.add('active');
            }
        });
    }
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.style.display = 'none';
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && 
            window.getComputedStyle(navMenu).display === 'block' && 
            !navMenu.contains(e.target) && 
            !navToggleLabel.contains(e.target)) {
            navMenu.style.display = 'none';
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navMenu.style.display = '';
        }
    });

    // Scroll animations
    const revealElements = document.querySelectorAll('.section-title, .about-content, .service-card, .testimonial-card, .enquiry-box, .contact-content, .team-card');
    
    // Add reveal class to elements
    revealElements.forEach(element => {
        element.classList.add('reveal');
    });
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
        );
    }
    
    // Reveal elements when scrolled into view
    function revealOnScroll() {
        revealElements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('active');
            }
        });
    }
    
    // Initial check on page load
    revealOnScroll();
    
    // Immediately activate team cards
    document.querySelectorAll('.team-card').forEach(card => {
        card.classList.add('active');
    });
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Button ripple effect
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Handle form submission
    const form = document.querySelector('.enquiry-form form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const inputs = form.querySelectorAll('input, textarea');
            let isValid = true;
            
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.classList.add('invalid');
                    
                    // Add shake animation for invalid fields
                    input.classList.add('shake');
                    setTimeout(() => {
                        input.classList.remove('shake');
                    }, 600);
                } else {
                    input.classList.remove('invalid');
                }
            });
            
            if (isValid) {
                // In a real implementation, you would send data to a server
                alert('फॉर्म सफलतापूर्वक भेजा गया! हम जल्द ही आपसे संपर्क करेंगे।');
                form.reset();
            } else {
                alert('कृपया सभी आवश्यक फ़ील्ड भरें।');
            }
        });
    }

    // Testimonial slider functionality
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        const slider = document.querySelector('.testimonial-slider');
        if (slider && testimonialCards.length > 0) {
            const cardWidth = testimonialCards[0].offsetWidth + 32; // Adding the gap
            slider.scrollTo({
                left: cardWidth * index,
                behavior: 'smooth'
            });
        }
    }

    // Auto-slide testimonials every 5 seconds
    if (testimonialCards.length > 1) {
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }

    // Disable zoom on input focus for iOS
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
        viewportMeta.content = 'width=device-width, initial-scale=1, maximum-scale=1';
    }
});

// Add touch feedback for buttons and links
document.addEventListener('touchstart', function() {}, false); 