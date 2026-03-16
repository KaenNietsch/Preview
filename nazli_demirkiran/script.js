// ═══════════════════════════════════════════════
// NAZLI DEMIRKIRAN - ULTRA PREMIUM LANDING PAGE
// JavaScript - Animations & Interactions
// ═══════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function () {

    // ─── LUCIDE ICONS ───────────────────────────
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // ─── PRELOADER ──────────────────────────────
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 800);
        }, 1200);
    });

    // Fallback: hide preloader after 3s max
    setTimeout(() => {
        if (preloader && !preloader.classList.contains('fade-out')) {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 800);
        }
    }, 3000);

    // ─── NAVBAR SCROLL ──────────────────────────
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    function handleScroll() {
        const scrollY = window.scrollY;

        // Navbar background
        if (scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button
        if (scrollY > 600) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Back to top click
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ─── PARALLAX EFFECT ────────────────────────
    const heroParallax = document.getElementById('heroParallax');

    function handleParallax() {
        const scrollY = window.scrollY;
        if (scrollY < window.innerHeight) {
            const translateY = scrollY * 0.3;
            heroParallax.style.transform = `scale(1.1) translateY(${translateY}px)`;
        }
    }

    window.addEventListener('scroll', handleParallax, { passive: true });

    // ─── FLOATING PARTICLES ─────────────────────
    const particlesContainer = document.getElementById('particles');

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 4 + 1;
        const left = Math.random() * 100;
        const duration = Math.random() * 8 + 6;
        const delay = Math.random() * 4;
        const isGold = Math.random() > 0.5;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.background = isGold
            ? 'rgba(201, 169, 110, 0.6)'
            : 'rgba(183, 110, 121, 0.4)';
        particle.style.boxShadow = isGold
            ? '0 0 6px rgba(201, 169, 110, 0.4)'
            : '0 0 6px rgba(183, 110, 121, 0.3)';
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;

        particlesContainer.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, (duration + delay) * 1000);
    }

    // Create initial particles
    for (let i = 0; i < 20; i++) {
        setTimeout(createParticle, i * 300);
    }

    // Continue creating particles
    setInterval(createParticle, 800);

    // ─── SCROLL REVEAL ──────────────────────────
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const delay = entry.target.style.animationDelay || '0s';
                    const delayMs = parseFloat(delay) * 1000;

                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                    }, delayMs);

                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
        }
    );

    revealElements.forEach((el) => revealObserver.observe(el));

    // ─── COUNTER ANIMATION ──────────────────────
    const counters = document.querySelectorAll('.counter');

    const counterObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000;
                    const startTime = performance.now();

                    function updateCounter(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);

                        // Easing function (ease-out)
                        const eased = 1 - Math.pow(1 - progress, 3);
                        const current = Math.floor(eased * target);

                        counter.textContent = current.toLocaleString('tr-TR') + '+';

                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target.toLocaleString('tr-TR') + '+';
                        }
                    }

                    requestAnimationFrame(updateCounter);
                    counterObserver.unobserve(counter);
                }
            });
        },
        { threshold: 0.5 }
    );

    counters.forEach((counter) => counterObserver.observe(counter));

    // ─── MOBILE MENU ────────────────────────────
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileNavLinks.forEach((link) => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ─── SMOOTH SCROLL FOR NAV LINKS ────────────
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        });
    });

    // ─── ACTIVE NAV LINK ────────────────────────
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        const scrollY = window.scrollY + 200;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach((link) => {
                    link.classList.remove('text-accent');
                    link.classList.add('text-cream/70');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('text-accent');
                        link.classList.remove('text-cream/70');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });

    // ─── CONTACT FORM ───────────────────────────
    const contactForm = document.getElementById('contactForm');

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
            btn.classList.add('form-success');

            setTimeout(() => {
                btn.innerHTML = originalContent;
                btn.disabled = false;
                btn.classList.remove('form-success');
                contactForm.reset();
                // Re-init lucide icons for the button
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            }, 3000);
        }, 1500);
    });

    // ─── STAR ANIMATION ON SCROLL ───────────────
    const starElements = document.querySelectorAll('.star-animate');
    const starObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                } else {
                    entry.target.style.animationPlayState = 'paused';
                }
            });
        },
        { threshold: 0.5 }
    );

    starElements.forEach((star) => {
        star.style.animationPlayState = 'paused';
        starObserver.observe(star);
    });

    // ─── CURSOR GLOW (Desktop Only) ────────────
    if (window.matchMedia('(pointer: fine)').matches) {
        const glow = document.createElement('div');
        glow.style.cssText = `
            position: fixed;
            width: 300px;
            height: 300px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(201,169,110,0.04) 0%, transparent 70%);
            pointer-events: none;
            z-index: 9998;
            transform: translate(-50%, -50%);
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(glow);

        document.addEventListener('mousemove', (e) => {
            glow.style.left = `${e.clientX}px`;
            glow.style.top = `${e.clientY}px`;
        });
    }
});