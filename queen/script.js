// ═══════════════════════════════════════════
// QUEEN GÜZELLIK MERKEZI - PREMIUM INTERACTIONS
// ═══════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function () {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // ═══════════════════════════════════════════
    // NAVBAR SCROLL EFFECT
    // ═══════════════════════════════════════════
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('back-to-top');

    function handleScroll() {
        const scrollY = window.scrollY;

        // Navbar background
        if (scrollY > 50) {
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
    if (backToTop) {
        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ═══════════════════════════════════════════
    // MOBILE MENU
    // ═══════════════════════════════════════════
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu on link click
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // ═══════════════════════════════════════════
    // PARALLAX EFFECT
    // ═══════════════════════════════════════════
    const heroParallax = document.getElementById('hero-parallax');

    function handleParallax() {
        if (heroParallax && window.innerWidth > 768) {
            const scrollY = window.scrollY;
            const speed = 0.4;
            heroParallax.style.transform = 'translateY(' + (scrollY * speed) + 'px)';
        }
    }

    window.addEventListener('scroll', handleParallax, { passive: true });

    // ═══════════════════════════════════════════
    // SCROLL REVEAL (Intersection Observer)
    // ═══════════════════════════════════════════
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    // Add delay based on animation-delay class
                    const el = entry.target;
                    let delay = 0;

                    if (el.classList.contains('animation-delay-100')) delay = 100;
                    if (el.classList.contains('animation-delay-200')) delay = 200;
                    if (el.classList.contains('animation-delay-400')) delay = 400;
                    if (el.classList.contains('animation-delay-600')) delay = 600;

                    setTimeout(function () {
                        el.classList.add('revealed');
                    }, delay);

                    revealObserver.unobserve(el);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
        }
    );

    revealElements.forEach(function (el) {
        revealObserver.observe(el);
    });

    // ═══════════════════════════════════════════
    // COUNTER ANIMATION
    // ═══════════════════════════════════════════
    const counters = document.querySelectorAll('[data-counter]');

    const counterObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseFloat(el.getAttribute('data-counter'));
                    const isDecimal = target % 1 !== 0;
                    const duration = 2000;
                    const startTime = performance.now();

                    function updateCounter(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);

                        // Easing function (ease-out cubic)
                        const eased = 1 - Math.pow(1 - progress, 3);
                        const current = eased * target;

                        if (isDecimal) {
                            el.textContent = current.toFixed(1);
                        } else {
                            el.textContent = Math.floor(current).toLocaleString('tr-TR') + '+';
                        }

                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        }
                    }

                    requestAnimationFrame(updateCounter);
                    counterObserver.unobserve(el);
                }
            });
        },
        { threshold: 0.5 }
    );

    counters.forEach(function (counter) {
        counterObserver.observe(counter);
    });

    // ═══════════════════════════════════════════
    // FLOATING PARTICLES
    // ═══════════════════════════════════════════
    const particlesContainer = document.getElementById('particles');

    function createParticle() {
        if (!particlesContainer) return;

        const particle = document.createElement('div');
        particle.classList.add('particle');

        const x = Math.random() * 100;
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 8 + 6;
        const delay = Math.random() * 4;

        particle.style.left = x + '%';
        particle.style.bottom = '-10px';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = delay + 's';

        particlesContainer.appendChild(particle);

        // Remove particle after animation
        setTimeout(function () {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, (duration + delay) * 1000);
    }

    // Create initial particles
    for (let i = 0; i < 20; i++) {
        createParticle();
    }

    // Continuously create particles
    setInterval(createParticle, 800);

    // ═══════════════════════════════════════════
    // CONTACT FORM
    // ═══════════════════════════════════════════
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const btn = contactForm.querySelector('button[type="submit"]');
            const originalHTML = btn.innerHTML;

            btn.innerHTML = '<span class="relative z-10 flex items-center justify-center gap-2"><svg class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Gönderiliyor...</span>';
            btn.disabled = true;

            setTimeout(function () {
                btn.innerHTML = '<span class="relative z-10 flex items-center justify-center gap-2"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>Başarıyla Gönderildi!</span>';

                setTimeout(function () {
                    btn.innerHTML = originalHTML;
                    btn.disabled = false;
                    contactForm.reset();

                    // Re-initialize Lucide icons for the button
                    if (typeof lucide !== 'undefined') {
                        lucide.createIcons();
                    }
                }, 2500);
            }, 1500);
        });
    }

    // ═══════════════════════════════════════════
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ═══════════════════════════════════════════
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth',
                });
            }
        });
    });
});