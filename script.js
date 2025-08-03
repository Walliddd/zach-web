const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const title = document.querySelector('.typing-effect');
const cursor = document.querySelector('.custom-cursor'); // Otteniamo il cursore creato nel CSS

const interactiveElements = document.querySelectorAll('a, #theme-toggle');

// Gestione del tema
const savedTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', savedTheme);
updateCursorColor();

themeToggle.addEventListener('click', () => {
    let currentTheme = body.getAttribute('data-theme');
    let newTheme = currentTheme === 'light' ? 'dark' : 'light';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateCursorColor();
});

// Funzione per l'effetto typing
function applyTypingEffect(element) {
    const text = element.textContent;
    element.textContent = '';
    element.style.width = '0';
    element.style.borderRight = `0.15em solid var(--accent-color)`;

    for (let i = 0; i < text.length; i++) {
        const charSpan = document.createElement('span');
        charSpan.textContent = text[i];
        charSpan.style.opacity = '0';
        element.appendChild(charSpan);
    }

    const spans = element.querySelectorAll('span');
    let charIndex = 0;

    const typingInterval = setInterval(() => {
        if (charIndex < spans.length) {
            spans[charIndex].style.opacity = '1';
            charIndex++;
        } else {
            clearInterval(typingInterval);
            element.style.borderRight = 'none'; /* Rimuove il cursore */
        }
    }, 100);
}

window.addEventListener('load', () => {
    setTimeout(() => {
        applyTypingEffect(title);
    }, 500);
});

// Aggiornamento posizione cursore
window.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
});

// Aggiorna colore cursore in base al tema
function updateCursorColor() {
    if (body.getAttribute('data-theme') === 'dark') {
        cursor.style.background = 'var(--cursor-dark)';
    } else {
        cursor.style.background = 'var(--cursor-light)';
    }
}

// Aggiunge/rimuove classi al cursore quando si passa sopra elementi interattivi
interactiveElements.forEach(el => {
    el.addEventListener('mouseover', () => {
        cursor.classList.add('hover-link'); // Usa 'hover-link' che è generico
    });
    el.addEventListener('mouseout', () => {
        cursor.classList.remove('hover-link');
    });
});

// Assicura che il nostro cursore sia visibile solo se JS è caricato
document.body.classList.add('js-loaded');