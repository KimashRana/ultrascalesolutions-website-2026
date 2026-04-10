$(document).ready(function() {
    // Color Theme Switching Logic
    const themes = {
        'cyan': { color: '#00f2ff', glow: 'rgba(0, 242, 255, 0.3)' },
        'purple': { color: '#bc13fe', glow: 'rgba(188, 19, 254, 0.3)' },
        'orange': { color: '#ff8c00', glow: 'rgba(255, 140, 0, 0.3)' },
        'green': { color: '#39ff14', glow: 'rgba(57, 255, 20, 0.3)' },
        'red': { color: '#ff3131', glow: 'rgba(255, 49, 49, 0.3)' },
        'pink': { color: '#ff00ff', glow: 'rgba(255, 0, 255, 0.3)' },
        'blue': { color: '#0066ff', glow: 'rgba(0, 102, 255, 0.3)' },
        'gold': { color: '#ffcc00', glow: 'rgba(255, 204, 0, 0.3)' }
    };

    function applyTheme(themeName) {
        const theme = themes[themeName];
        if (theme) {
            document.documentElement.style.setProperty('--accent-blue', theme.color);
            document.documentElement.style.setProperty('--accent-glow', theme.glow);
            
            // Update active state in UI
            $('.theme-dot').removeClass('active');
            $(`.dot-${themeName}`).addClass('active');
            
            // Persist
            localStorage.setItem('ultrascale-theme', themeName);
        }
    }

    // Load persisted theme
    const savedTheme = localStorage.getItem('ultrascale-theme') || 'cyan';
    applyTheme(savedTheme);

    // Event Listener for Theme Dots
    $(document).on('click', '.theme-dot', function() {
        const themeName = $(this).data('theme');
        applyTheme(themeName);
    });

    // Navbar Scroll Effect
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('nav').addClass('scrolled');
        } else {
            $('nav').removeClass('scrolled');
        }
    });

    // 3D Tilt Effect for Service Cards
    const cards = document.querySelectorAll('.service-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', handleHover);
        card.addEventListener('mouseleave', resetTilt);
    });

    function handleHover(e) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }

    function resetTilt(e) {
        const card = e.currentTarget;
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    }

    // Mobile Dropdown Toggle
    $('.dropdown > a').on('click', function(e) {
        if ($(window).width() <= 768) {
            e.preventDefault();
            $(this).siblings('.dropdown-menu').toggleClass('active');
        }
    });

    // Close dropdown when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.dropdown').length) {
            $('.dropdown-menu').removeClass('active');
        }
    });

    // Smooth Scrolling for Nav Links (refined for multi-page)
    $('a[href*="#"]').on('click', function(event) {
        // Only trigger if it's on the same page
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                event.preventDefault();
                $('html, body').stop().animate({
                    scrollTop: target.offset().top - 80
                }, 800);
            }
        }
    });

    // Scroll Revel Animations (Simple implementation)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                $(entry.target).css({
                    'opacity': '1',
                    'transform': 'translateY(0)'
                });
            }
        });
    }, observerOptions);

    $('.service-card, .about-content, .about-image, .sub-hero, .page-section').css({
        'opacity': '0',
        'transform': 'translateY(30px)',
        'transition': 'all 0.8s ease-out'
    }).each(function() {
        observer.observe(this);
    });
});
