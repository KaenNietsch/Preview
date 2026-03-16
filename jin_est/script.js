// ═══════════════════════════════════════════════════════════
// JÎN-EST BEAUTY CENTER - Ultra Premium Interactions
// ═══════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function () {

    // ── Initialize Lucide Icons ──
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // ── Image Lazy Load with Fade ──
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => img.classList.add('loaded'));
            img.addEventListener('error', () => img.classList.add('loaded'));
        }
    });

    // ── Navbar Scroll Effect ──
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    function handleNavbar() {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    }

    window.addEventListener('scroll', handleNavbar, { passive: true });

    // ── Parallax Hero ──
    const heroParallax = document.getElementById('hero-parallax');

    function handleParallax() {
        if (!heroParallax) return;
        const scrolled = window.pageYOffset;
        const heroHeight = window.innerHeight;
        if (scrolled < heroHeight) {
            const translateY = scrolled * 0.35;
            const opacity = 1 - (scrolled / heroHeight) * 0.5;
            heroParallax.style.transform = `scale(1.1) translateY(${translateY}px)`;
            heroParallax.style.opacity = opacity;
        }
    }

    window.addEventListener('scroll', handleParallax, { passive: true });

    // ── Scroll Reveal ──
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ── Star Animation on Scroll ──
    const starContainers = document.querySelectorAll('.star-container');

    const starObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stars = entry.target.querySelectorAll('.star-animate');
                stars.forEach(star => {
                    star.style.animationPlayState = 'running';
                });
            }
        });
    }, { threshold: 0.5 });

    starContainers.forEach(container => {
        const stars = container.querySelectorAll('.star-animate');
        stars.forEach(star => {
            star.style.animationPlayState = 'paused';
        });
        starObserver.observe(container);
    });

    // ── Mobile Menu ──
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    function openMobileMenu() {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', openMobileMenu);
    }

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // ── Smooth Scroll for Anchor Links ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ── Contact Form Handler ──
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const btn = this.querySelector('button[type="submit"]');
            const originalContent = btn.innerHTML;

            btn.innerHTML = `
                <span class="relative z-10 flex items-center justify-center gap-3">
                    <svg class="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Gönderiliyor...
                </span>
            `;
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = `
                    <span class="relative z-10 flex items-center justify-center gap-3">
                        <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        Mesajınız Alındı!
                    </span>
                `;
                btn.style.backgroundColor = '#4ade80';
                btn.style.color = '#0D0D0D';

                setTimeout(() => {
                    btn.innerHTML = originalContent;
                    btn.disabled = false;
                    btn.style.backgroundColor = '';
                    btn.style.color = '';
                    contactForm.reset();

                    // Re-init lucide icons for the button
                    if (typeof lucide !== 'undefined') {
                        lucide.createIcons();
                    }
                }, 3000);
            }, 1500);
        });
    }

    // ── Cursor Glow Effect on Service Cards ──
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            const glow = card.querySelector('.absolute.-top-20');
            if (glow) {
                glow.style.left = `${x - 80}px`;
                glow.style.top = `${y - 80}px`;
            }
        });
    });

    // ── Animate Numbers (for potential counter sections) ──
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            element.textContent = Math.floor(eased * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // ── Performance: Throttle scroll events ──
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    console.log('%c✨ Jîn-est Beauty Center', 'color: #C9A96E; font-size: 16px; font-weight: bold; font-family: "Playfair Display", serif;');
    console.log('%cGüzelliğin zarafetle buluştuğu eşsiz nokta', 'color: #A89F95; font-size: 11px; font-family: "Inter", sans-serif;');
});