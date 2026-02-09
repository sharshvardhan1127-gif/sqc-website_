/* =========================================
   1. HERO TYPING EFFECT
   ========================================= */
const typingText = document.querySelector('.hero-typing');
const words = ["Web Development", "AI & Robotics", "Quant Finance", "Open Source"];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];
    
    // Add or remove characters
    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    // Update the DOM
    if (typingText) {
        typingText.textContent = currentWord.substring(0, charIndex);
    }

    // Dynamic typing speed
    let typeSpeed = isDeleting ? 50 : 150;

    // Logic for switching between typing and deleting
    if (!isDeleting && charIndex === currentWord.length) {
        // Word is complete, pause before deleting
        isDeleting = true;
        typeSpeed = 2000; 
    } else if (isDeleting && charIndex === 0) {
        // Deletion complete, move to next word
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500; 
    }

    setTimeout(typeEffect, typeSpeed);
}

// Start the typing effect when the page loads
document.addEventListener('DOMContentLoaded', typeEffect);


/* =========================================
   2. MOBILE NAVIGATION (Burger Menu)
   ========================================= */
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

if (burger) {
    burger.addEventListener('click', () => {
        // Toggle Nav Visibility
        nav.classList.toggle('nav-active');
        
        // Burger Animation (Turn to X)
        burger.classList.toggle('toggle');
        
        // Animate Links Fade In
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });
}


/* =========================================
   3. SCROLL REVEAL ANIMATION
   ========================================= */
const observerOptions = {
    threshold: 0.15 // Trigger when 15% of the element is visible
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, observerOptions);

// Select all elements with the 'hidden' class
const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));


/* =========================================
   4. MODAL LOGIC (Robotics Popup)
   ========================================= */
const modal = document.getElementById('techModal');

// We attach these to 'window' so the HTML onclick="..." attributes can find them
window.openModal = function() {
    if (modal) {
        modal.style.display = 'flex';
        // Small timeout to allow display:flex to apply before opacity transition
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
    }
}

window.closeModal = function() {
    if (modal) {
        modal.style.opacity = '0';
        // Wait for the transition (0.3s) to finish before hiding
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

// Close Modal if user clicks outside the content box
window.onclick = function(event) {
    if (event.target === modal) {
        window.closeModal();
    }
}