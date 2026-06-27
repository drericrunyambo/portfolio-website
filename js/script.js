document.addEventListener('DOMContentLoaded', () => {
    // Dark Mode Toggle
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const body = document.body;

    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        darkModeToggle.classList.add('active');
    }

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        darkModeToggle.classList.toggle('active');

        // Save preference
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animated Statistics Counters
    const statsSection = document.querySelector('.hero .stats');
    let statsAnimated = false;

    const animateNumbers = () => {
        if (statsAnimated) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumbers = document.querySelectorAll('.stat-number');
                    statNumbers.forEach((span, index) => {
                        const text = span.textContent;
                        const target = parseInt(text.replace(/[^0-9]/g, ''));
                        let current = 0;
                        const increment = target / 100;
                        const duration = 2000; // 2 seconds
                        const startTime = Date.now();

                        const updateCounter = () => {
                            const elapsed = Date.now() - startTime;
                            const progress = Math.min(elapsed / duration, 1);
                            current = Math.floor(target * progress);

                            if (text.includes('+')) {
                                span.textContent = current + '+';
                            } else {
                                span.textContent = current;
                            }

                            if (progress < 1) {
                                requestAnimationFrame(updateCounter);
                            } else {
                                span.textContent = text; // Ensure final value is correct
                            }
                        };
                        updateCounter();
                    });
                    statsAnimated = true;
                    observer.disconnect();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(statsSection);
    };

    animateNumbers();

    // Scroll Reveal Animations
    const scrollElements = document.querySelectorAll('section:not(#home)');

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <=
            (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
        });
    };

    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // Initial check for elements in view on page load
    handleScrollAnimation();

    // Language Progress Bars Animation
    const languageSection = document.querySelector('.languages');
    let languageBarsAnimated = false;

    const animateLanguageBars = () => {
        if (languageBarsAnimated) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.querySelectorAll('.progress').forEach((bar, index) => {
                        const width = bar.style.width;
                        bar.style.width = '0%'; // Reset for animation
                        setTimeout(() => {
                            bar.style.transition = 'width 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
                            bar.style.width = width;
                        }, 100 + (index * 150));
                    });
                    languageBarsAnimated = true;
                    observer.disconnect();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(languageSection);
    };

    animateLanguageBars();

    // Add hover effects to skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add hover effects to education cards
    const educationCards = document.querySelectorAll('.education-card');
    educationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add hover effects to reference cards
    const referenceCards = document.querySelectorAll('.reference-card');
    referenceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

  // Contact Icons Interaction
    const contactIcons = document.querySelectorAll('.contact-icons i');
    contactIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const iconClass = this.className;
            if (iconClass.includes('email')) {
                // Open email client
                window.location.href = 'mailto:inezarunyambo@gmail.com';
            } else if (iconClass.includes('phone')) {
                // Open phone dialer
                window.location.href = 'tel:+250788507246';
            } else if (iconClass.includes('linkedin')) {
                // Open LinkedIn profile
                window.open('www.linkedin.com/in/dr-runyambo-eric-57a469419', '_blank');
            } else if (iconClass.includes('whatsapp')) {
                // Open WhatsApp
                window.open('https://wa.me/+250788507246', '_blank');
            }
        });
    });


   // Download CV Button
  const downloadCVButton = document.querySelector('.hero-buttons .btn:first-child');

if (downloadCVButton) {
    downloadCVButton.addEventListener('click', function(e) {
        e.preventDefault();

        const link = document.createElement('a');
       window.open('assets/DR_ERIC_CV.pdf', '_blank');
        link.download = 'Dr_Runyambo_Eric_CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}

    // Contact Button
    const contactButton = document.querySelector('.hero-buttons .btn:last-child');
    if (contactButton) {
        contactButton.addEventListener('click', function() {
            document.querySelector('#contact').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    // Add scroll effect to header
    let lastScrollTop = 0;
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            // Scrolling down
            header.style.boxShadow = '0 8px 32px rgba(0,0,0,0.15)';
        } else {
            // Scrolling up
            header.style.boxShadow = '0 8px 32px rgba(0,0,0,0.1)';
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // Add animation to timeline items on scroll
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.5 });

    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'all 0.6s ease-out';
        timelineObserver.observe(item);
    });

    // Parallax effect on hero section
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        const heroSection = document.querySelector('.hero');
        if (heroSection && scrollPosition < window.innerHeight) {
            heroSection.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
        }
    });
});
