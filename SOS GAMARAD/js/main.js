/**
 * GamaRad S.O.S Mobile App JavaScript
 * Learning application for radiology emergency with swipe onboarding
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initApp();
});

/**
 * Initialize the application functionality
 */
function initApp() {
    // Initialize Swiper for onboarding
    initOnboardingSwiper();
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize animation effects
    initAnimations();
    
    // Create placeholder for demo slides
    createDemoSlideImages();
}

/**
 * Initialize Swiper for onboarding slides
 */
function initOnboardingSwiper() {
    // Initialize Swiper only if it exists on the page
    if (document.querySelector('.onboarding-swiper')) {
        const swiper = new Swiper('.onboarding-swiper', {
            // Optional parameters
            direction: 'horizontal',
            loop: false,
            speed: 600,
            effect: 'slide',
            grabCursor: true,
            slidesPerView: 1,
            spaceBetween: 30,
            autoHeight: false,
            
            // Add pagination
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            
            // Handle slide changing
            on: {
                slideChange: function() {
                    updateButtons(this.activeIndex, this.slides.length - 1);
                },
                reachEnd: function() {
                    showStartAppButton();
                }
            }
        });
        
        // Store swiper instance globally
        window.appSwiper = swiper;
    }
}

/**
 * Check if SVG slide images exist and are loaded correctly
 * We don't need to create placeholders anymore as we've created SVG images
 */
function createDemoSlideImages() {
    // Function kept for compatibility but no longer creates demo images
    // as we now use real SVG images created for the app
    const slideImages = document.querySelectorAll('.slide-image');
    
    // Just log a message to confirm the slides are loaded
    console.log(`${slideImages.length} slide images found in the onboarding swiper.`);
}

/**
 * Set up all event listeners for interactive elements
 */
function setupEventListeners() {
    // Previous button
    const prevBtn = document.getElementById('prev-btn');
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (window.appSwiper) {
                window.appSwiper.slidePrev();
            }
        });
    }
    
    // Next button
    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (window.appSwiper) {
                window.appSwiper.slideNext();
            }
        });
    }
    
    // Skip button
    const skipBtn = document.getElementById('skip-btn');
    if (skipBtn) {
        skipBtn.addEventListener('click', function() {
            if (window.appSwiper) {
                // Go to the last slide
                window.appSwiper.slideTo(window.appSwiper.slides.length - 1);
                // Show toast notification
                showToast('Skipped to the end', 'info');
            }
        });
    }
    
    // Start app button
    const startAppBtn = document.getElementById('start-app-btn');
    if (startAppBtn) {
        startAppBtn.addEventListener('click', function() {
            navigateToMainApp();
        });
    }
    
    // Add parallax effect to logo on mouse move (subtle effect)
    const appContainer = document.querySelector('.app-container');
    const logo = document.querySelector('.logo-container');
    
    if (appContainer && logo) {
        appContainer.addEventListener('mousemove', function(e) {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;  
            
            // Subtle movement
            logo.style.transform = `translateX(${x * 10 - 5}px) translateY(${y * 10 - 5}px)`;
        });
    }
}

/**
 * Update navigation buttons based on slide position
 * @param {number} currentIndex - Current slide index
 * @param {number} lastIndex - Last slide index
 */
function updateButtons(currentIndex, lastIndex) {
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const startAppBtn = document.getElementById('start-app-btn');
    const skipBtn = document.getElementById('skip-btn');
    
    if (currentIndex === 0) {
        // First slide
        if (prevBtn) prevBtn.style.display = 'none';
    } else {
        // Not first slide
        if (prevBtn) prevBtn.style.display = 'flex';
    }
    
    if (currentIndex === lastIndex) {
        // Last slide
        if (nextBtn) nextBtn.style.display = 'none';
        if (startAppBtn) startAppBtn.style.display = 'flex';
        if (skipBtn) skipBtn.style.display = 'none';
    } else {
        // Not last slide
        if (nextBtn) nextBtn.style.display = 'flex';
        if (startAppBtn) startAppBtn.style.display = 'none';
        if (skipBtn) skipBtn.style.display = 'block';
    }
    
    // Add animation to buttons when slide changes
    animateButtons();
}

/**
 * Show the start app button
 */
function showStartAppButton() {
    const startAppBtn = document.getElementById('start-app-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (startAppBtn) {
        // Show with animation
        startAppBtn.style.display = 'flex';
        startAppBtn.style.transform = 'scale(0.8)';
        startAppBtn.style.opacity = '0';
        
        setTimeout(() => {
            startAppBtn.style.transform = 'scale(1)';
            startAppBtn.style.opacity = '1';
        }, 50);
    }
    
    if (nextBtn) nextBtn.style.display = 'none';
}

/**
 * Navigate to main app (home page)
 */
function navigateToMainApp() {
    // Add loading overlay with animation
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    
    // Create loading spinner
    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';
    loadingOverlay.appendChild(spinner);
    
    // Create loading text
    const loadingText = document.createElement('div');
    loadingText.className = 'loading-text';
    loadingText.textContent = 'Memuat Aplikasi GamaRad S.O.S...';
    loadingOverlay.appendChild(loadingText);
    
    // Add to page
    document.body.appendChild(loadingOverlay);
    
    // Show toast notification
    showToast('Memulai GamaRad S.O.S...', 'success');
    
    // Add loading styles to body
    document.body.classList.add('loading');
    
    // Simulate loading and then redirect to home page
    setTimeout(() => {
        loadingText.textContent = 'Aplikasi berhasil dimuat!';
        showToast('Aplikasi berhasil dimuat!', 'success');
        
        // After a short delay, navigate to home page
        setTimeout(() => {
            window.location.href = 'home.html';
        }, 1000);
    }, 1500);
}

