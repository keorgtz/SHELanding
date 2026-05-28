document.addEventListener("DOMContentLoaded", () => {

    // ── Scroll suave para enlaces internos ──────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // ── Botón "Ir Arriba" ────────────────────────────────────────
    const toTopBtn = document.getElementById('toTopBtn');
    if (toTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                toTopBtn.classList.remove('translate-y-20', 'opacity-0');
                toTopBtn.classList.add('translate-y-0', 'opacity-100');
            } else {
                toTopBtn.classList.remove('translate-y-0', 'opacity-100');
                toTopBtn.classList.add('translate-y-20', 'opacity-0');
            }
        });
        toTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // ── Galería del sistema — tabs ───────────────────────────────
    const tabs   = document.querySelectorAll('[data-tab]');
    const panels = document.querySelectorAll('[data-panel]');

    function activateTab(key) {
        tabs.forEach(t   => t.classList.toggle('active', t.dataset.tab === key));
        panels.forEach(p => p.classList.toggle('active', p.dataset.panel === key));
    }

    tabs.forEach(tab => tab.addEventListener('click', () => activateTab(tab.dataset.tab)));
    if (tabs.length > 0) activateTab(tabs[0].dataset.tab);

    // ── Modal de imágenes (restaurante) ─────────────────────────
    const modal      = document.getElementById('imgModal');
    const modalImg   = document.getElementById('modalImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc  = document.getElementById('modalDesc');
    const modalClose = document.getElementById('modalClose');

    function openModal(src, title, desc) {
        modalImg.src   = src;
        modalImg.alt   = title;
        modalTitle.textContent = title;
        modalDesc.textContent  = desc ? ' — ' + desc : '';
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('open');
        document.body.style.overflow = '';
        // Liberar src tras la transición para evitar flash
        setTimeout(() => { modalImg.src = ''; }, 200);
    }

    document.querySelectorAll('.rest-screen').forEach(el => {
        el.addEventListener('click', () => {
            const img  = el.querySelector('img');
            const src  = el.dataset.img || img.src;
            const title = el.dataset.title || img.alt;
            const desc  = el.dataset.desc || '';
            openModal(src, title, desc);
        });
    });

    if (modalClose) modalClose.addEventListener('click', closeModal);

    // Cerrar al hacer clic fuera del contenido
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });

    // ── Menú móvil ───────────────────────────────────────────────
    const menuBtn  = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = document.getElementById('menuIcon');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            const open = mobileMenu.classList.toggle('open');
            menuIcon.textContent = open ? 'close' : 'menu';
        });
    }

    // Cerrar menú al hacer scroll
    window.addEventListener('scroll', () => {
        if (mobileMenu && mobileMenu.classList.contains('open')) {
            mobileMenu.classList.remove('open');
            if (menuIcon) menuIcon.textContent = 'menu';
        }
    }, { passive: true });

});

// Función global para cerrar menú desde los links
function closeMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    const icon = document.getElementById('menuIcon');
    if (menu) menu.classList.remove('open');
    if (icon) icon.textContent = 'menu';
}
