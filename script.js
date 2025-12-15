// Enhanced Interactive Elements
class TouchHandler {
    constructor() {
        this.cards = document.querySelectorAll('.module-card');
        this.buttons = document.querySelectorAll('.cta-button, .tech-tag');
        this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        // Bind methods
        this.init = this.init.bind(this);
        this.initCards = this.initCards.bind(this);
        this.initButtons = this.initButtons.bind(this);
        this.createRipple = this.createRipple.bind(this);
        this.handleCardTilt = this.handleCardTilt.bind(this);
        this.resetCardTilt = this.resetCardTilt.bind(this);
        
        this.init();
    }

    createRipple(event, element) {
        const rect = element.getBoundingClientRect();
        const x = (event.touches ? event.touches[0].clientX : event.clientX) - rect.left;
        const y = (event.touches ? event.touches[0].clientY : event.clientY) - rect.top;
        
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        element.appendChild(ripple);
        
        // Remove ripple after animation completes
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    initCards() {
        this.cards.forEach(card => {
            // Add touch feedback
            card.addEventListener('mousedown', (e) => this.createRipple(e, card));
            card.addEventListener('touchstart', (e) => this.createRipple(e, card), { passive: true });
            
            // 3D tilt effect for non-touch devices
            if (!this.isTouchDevice) {
                card.addEventListener('mousemove', (e) => this.handleCardTilt(e, card));
                card.addEventListener('mouseleave', (e) => this.resetCardTilt(e, card));
            }
        });
    }

    initButtons() {
        this.buttons.forEach(button => {
            button.addEventListener('mousedown', (e) => this.createRipple(e, button));
            button.addEventListener('touchstart', (e) => this.createRipple(e, button), { passive: true });
        });
    }

    handleCardTilt(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        card.style.transform = `
            perspective(1000px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            translateZ(10px)
        `;
        
        // Dynamic shadow based on tilt
        const shadowX = (x / rect.width - 0.5) * 20;
        const shadowY = (y / rect.height - 0.5) * 20;
        card.style.boxShadow = `
            ${shadowX}px ${shadowY}px 40px rgba(0, 0, 0, 0.4),
            0 10px 30px rgba(0, 0, 0, 0.2)
        `;
    }

    resetCardTilt(e, card) {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
    }

    init() {
        this.initCards();
        this.initButtons();
    }
}

// Make TouchHandler globally available
window.TouchHandler = TouchHandler;

// Initialize global variables if they don't exist
if (typeof window.mouseX === 'undefined') {
    window.mouseX = 0;
    window.mouseY = 0;
    window.targetX = 0;
    window.targetY = 0;
    window.ease = 0.05;
}

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class to body for smooth entrance
    document.body.classList.add('loaded');
    
    // Initialize touch handler
    const touchHandler = new TouchHandler();
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.module-card, .cta-section');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial styles for animation
    document.querySelectorAll('.module-card, .cta-section').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });

    // Run once on load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', () => {
        animateOnScroll();
    });

    // Enhanced button hover effect
    const buttons = document.querySelectorAll('.cta-button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
            button.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.5)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        });
    });

    // Handle reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('reduced-motion');
    }
});

// Smooth parallax effect with requestAnimationFrame
if (typeof window.mouseX === 'undefined') {
    window.mouseX = 0;
    window.mouseY = 0;
    window.targetX = 0;
    window.targetY = 0;
    window.ease = 0.05;
}

// Update mouse position
const updateMousePosition = (e) => {
    window.targetX = (e.clientX / window.innerWidth - 0.5) * 20;
    window.targetY = (e.clientY / window.innerHeight - 0.5) * 20;
};

// Smooth animation loop
const animate = () => {
    // Ease the values
    window.mouseX += (window.targetX - window.mouseX) * window.ease;
    window.mouseY += (window.targetY - window.mouseY) * window.ease;
    
    // Apply to shapes
    const shapes = document.querySelectorAll('.geometric-shape');
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        shape.style.transform = `translate(
            ${window.mouseX * speed}px, 
            ${window.mouseY * speed}px
        )`;
    });
    
    requestAnimationFrame(animate);
};

// Start animation loop
animate();

// Add event listeners
window.addEventListener('mousemove', updateMousePosition, { passive: true });

// Handle reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.classList.add('reduced-motion');
}