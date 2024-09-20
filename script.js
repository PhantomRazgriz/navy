document.addEventListener('DOMContentLoaded', function() {
    // Selezione degli elementi
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    const recruitBtn = document.getElementById('recruit-btn');
    const alert = document.getElementById('alert');
    const statsWidget = document.getElementById('stats-widget');
    const closeWidgetBtn = document.querySelector('.close-widget');
    const reopenWidgetBtn = document.getElementById('reopen-widget');
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const body = document.body;

    // Funzione per evidenziare il link attivo nella navbar
    function highlightActiveNavLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    }

    // Event listener per lo scroll
    window.addEventListener('scroll', highlightActiveNavLink);

    // Gestione del pulsante di reclutamento
    if (recruitBtn) {
        recruitBtn.addEventListener('click', function() {
            if (alert) {
                alert.classList.remove('hidden');
                setTimeout(() => {
                    alert.classList.add('hidden');
                }, 5000);
            }
        });
    }

    // Scroll fluido per i link di navigazione
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

    // Funzioni per il widget statistiche
    function closeWidget() {
        statsWidget.classList.add('closed');
        reopenWidgetBtn.classList.add('visible');
    }

    function openWidget() {
        statsWidget.classList.remove('closed');
        reopenWidgetBtn.classList.remove('visible');
    }

    // Event listeners per il widget statistiche
    if (closeWidgetBtn) {
        closeWidgetBtn.addEventListener('click', closeWidget);
    }

    if (reopenWidgetBtn) {
        reopenWidgetBtn.addEventListener('click', openWidget);
    }

    // Gestione del menu mobile
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

    // Gestione dei video preview per i loghi dei giochi
    const gameLogos = document.querySelectorAll('#sezioni .game-logo');
    gameLogos.forEach(logo => {
        const video = logo.querySelector('video');
        if (video) {
            const videoSource = video.querySelector('source');
            const isArma3Video = videoSource.src.includes("video/arma3.mp4");
            const isSquadVideo = videoSource.src.includes('Trailer Sezione Squad');

            video.addEventListener('loadedmetadata', function() {
                if (isArma3Video) {
                    video.currentTime = 75; // 1:15 (75 secondi) per Arma 3
                } else if (isSquadVideo) {
                    video.currentTime = 35; // 35 secondi per Squad
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
                    video.currentTime = 35;
                } else {
                    video.currentTime = 0;
                }
            });
        }
    });

    // Gestione del video responsive
    function handleResponsiveVideo() {
        const videoContainer = document.querySelector('#video-container');
        const video = videoContainer ? videoContainer.querySelector('video') : null;
        
        if (video) {
            const source = video.querySelector('source');
            const mobileVideoUrl = '/path/to/mobile-video.mp4'; // Sostituisci con il percorso reale del video mobile
            const desktopVideoUrl = '/path/to/desktop-video.mp4'; // Sostituisci con il percorso reale del video desktop

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

    // Inizializzazione: evidenzia il link attivo al caricamento della pagina
    highlightActiveNavLink();

    // Aggiorna le statistiche (esempio)
    const activeMembersElement = document.getElementById('active-members');
    if (activeMembersElement) {
        activeMembersElement.textContent = '150';
    }
});