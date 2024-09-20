document.addEventListener('DOMContentLoaded', function() {
    // Gestione del carosello
    const carousel = document.querySelector('.carousel');
    const slides = carousel ? carousel.querySelectorAll('.carousel-slide') : [];
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    let currentSlide = 0;

    function updateCarousel() {
        if (carousel) {
            carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateCarousel();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateCarousel();
    }

    if (prevButton) prevButton.addEventListener('click', prevSlide);
    if (nextButton) nextButton.addEventListener('click', nextSlide);

    // Cambia slide automaticamente ogni 5 secondi
    if (slides.length > 0) {
        setInterval(nextSlide, 5000);
    }

    // Gestione del menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const body = document.body;

    function openMenu() {
        nav.classList.add('open');
        menuToggle.classList.add('active');
        body.classList.add('menu-open');
        
        document.querySelectorAll('nav ul li').forEach((item, index) => {
            item.style.setProperty('--item-index', index);
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 50 * index);
        });
    }

    function closeMenu() {
        nav.classList.remove('open');
        menuToggle.classList.remove('active');
        body.classList.remove('menu-open');
        
        document.querySelectorAll('nav ul li').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(-20px)';
        });
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            if (nav.classList.contains('open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    // Chiudi il menu mobile quando si clicca fuori
    document.addEventListener('click', function(event) {
        if (nav && menuToggle) {
            const isClickInsideNav = nav.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnToggle && nav.classList.contains('open')) {
                closeMenu();
            }
        }
    });

    // Scroll fluido per i link di navigazione
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }

            // Chiudi il menu mobile se aperto
            if (nav.classList.contains('open')) {
                closeMenu();
            }
        });
    });

    // Gestione del widget statistiche
    const statsWidget = document.getElementById('stats-widget');
    const closeWidgetBtn = document.querySelector('.close-widget');
    const reopenWidgetBtn = document.getElementById('reopen-widget');

    function closeWidget() {
        if (statsWidget) statsWidget.classList.add('closed');
        if (reopenWidgetBtn) reopenWidgetBtn.classList.add('visible');
    }

    function openWidget() {
        if (statsWidget) statsWidget.classList.remove('closed');
        if (reopenWidgetBtn) reopenWidgetBtn.classList.remove('visible');
    }

    if (closeWidgetBtn) {
        closeWidgetBtn.addEventListener('click', closeWidget);
    }

    if (reopenWidgetBtn) {
        reopenWidgetBtn.addEventListener('click', openWidget);
    }

    // Aggiorna le statistiche (esempio)
    const activeMembersElement = document.getElementById('active-members');
    if (activeMembersElement) {
        activeMembersElement.textContent = '150';
    }
});