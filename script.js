document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    const header = document.querySelector('header');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            const isOpen = navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', String(isOpen));
        });

        navItems.forEach(function (item) {
            item.addEventListener('click', function () {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                }
            });
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    const sections = document.querySelectorAll('main section');
    const navLi = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', function () {
        let current = '';

        sections.forEach(function (section) {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(function (li) {
            li.classList.toggle('active', li.getAttribute('href') === '#' + current);
        });
    });

    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up" aria-hidden="true"></i>';
    scrollTopBtn.classList.add('scroll-top-btn');
    scrollTopBtn.setAttribute('aria-label', 'Back to top');
    scrollTopBtn.setAttribute('type', 'button');
    document.body.appendChild(scrollTopBtn);

    Object.assign(scrollTopBtn.style, {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: 'var(--primary-color)',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        display: 'none',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
        transition: 'all 0.3s ease',
        zIndex: '999'
    });

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.display = 'flex';
            scrollTopBtn.style.opacity = '1';
        } else {
            scrollTopBtn.style.opacity = '0';
            setTimeout(function () {
                if (window.pageYOffset <= 300) {
                    scrollTopBtn.style.display = 'none';
                }
            }, 300);
        }
    });

    scrollTopBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const projectCards = document.querySelectorAll('.project-card');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        projectCards.forEach(function (card) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
        });

        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return rect.top <= window.innerHeight && rect.bottom >= 0;
        }

        function animateProjectCards() {
            projectCards.forEach(function (card) {
                if (isInViewport(card)) {
                    setTimeout(function () {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    }, 200);
                }
            });
        }

        window.addEventListener('scroll', animateProjectCards);
        setTimeout(animateProjectCards, 500);
    }
});