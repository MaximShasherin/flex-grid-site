// ===== НАВИГАЦИЯ =====
const pages = {
    home: document.getElementById('home-page'),
    flex: document.getElementById('flex-page'),
    grid: document.getElementById('grid-page'),
    compare: document.getElementById('compare-page'),
    examples: document.getElementById('examples-page'),
    demo: document.getElementById('demo-page'),
    author: document.getElementById('author-page')
};
const navLinks = document.querySelectorAll('[data-page]');

function activatePage(pageId) {
    Object.values(pages).forEach(page => {
        if (page) page.classList.remove('active-page');
    });
    if (pages[pageId]) pages[pageId].classList.add('active-page');
    navLinks.forEach(link => {
        const val = link.getAttribute('data-page');
        if (val === pageId) link.classList.add('active');
        else link.classList.remove('active');
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = link.getAttribute('data-page');
        if (pageId && pages[pageId]) {
            activatePage(pageId);
            history.pushState(null, '', `#${pageId}`);
        }
    });
});

function handleHash() {
    const hash = window.location.hash.slice(1);
    if (hash && pages[hash]) activatePage(hash);
    else if (!hash || !pages[hash]) activatePage('home');
}
window.addEventListener('hashchange', handleHash);
handleHash();

// ===== SCROLL TO TOP =====
const topBtn = document.getElementById('backToTopBtn');
window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        topBtn.classList.add('show');
    } else {
        topBtn.classList.remove('show');
    }
});
topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== СЧЁТЧИК ПОСЕЩЕНИЙ (localStorage) =====
const counterEl = document.getElementById('visitCounter');
if (counterEl) {
    fetch('https://api.counterapi.dev/v1/shasherin/flex-grid/up')
        .then(response => response.json())
        .then(data => { 
            if (data && data.count) counterEl.textContent = data.count; 
        })
        .catch(() => { counterEl.textContent = '1'; });
}

// ===== ИНТЕРАКТИВНАЯ ДЕМОНСТРАЦИЯ: FLEXBOX =====
const flexContainer = document.getElementById('flexDemoContainer');
if (flexContainer) {
    const flexDirection = document.getElementById('flexDirection');
    const justifyContent = document.getElementById('justifyContent');
    const alignItems = document.getElementById('alignItems');
    const flexWrap = document.getElementById('flexWrap');

    function updateFlex() {
        flexContainer.style.flexDirection = flexDirection.value;
        flexContainer.style.justifyContent = justifyContent.value;
        flexContainer.style.alignItems = alignItems.value;
        flexContainer.style.flexWrap = flexWrap.value;
    }

    flexDirection.addEventListener('change', updateFlex);
    justifyContent.addEventListener('change', updateFlex);
    alignItems.addEventListener('change', updateFlex);
    flexWrap.addEventListener('change', updateFlex);
    updateFlex();
}

// ===== ИНТЕРАКТИВНАЯ ДЕМОНСТРАЦИЯ: GRID =====
const gridContainer = document.getElementById('gridDemoContainer');
if (gridContainer) {
    const gridCols = document.getElementById('gridCols');
    const gridColsValue = document.getElementById('gridColsValue');
    const gridGap = document.getElementById('gridGap');
    const gridGapValue = document.getElementById('gridGapValue');

    function updateGrid() {
        const cols = parseInt(gridCols.value);
        const gap = parseInt(gridGap.value);
        gridContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        gridContainer.style.gap = `${gap}px`;
        gridColsValue.textContent = cols;
        gridGapValue.textContent = `${gap}px`;
    }

    gridCols.addEventListener('input', updateGrid);
    gridGap.addEventListener('input', updateGrid);
    updateGrid();
}
