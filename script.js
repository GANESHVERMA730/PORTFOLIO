document.addEventListener('DOMContentLoaded', function () {
    const dynamicText = document.querySelector('.dynamic-text');
    const professions = [
        'web developer',
        'app developer',
        'video editor',
        'data analyst'
    ];
    let professionIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isEnd = false;

    function typeWriter() {
        isEnd = false;
        const currentProfession = professions[professionIndex];

        if (isDeleting) {
            dynamicText.textContent = currentProfession.substring(0, charIndex - 1);
            charIndex--;
        } else {
            dynamicText.textContent = currentProfession.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentProfession.length) {
            isEnd = true;
            isDeleting = true;
            setTimeout(typeWriter, 1500);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            professionIndex = (professionIndex + 1) % professions.length;
            setTimeout(typeWriter, 500);
        } else {
            const typingSpeed = isDeleting ? 100 : 150;
            setTimeout(typeWriter, typingSpeed);
        }
    }

    // Start the animation
    setTimeout(typeWriter, 1000);

    // MOBILE MENU TOGGLE
    function toggleMenu() {
        const navLinks = document.getElementById("nav-links");
        navLinks.classList.toggle("active");
    }
});

// Hamburger menu functionality
document.addEventListener('DOMContentLoaded', function () {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const mobileNav = document.getElementById('mobileNav');
    const menuOverlay = document.getElementById('menuOverlay');

    hamburgerMenu.addEventListener('click', function () {
        this.classList.toggle('open');
        mobileNav.classList.toggle('open');
        menuOverlay.classList.toggle('open');

        // Toggle body scroll when menu is open
        if (mobileNav.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    menuOverlay.addEventListener('click', function () {
        hamburgerMenu.classList.remove('open');
        mobileNav.classList.remove('open');
        this.classList.remove('open');
        document.body.style.overflow = '';
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.mobile-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            hamburgerMenu.classList.remove('open');
            mobileNav.classList.remove('open');
            menuOverlay.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
});

// contact form starts
// Form validation and submission
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.querySelector('.form-status');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const message = document.getElementById('message');

        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        formStatus.style.display = 'none';

        // Validation
        let isValid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name.value.trim()) {
            name.nextElementSibling.textContent = 'Name is required';
            isValid = false;
        }
        if (!email.value.trim()) {
            email.nextElementSibling.textContent = 'Email is required';
            isValid = false;
        } else if (!emailRegex.test(email.value.trim())) {
            email.nextElementSibling.textContent = 'Enter a valid email';
            isValid = false;
        }
        if (!message.value.trim()) {
            message.nextElementSibling.textContent = 'Message is required';
            isValid = false;
        } else if (message.value.trim().length < 10) {
            message.nextElementSibling.textContent = 'Message must be at least 10 characters';
            isValid = false;
        }

        if (!isValid) {
            formStatus.textContent = 'Please fix the errors above.';
            formStatus.className = 'form-status error';
            formStatus.style.display = 'block';
            return;
        }

        // Show sending...
        formStatus.textContent = 'Sending...';
        formStatus.className = 'form-status';
        formStatus.style.display = 'block';

        const formData = new FormData(contactForm);

        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    formStatus.textContent = 'Message sent successfully!';
                    formStatus.className = 'form-status success';
                    contactForm.reset();
                } else {
                    formStatus.textContent = 'Failed to send. Please try again later.';
                    formStatus.className = 'form-status error';
                }
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
            })
            .catch(() => {
                formStatus.textContent = 'Server error. Please try again.';
                formStatus.className = 'form-status error';
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
            });
    });
    // contact section ends

    // Clear errors while typing
    contactForm.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', function () {
            this.nextElementSibling.textContent = '';
            formStatus.style.display = 'none';
        });
    });
});
// contact form ends


// footer section starts.......
// Circular Back to Top Button
const circleBackToTop = document.getElementById('circleBackToTop');

// Show/hide back to top button based on scroll position
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        circleBackToTop.classList.add('visible');
    } else {
        circleBackToTop.classList.remove('visible');
    }
});

circleBackToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Update copyright year dynamically
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Scroll progress indicator
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});