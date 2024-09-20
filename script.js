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
                nav.classList.remove('open');
                menuToggle.classList.remove('active');
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
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('open');
            this.classList.toggle('active');
        });
    }

    // Chiudi il menu mobile quando si clicca fuori
    document.addEventListener('click', function(event) {
        if (nav && menuToggle) {
            const isClickInsideNav = nav.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnToggle && nav.classList.contains('open')) {
                nav.classList.remove('open');
                menuToggle.classList.remove('active');
            }
        }
    });

    // Gestione dei video preview per i loghi dei giochi
    const gameLogos = document.querySelectorAll('#sezioni .game-logo');
    gameLogos.forEach(logo => {
        const video = logo.querySelector('video');
        if (video) {
            const videoSource = video.querySelector('source');
            const isArma3Video = videoSource.src.includes('We are Red Man');
            const isSquadVideo = videoSource.src.includes('Trailer Sezione Squad');

            logo.addEventListener('mouseenter', function() {
                if (isArma3Video) {
                    video.currentTime = 75; // 1:15 (75 secondi) per Arma 3
                } else if (isSquadVideo) {
                    video.currentTime = 35; // 35 secondi per Squad
                } else {
                    video.currentTime = 0; // Per altri video, inizia dall'inizio
                }
                video.play();
            });

            logo.addEventListener('mouseleave', function() {
                video.pause();
                if (isArma3Video) {
                    video.currentTime = 75; // Mantiene Arma 3 a 1:15
                } else if (isSquadVideo) {
                    video.currentTime = 35; // Mantiene Squad a 35 secondi
                } else {
                    video.currentTime = 0;
                }
            });
        }
    });

    // Gestione del video di sfondo
    const homepageVideo = document.querySelector('#video-container video');
    if (homepageVideo) {
        homepageVideo.addEventListener('loadedmetadata', function() {
            this.currentTime = 35;
        });

        homepageVideo.addEventListener('timeupdate', function() {
            if (this.currentTime >= this.duration - 0.5) {
                this.currentTime = 35;
            }
        });
    }

    // Inizializzazione: evidenzia il link attivo al caricamento della pagina
    highlightActiveNavLink();

    // Aggiorna le statistiche (esempio)
    const activeMembersElement = document.getElementById('active-members');
    if (activeMembersElement) {
        activeMembersElement.textContent = '150';
    }
});
