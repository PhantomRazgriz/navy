document.addEventListener('DOMContentLoaded', function() {
    // Selezione degli elementi
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    const recruitBtn = document.getElementById('recruit-btn');
    const alert = document.getElementById('alert');
    const statsWidget = document.getElementById('stats-widget');
    const closeWidgetBtn = document.getElementById('close-widget');

    // Creazione dinamica del pulsante di riapertura
    const reopenBtn = document.createElement('div');
    reopenBtn.className = 'reopen-widget';
    reopenBtn.innerHTML = '<i class="fas fa-chart-bar"></i>'; // Icona di Font Awesome
    document.body.appendChild(reopenBtn);

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
    recruitBtn.addEventListener('click', function() {
        alert.classList.remove('hidden');
        setTimeout(() => {
            alert.classList.add('hidden');
        }, 5000);
    });

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
        });
    });

    // Funzione per chiudere il widget
    function closeWidget() {
        statsWidget.classList.add('closed');
        reopenBtn.classList.add('visible');
    }

    // Funzione per riaprire il widget
    function reopenWidget() {
        statsWidget.classList.remove('closed');
        reopenBtn.classList.remove('visible');
    }

    // Event listener per il pulsante di chiusura
    closeWidgetBtn.addEventListener('click', closeWidget);

    // Event listener per il pulsante di riapertura
    reopenBtn.addEventListener('click', reopenWidget);

    // Aggiorna le statistiche (puoi sostituire questo con dati reali in futuro)
    document.getElementById('active-members').textContent = '150';

    // Inizializzazione: evidenzia il link attivo al caricamento della pagina
    highlightActiveNavLink();
});


// Gestione dei video preview per i loghi dei giochi
const armaLogo = document.querySelector('.game-logo:nth-child(1)');
const squadLogo = document.querySelector('.game-logo:nth-child(2)');
const armaVideo = armaLogo.querySelector('video');
const squadVideo = squadLogo.querySelector('video');

// Funzione per gestire l'hover sul logo
function handleLogoHover(logo, video, startTime) {
    logo.addEventListener('mouseenter', function() {
        video.currentTime = startTime;
        video.play();
    });

    logo.addEventListener('mouseleave', function() {
        video.pause();
        video.currentTime = startTime;
    });
}

// Applica la gestione dell'hover a entrambi i loghi
handleLogoHover(armaLogo, armaVideo, 29); // Assumiamo che il video di Arma 3 inizi dall'inizio
handleLogoHover(squadLogo, squadVideo, 29); // Manteniamo il tempo di inizio specifico per Squad

// Assicuriamoci che i video siano muti
armaVideo.muted = true;
squadVideo.muted = true;

const homepageVideo = document.querySelector('#video-container video');

if (homepageVideo) {
    // Imposta gli attributi necessari per l'autoplay
    homepageVideo.autoplay = true;
    homepageVideo.muted = true;  // La maggior parte dei browser richiede che il video sia muto per l'autoplay
    homepageVideo.loop = true;   // Fa ripartire il video quando finisce

    // Gestisce il caricamento dei metadati del video
    homepageVideo.addEventListener('loadedmetadata', function() {
        // Imposta il tempo di inizio a 35 secondi
        this.currentTime = 35;
    });

    // Avvia il video quando è pronto
    homepageVideo.addEventListener('canplay', function() {
        this.play().catch(e => console.error("Errore nell'avvio del video:", e));
    });

    // Gestisce il riavvio del video dal punto desiderato
    homepageVideo.addEventListener('timeupdate', function() {
        if (this.currentTime >= this.duration - 0.5) {
            this.currentTime = 35;
        }
    });
}