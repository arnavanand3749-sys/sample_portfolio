// --- Typewriter Effect ---
const phrases = ["A Frontend Developer.", "A UI/UX Enthusiast.", "A Tech Student."];
let currentPhraseIndex = 0;
let letterIndex = 0;
let currentText = "";
let isDeleting = false;

const typewriterElement = document.querySelector('.typewriter-text');
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 1500;

function type() {
    const currentPhrase = phrases[currentPhraseIndex];
    
    if (isDeleting) {
        currentText = currentPhrase.substring(0, letterIndex - 1);
        letterIndex--;
    } else {
        currentText = currentPhrase.substring(0, letterIndex + 1);
        letterIndex++;
    }
    
    typewriterElement.textContent = currentText;
    
    let typeDelay = isDeleting ? deletingSpeed : typingSpeed;
    
    // Pause at the end of a phrase
    if (!isDeleting && currentText === currentPhrase) {
        typeDelay = pauseTime;
        isDeleting = true;
    } else if (isDeleting && currentText === "") {
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        typeDelay = 500; // Pause before starting new word
    }
    
    setTimeout(type, typeDelay);
}

// Blinking cursor effect
const style = document.createElement('style');
style.innerHTML = `
    .cursor {
        display: inline-block;
        width: 3px;
        background-color: var(--primary-color);
        animation: blink 1s step-end infinite;
    }
    @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
    }
`;
document.head.appendChild(style);

// Start typewriter on load
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(type, 1000);
});

// --- Mobile Navigation Toggle ---
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');

mobileMenu.addEventListener('click', () => {
    // Toggle Nav
    navLinks.classList.toggle('nav-active');
    
    // Animate Links
    navLinksItems.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Burger Animation (turning into an X)
    mobileMenu.classList.toggle('toggle');
});

// Add keyframes for nav animation dynamically
const navAnimStyle = document.createElement('style');
navAnimStyle.innerHTML = `
    @keyframes navLinkFade {
        from { opacity: 0; transform: translateX(50px); }
        to { opacity: 1; transform: translateX(0); }
    }
    .toggle .line1 { transform: rotate(-45deg) translate(-5px, 6px); }
    .toggle .line2 { opacity: 0; }
    .toggle .line3 { transform: rotate(45deg) translate(-5px, -6px); }
`;
document.head.appendChild(navAnimStyle);