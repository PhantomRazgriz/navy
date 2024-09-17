document.addEventListener('DOMContentLoaded', function() {
    // Selezione degli elementi
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    const recruitBtn = document.getElementById('recruit-btn');
    const alert = document.getElementById('alert');

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

    // Inizializzazione: evidenzia il link attivo al caricamento della pagina
    highlightActiveNavLink();
});