/* ==========================================================================
   MAIN.JS
   JavaScript vanilla del sitio "Códice de Tyria".
   Funcionalidades:
     1. Menú de navegación móvil (abrir/cerrar).
     2. Pestañas (tabs) de la sección "Las Cuatro Campañas".
     3. Cierre del menú móvil al pulsar un enlace o al redimensionar.
     4. Botón de búsqueda: enfoque accesible (placeholder de futura mejora).
   No requiere ninguna librería externa.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  initMobileNav();
  initCampaignTabs();
  initSearchButton();
});

/* --------------------------------------------------------------------------
   1. Menú de navegación móvil
   -------------------------------------------------------------------------- */
function initMobileNav() {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    var isOpen = nav.classList.toggle('is-open');
    toggle.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Cierra el menú al pulsar cualquier enlace de navegación
  nav.querySelectorAll('.main-nav__link').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Si el usuario ensancha la ventana a escritorio, aseguramos que el menú
  // móvil quede cerrado y no interfiera con la barra de navegación fija
  window.addEventListener('resize', function () {
    if (window.innerWidth > 900) {
      nav.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* --------------------------------------------------------------------------
   2. Pestañas de campañas (Prophecies / Factions / Nightfall / Eye of the North)
   -------------------------------------------------------------------------- */
function initCampaignTabs() {
  var tabs = document.querySelectorAll('.campaign-tab');
  var panels = document.querySelectorAll('.campaign-panel');

  if (!tabs.length || !panels.length) return;

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var targetId = tab.getAttribute('data-tab-target');
      activateTab(tab, targetId, tabs, panels);
    });

    // Navegación accesible por teclado (flechas izquierda/derecha)
    tab.addEventListener('keydown', function (event) {
      var currentIndex = Array.prototype.indexOf.call(tabs, tab);
      var nextIndex = null;

      if (event.key === 'ArrowRight') {
        nextIndex = (currentIndex + 1) % tabs.length;
      } else if (event.key === 'ArrowLeft') {
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      }

      if (nextIndex !== null) {
        event.preventDefault();
        tabs[nextIndex].focus();
        var targetId = tabs[nextIndex].getAttribute('data-tab-target');
        activateTab(tabs[nextIndex], targetId, tabs, panels);
      }
    });
  });
}

function activateTab(selectedTab, targetId, tabs, panels) {
  tabs.forEach(function (tab) {
    var isSelected = tab === selectedTab;
    tab.classList.toggle('is-active', isSelected);
    tab.setAttribute('aria-selected', String(isSelected));
  });

  panels.forEach(function (panel) {
    panel.classList.toggle('is-active', panel.id === targetId);
  });
}

/* --------------------------------------------------------------------------
   3. Botón de búsqueda (comportamiento base accesible)
   -------------------------------------------------------------------------- */
function initSearchButton() {
  var searchBtn = document.querySelector('.js-search-toggle');
  if (!searchBtn) return;

  searchBtn.addEventListener('click', function () {
    // Punto de extensión: aquí se podría abrir un campo/modal de búsqueda.
    // Se deja preparado como aviso accesible para no romper la maqueta.
    searchBtn.setAttribute('aria-pressed', searchBtn.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
  });
}
