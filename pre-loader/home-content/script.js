// Theme Management
const body = document.body;
const themeToggle = document.querySelector('.theme-toggle');
const themeButtons = document.querySelectorAll('.theme-btn');
const navLogo = document.getElementById('nav-logo');

// Get saved theme or default to 'light'
let currentTheme = localStorage.getItem('theme') || 'light';

// System theme detection
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

function updateLogo(theme) {
    const actualTheme = theme === 'system' ? systemTheme : theme;
    if (navLogo) {
        // Update the navigation logo based on theme
        navLogo.src = actualTheme === 'dark' ? 'dark-ms-logo.png' : 'light-ms-logo.png';
    }
}

function applyTheme(theme) {
    const actualTheme = theme === 'system' ? systemTheme : theme;
    body.setAttribute('data-theme', actualTheme);
    updateLogo(theme);
    
    // Update active button
    themeButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === theme);
    });
    
    // Save theme preference
    localStorage.setItem('theme', theme);
    currentTheme = theme;
}

// Initialize theme
applyTheme(currentTheme);

// Theme button listeners
themeButtons.forEach(button => {
    button.addEventListener('click', () => {
        applyTheme(button.dataset.theme);
    });
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (currentTheme === 'system') {
        applyTheme('system');
    }
});

// Mobile Navigation Toggle
const mobileToggle = document.getElementById('mobileToggle');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
    });

    // Make keyboard accessible
    mobileToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            mobileToggle.click();
        }
    });
}

// Enhanced Navigation System for both island and nav buttons
const allNavButtons = document.querySelectorAll('.nav-btn[data-page], .island-btn[data-page]');
let currentPage = 'home';

function setActivePage(page) {
    allNavButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.page === page);
    });
    currentPage = page;
    
    // Save current page
    localStorage.setItem('currentPage', page);
}

// Initialize active page
const savedPage = localStorage.getItem('currentPage') || 'home';
setActivePage(savedPage);

// Navigation click handlers with enhanced animations
allNavButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (e && e.preventDefault) e.preventDefault();
        const page = btn.dataset.page;
        
        // Add click animation with scale effect
        gsap.to(btn, {
            duration: 0.1,
            scale: 0.95,
            ease: "power2.out",
            onComplete: () => {
                gsap.to(btn, {
                    duration: 0.2,
                    scale: 1,
                    ease: "back.out(1.7)"
                });
            }
        });
        
        // Set active page
        setActivePage(page);
        
        // Handle page navigation with enhanced feedback
        switch(page) {
            case 'home':
                console.log('🏠 Navigating to Home');
                showPageTransition('Keep Surging');
                // window.location.href = 'home.html'; // Uncomment to actually navigate
                break;
            case 'credits':
                console.log('🏆 Navigating to Credits');
                showPageTransition('Redirecting to Credits Page... 🚀');
                window.location.href = '/island-content/credits.html'; // Uncomment to actually navigate
                break;
            case 'about':
                console.log('ℹ️ Navigating to About Us');
                showPageTransition('Redirecting to About Us... 🚀');
                window.location.href = '/island-content/about-us.html'; // Uncomment to actually navigate
                break;
        }
    });
});

// Enhanced page transition feedback
function showPageTransition(message) {
    // Create temporary notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: var(--glass-bg);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border: 1px solid var(--glass-border);
        border-radius: 12px;
        padding: 15px 20px;
        color: var(--nav-text-color);
        font-family: 'Inter', sans-serif;
        font-weight: 500;
        font-size: 14px;
        z-index: 10002;
        box-shadow: 0 8px 32px var(--glass-shadow);
        transform: translateY(100px);
        opacity: 0;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    gsap.to(notification, {
        duration: 0.5,
        y: 0,
        opacity: 1,
        ease: "back.out(1.7)"
    });
    
    // Animate out and remove
    setTimeout(() => {
        gsap.to(notification, {
            duration: 0.3,
            y: 100,
            opacity: 0,
            ease: "power2.in",
            onComplete: () => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }
        });
    }, 2000);
}

// Enhanced brand logo click
const navBrand = document.querySelector('.nav-brand');
if (navBrand) {
    navBrand.addEventListener('click', (e) => {
        e.preventDefault();
        setActivePage('home');
        
        // Logo pulse animation for nav logo
        gsap.to('.nav-logo', {
            duration: 0.6,
            scale: 1.1,
            ease: "power2.out",
            onComplete: () => {
                gsap.to('.nav-logo', {
                    duration: 0.6,
                    scale: 1,
                    ease: "back.out(1.7)"
                });
            }
        });
        
        showPageTransition('Keep Transcending! 🏠');
    });
}

// ===================== SLIDESHOW FUNCTIONALITY =====================

class GifSlideshow {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.totalSlides = this.slides.length;
        this.autoPlayInterval = null;
        this.autoPlayDuration = 6000; // 6 seconds
        this.isTransitioning = false;
        