/**
 * Initialize animations
 */
function initAnimations() {
    // Animate in the slide images with slight delay
    animateSlideElements();
}

/**
 * Animate slide elements with a staggered entrance
 */
function animateSlideElements() {
    const slides = document.querySelectorAll('.swiper-slide');
    
    slides.forEach((slide, slideIndex) => {
        const image = slide.querySelector('.slide-image');
        const content = slide.querySelector('.slide-content');
        
        if (image) {
            image.style.opacity = '0';
            image.style.transform = 'translateY(20px)';
            image.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        }
        
        if (content) {
            content.style.opacity = '0';
            content.style.transform = 'translateY(20px)';
            content.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        }
    });
    
    // Show first slide elements
    setTimeout(() => {
        const firstSlide = document.querySelector('.swiper-slide-active');
        if (firstSlide) {
            const image = firstSlide.querySelector('.slide-image');
            const content = firstSlide.querySelector('.slide-content');
            
            if (image) {
                image.style.opacity = '1';
                image.style.transform = 'translateY(0)';
            }
            
            setTimeout(() => {
                if (content) {
                    content.style.opacity = '1';
                    content.style.transform = 'translateY(0)';
                }
            }, 200);
        }
    }, 300);
    
    // Add slide change animation
    if (window.appSwiper) {
        window.appSwiper.on('slideChangeTransitionStart', function() {
            const activeSlide = document.querySelector('.swiper-slide-active');
            const image = activeSlide.querySelector('.slide-image');
            const content = activeSlide.querySelector('.slide-content');
            
            if (image) {
                image.style.opacity = '0';
                image.style.transform = 'translateY(20px)';
            }
            
            if (content) {
                content.style.opacity = '0';
                content.style.transform = 'translateY(20px)';
            }
        });
        
        window.appSwiper.on('slideChangeTransitionEnd', function() {
            const activeSlide = document.querySelector('.swiper-slide-active');
            const image = activeSlide.querySelector('.slide-image');
            const content = activeSlide.querySelector('.slide-content');
            
            if (image) {
                image.style.opacity = '1';
                image.style.transform = 'translateY(0)';
            }
            
            setTimeout(() => {
                if (content) {
                    content.style.opacity = '1';
                    content.style.transform = 'translateY(0)';
                }
            }, 200);
        });
    }
}

/**
 * Show toast notification
 * @param {string} message - Message to display
 * @param {string} type - Toast type (info, success, warning, error)
 * @param {number} duration - How long to show the toast (ms)
 */
function showToast(message, type = 'info', duration = 3000) {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    // Add icon based on type
    const icon = document.createElement('i');
    icon.className = type === 'info' ? 'fas fa-info-circle' : 
                    type === 'success' ? 'fas fa-check-circle' : 
                    type === 'warning' ? 'fas fa-exclamation-triangle' : 'fas fa-times-circle';
    toast.appendChild(icon);
    
    // Add message
    const messageSpan = document.createElement('span');
    messageSpan.textContent = message;
    toast.appendChild(messageSpan);
    
    // Style the toast
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%) translateY(100px)';
    toast.style.backgroundColor = type === 'info' ? 'var(--secondary-color)' : 
                                 type === 'success' ? 'var(--success-color)' : 
                                 type === 'warning' ? 'var(--highlight-color)' : 'var(--accent-color)';
    toast.style.color = '#ffffff';
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '30px';
    toast.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.25)';
    toast.style.zIndex = '1000';
    toast.style.transition = 'all 0.3s ease';
    toast.style.fontSize = '0.9rem';
    toast.style.fontWeight = '500';
    toast.style.opacity = '0';
    toast.style.display = 'flex';
    toast.style.alignItems = 'center';
    toast.style.gap = '10px';
    toast.style.backdropFilter = 'blur(10px)';
    toast.style.webkitBackdropFilter = 'blur(10px)';
    toast.style.border = '1px solid rgba(255, 255, 255, 0.1)';
    
    // Add to page
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
    }, 10);
    
    // Auto remove after duration
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(100px)';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

/**
 * Animate buttons when slide changes
 */
function animateButtons() {
    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(button => {
        if (button.style.display !== 'none') {
            button.style.transform = 'scale(0.95)';
            button.style.opacity = '0.8';
            
            setTimeout(() => {
                button.style.transform = '';
                button.style.opacity = '';
            }, 300);
        }
    });
}

/**
 * Add CSS for loading overlay
 */
function addLoadingStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: var(--gradient-primary);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 2000;
        }
        
        .loading-spinner {
            width: 60px;
            height: 60px;
            border: 5px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: var(--accent-color);
            animation: spin 1s linear infinite;
            margin-bottom: 20px;
        }
        
        .loading-text {
            color: var(--white-color);
            font-size: 1.2rem;
            font-weight: 500;
            letter-spacing: 0.5px;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        body.loading {
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
}

// Call this function on page load
addLoadingStyles();
