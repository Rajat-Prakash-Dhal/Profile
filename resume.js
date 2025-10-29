document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initScrollTop();
    initSmoothScroll();
    initNavbarScroll();
    initThemeToggle();
});

function initScrollAnimations() {
    const sections = document.querySelectorAll('[data-animate]');

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}

function initScrollTop() {
    const scrollTopBtn = document.getElementById('scrollTop');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

function initThemeToggle() {
    const savedTheme = localStorage.getItem('resume-theme');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }

    const themeToggleBtn = document.createElement('button');
    themeToggleBtn.className = 'theme-toggle';
    themeToggleBtn.setAttribute('aria-label', 'Toggle theme');
    themeToggleBtn.innerHTML = '<span class="iconify" data-icon="mdi:theme-light-dark"></span>';

    const style = document.createElement('style');
    style.textContent = `
        .theme-toggle {
            position: fixed;
            bottom: 6rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            background: var(--accent-color);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: var(--transition-smooth);
            box-shadow: var(--shadow-medium);
            z-index: 999;
        }

        .theme-toggle:hover {
            background: var(--hover-color);
            transform: translateY(-3px) rotate(180deg);
        }

        .theme-toggle .iconify {
            font-size: 1.5rem;
        }

        body.dark-theme {
            --bg-color: #1a1a1a;
            --text-color: #e0e0e0;
            --accent-color: #64b5f6;
            --hover-color: #42a5f5;
            --card-bg: rgba(40, 40, 40, 0.7);
        }

        body.dark-theme .navbar {
            background: rgba(26, 26, 26, 0.95);
        }

        body.dark-theme .navbar.scrolled {
            background: rgba(26, 26, 26, 0.98);
        }

        @media (max-width: 768px) {
            .theme-toggle {
                bottom: 5rem;
                right: 1rem;
                width: 45px;
                height: 45px;
            }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(themeToggleBtn);

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('resume-theme', isDark ? 'dark' : 'light');

        themeToggleBtn.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggleBtn.style.transform = '';
        }, 300);
    });
}

const animateOnHover = () => {
    const skillCategories = document.querySelectorAll('.skill-category');

    skillCategories.forEach(category => {
        category.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });

        category.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
};

window.addEventListener('load', () => {
    animateOnHover();

    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.style.opacity = '0';
        setTimeout(() => {
            heroSection.style.transition = 'opacity 1s ease-out';
            heroSection.style.opacity = '1';
        }, 100);
    }
});

document.querySelectorAll('.contact-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.contact-icon');
        if (icon) {
            icon.style.transform = 'rotate(360deg) scale(1.2)';
            icon.style.transition = 'transform 0.5s ease';
        }
    });

    item.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.contact-icon');
        if (icon) {
            icon.style.transform = '';
        }
    });
});

const addParallaxEffect = () => {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-name, .hero-title');

        parallaxElements.forEach((el, index) => {
            const speed = (index + 1) * 0.1;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
};

addParallaxEffect();

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const scrollTopBtn = document.getElementById('scrollTop');
        if (scrollTopBtn.classList.contains('visible')) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
});