        this.init();
    }
    
    init() {
        // Initialize event listeners
        this.setupEventListeners();
        
        // Start autoplay
        this.startAutoPlay();
        
        // Set initial active states
        this.updateSlideshow();
    }
    
    setupEventListeners() {
        // Navigation arrows
        const prevBtn = document.getElementById('prevSlide');
        const nextBtn = document.getElementById('nextSlide');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.prevSlide());
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        // Indicator clicks
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            }
        });
        
        // Pause autoplay on hover
        const slideshowWrapper = document.querySelector('.slideshow-wrapper');
        if (slideshowWrapper) {
            slideshowWrapper.addEventListener('mouseenter', () => this.pauseAutoPlay());
            slideshowWrapper.addEventListener('mouseleave', () => this.startAutoPlay());
        }
        
        // Get Started button
        const getStartedBtn = document.getElementById('getStartedBtn');
        if (getStartedBtn) {
            getStartedBtn.addEventListener('click', () => {
                console.log('🚀 Get Started clicked!');
                showPageTransition('Redirecting to Main Model... 🚀');
                
                // Redirect to the specified path after a brief delay
                setTimeout(() => {
                    window.location.href = '/mains-model/index.html';
                }, 1000);
            });
        }
    }
    
    nextSlide() {
        if (this.isTransitioning) return;
        
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateSlideshow();
        this.restartAutoPlay();
    }
    
    prevSlide() {
        if (this.isTransitioning) return;
        
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateSlideshow();
        this.restartAutoPlay();
    }
    
    goToSlide(index) {
        if (this.isTransitioning || index === this.currentSlide) return;
        
        this.currentSlide = index;
        this.updateSlideshow();
        this.restartAutoPlay();
    }
    
    updateSlideshow() {
        this.isTransitioning = true;
        
        // Update slides
        this.slides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev');
            
            if (index === this.currentSlide) {
                slide.classList.add('active');
            } else if (index < this.currentSlide) {
                slide.classList.add('prev');
            }
        });
        
        // Update indicators
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });
        
        // Add transition animation
        gsap.fromTo('.slide.active .slide-gif', 
            { scale: 1.1, opacity: 0 },
            { 
                scale: 1, 
                opacity: 1, 
                duration: 0.6, 
                ease: "power2.out",
                onComplete: () => {
                    this.isTransitioning = false;
                }
            }
        );
    }
    
    startAutoPlay() {
        this.pauseAutoPlay(); // Clear any existing interval
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDuration);
    }
    
    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    restartAutoPlay() {
        this.startAutoPlay();
    }
}

// Preloader functionality
function startLoader() {
    let counterElement = document.querySelector(".counter");
    let currentValue = 0;
    
    function updateCounter() {
        if (currentValue === 100) {
            return;
        }
        currentValue += Math.floor(Math.random() * 10) + 1;
        if (currentValue > 100) {
            currentValue = 100;
        }
        if (counterElement) counterElement.textContent = currentValue;
        let delay = Math.floor(Math.random() * 200) + 50;
        setTimeout(updateCounter, delay);
    }
    updateCounter();
}

startLoader();

// Enhanced GSAP Animations
gsap.to(".counter", 0.25, {
    delay: 3.5,
    opacity: 0,
});

gsap.to(".bar", 1.5, {
    delay: 3.5,
    height: 0,
    stagger: {
        amount: 0.5,
    },
    ease: "power4.inOut",
});

gsap.from("nav", 1.2, {
    delay: 4.1,
    y: -100,
    opacity: 0,
    ease: "power4.inOut",
});

// Static Dynamic Island - No loading animations, just fade in after bars
gsap.set(".dynamic-island", {
    opacity: 1,
    visibility: "visible",
    scale: 1,
});

gsap.from(".dynamic-island", 0.8, {
    delay: 4.2,
    opacity: 0,
    y: -20,
    ease: "power2.out",
});

gsap.from(".nav-btn", 1.2, {
    delay: 4.3,
    y: -30,
    opacity: 0,
    stagger: {
        amount: 0.4,
    },
    ease: "back.out(1.7)",
});

gsap.from(".theme-toggle", 1, {
    delay: 4.5,
    x: 100,
    opacity: 0,
    ease: "power4.inOut",
});

// Slideshow container animation
gsap.to(".slideshow-container", 1.2, {
    delay: 4.8,
    opacity: 1,
    y: 0,
    ease: "power4.out",
});

// Navigation hover effects for nav buttons
const navButtons = document.querySelectorAll('.nav-btn');
navButtons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        gsap.to(btn, {
            duration: 0.3,
            scale: 1.05,
            ease: "power2.out"
        });
    });
    
    btn.addEventListener('mouseleave', () => {
        if (!btn.classList.contains('active')) {
            gsap.to(btn, {
                duration: 0.3,
                scale: 1,
                ease: "power2.out"
            });
        }
    });
});

// Initialize slideshow after page load
document.addEventListener('DOMContentLoaded', () => {
    // Wait for the preloader to finish before initializing slideshow
    setTimeout(() => {
        // Add slideshow active class to body for hiding nav elements
        document.body.classList.add('slideshow-active');
        new GifSlideshow();
    }, 5000); // Wait for preloader to complete
});