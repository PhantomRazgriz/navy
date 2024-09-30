document.addEventListener('DOMContentLoaded', function() {
    // Gestione del menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const body = document.body;

    function toggleMenu() {
        nav.classList.toggle('open');
        menuToggle.classList.toggle('active');
        body.classList.toggle('menu-open');
        
        document.querySelectorAll('nav ul li').forEach((item, index) => {
            if (nav.classList.contains('open')) {
                item.style.setProperty('--item-index', index);
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 50 * index);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(-20px)';
            }
        });
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    // Chiudi il menu quando si clicca fuori
    document.addEventListener('click', function(event) {
        const isClickInsideNav = nav.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnToggle && nav.classList.contains('open')) {
            toggleMenu();
        }
    });

    // Gestione della navigazione per i link della navbar
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('index.html#')) {
                e.preventDefault();
                const targetId = href.split('#')[1];
                sessionStorage.setItem('scrollTarget', targetId);
                window.location.href = 'index.html';
            }

            // Chiudi il menu mobile se aperto
            if (nav.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

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

    // Gestione del widget statistiche
    const statsWidget = document.getElementById('stats-widget');
    const closeWidgetBtn = document.querySelector('.close-widget');
    const reopenWidgetBtn = document.getElementById('reopen-widget');

    function closeWidget() {
        if (statsWidget) {
            statsWidget.classList.add('closed');
            if (reopenWidgetBtn) reopenWidgetBtn.classList.add('visible');
        }
    }

    function openWidget() {
        if (statsWidget) {
            statsWidget.classList.remove('closed');
            if (reopenWidgetBtn) reopenWidgetBtn.classList.remove('visible');
        }
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
        activeMembersElement.textContent = '21';
    }

    // Gestione del video responsive
    function handleResponsiveVideo() {
        const videoContainer = document.querySelector('#video-container');
        const video = videoContainer ? videoContainer.querySelector('video') : null;
        
        if (video) {
            const source = video.querySelector('source');
            const mobileVideoUrl = 'video/arma3.mp4'; // Sostituisci con il percorso reale del video mobile
            const desktopVideoUrl = 'video/arma3.mp4'; // Sostituisci con il percorso reale del video desktop

            function setVideoSource() {
                const newSource = window.innerWidth <= 768 ? mobileVideoUrl : desktopVideoUrl;
                if (source.src !== newSource) {
                    source.src = newSource;
                    video.load();
                }
            }

            // Imposta la sorgente del video al caricamento iniziale
            setVideoSource();

            // Aggiorna la sorgente del video quando la finestra viene ridimensionata
            window.addEventListener('resize', setVideoSource);

            video.addEventListener('loadedmetadata', function() {
                this.currentTime = 35;
            });

            video.addEventListener('timeupdate', function() {
                if (this.currentTime >= this.duration - 0.5) {
                    this.currentTime = 35;
                }
            });
        }
    }

    // Chiama la funzione per gestire il video responsive
    handleResponsiveVideo();

    // Gestione dei video preview per i loghi dei giochi
    const gameLogos = document.querySelectorAll('#sezioni .game-logo');
    gameLogos.forEach(logo => {
        const video = logo.querySelector('video');
        if (video) {
            const videoSource = video.querySelector('source');
            const isArma3Video = videoSource.src.includes("video/arma3.mp4");
            const isSquadVideo = videoSource.src.includes('video/squad.mp4');

            video.addEventListener('loadedmetadata', function() {
                if (isArma3Video) {
                    video.currentTime = 75; // 1:15 (75 secondi) per Arma 3
                } else if (isSquadVideo) {
                    video.currentTime = 50; // 50 secondi per Squad
                }
            });

            logo.addEventListener('mouseenter', function() {
                video.play();
            });

            logo.addEventListener('mouseleave', function() {
                video.pause();
                if (isArma3Video) {
                    video.currentTime = 75;
                } else if (isSquadVideo) {
                    video.currentTime = 50;
                } else {
                    video.currentTime = 0;
                }
            });
        }
    });

    // Gestione della navigazione dalla pagina di gioco
    const scrollTarget = sessionStorage.getItem('scrollTarget');
    if (scrollTarget) {
        const targetElement = document.getElementById(scrollTarget);
        if (targetElement) {
            setTimeout(() => {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
        sessionStorage.removeItem('scrollTarget');
    }
});