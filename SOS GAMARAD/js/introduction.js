/**
 * GamaRad S.O.S - Introduction Screen Javascript
 * Mengontrol swiper, progress bar, dan navigasi
 */

document.addEventListener('DOMContentLoaded', function() {
    // Referensi ke elemen DOM
    const skipBtn = document.getElementById('skip-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const startAppBtn = document.getElementById('start-app-btn');
    const progressFill = document.getElementById('progress-fill');
    const currentSlideEl = document.getElementById('current-slide');
    const totalSlidesEl = document.getElementById('total-slides');
    
    let swiper; // Swiper instance
    let totalSlides = 0;
    
    // Inisialisasi Swiper
    function initSwiper() {
        swiper = new Swiper('.onboarding-swiper', {
            direction: 'horizontal',
            loop: false,
            effect: 'slide',  // Changed from 'fade' to 'slide' for better mobile performance
            slidesPerView: 1,
            spaceBetween: 30,
            speed: 400,
            touchRatio: 1.5, // Increased touch sensitivity for mobile
            resistanceRatio: 0.85, // Better resistance at edges
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true, // Dynamic bullets for better mobile experience
            },
            touchStartPreventDefault: false, // Better touch handling on mobile devices
            on: {
                init: function() {
                    // Set total slides
                    totalSlides = this.slides.length;
                    totalSlidesEl.textContent = totalSlides;
                    
                    // Update progress bar and buttons for initial slide
                    updateUI(this.activeIndex, totalSlides);
                },
                slideChange: function() {
                    updateUI(this.activeIndex, totalSlides);
                }
            }
        });
    }
    
    // Update UI berdasarkan perubahan slide
    function updateUI(currentIndex, totalSlides) {
        // Update current slide number
        currentSlideEl.textContent = currentIndex + 1;
        
        // Update progress bar with smooth transition
        const progressPercentage = ((currentIndex + 1) / totalSlides) * 100;
        progressFill.style.width = `${progressPercentage}%`;
        progressFill.setAttribute('aria-valuenow', progressPercentage);
        
        // Add visual feedback for current slide number
        currentSlideEl.classList.add('highlight-text');
        setTimeout(() => {
            currentSlideEl.classList.remove('highlight-text');
        }, 300);
        
        // Update button states
        updateButtonStates(currentIndex, totalSlides);
    }
    
    // Update state tombol berdasarkan posisi slide
    function updateButtonStates(currentIndex, totalSlides) {
        // Previous button (disabled on first slide)
        if (currentIndex === 0) {
            prevBtn.classList.add('nav-btn-hidden');
        } else {
            prevBtn.classList.remove('nav-btn-hidden');
        }
        
        // Last slide - show start app button, hide next button
        if (currentIndex === totalSlides - 1) {
            nextBtn.style.display = 'none';
            startAppBtn.style.display = 'flex';
            
            // Tambahkan sedikit animasi untuk menarik perhatian ke tombol start
            startAppBtn.classList.add('animated-start-btn');
        } else {
            nextBtn.style.display = 'flex';
            startAppBtn.style.display = 'none';
        }
    }
    
    // Fungsi navigasi dengan transisi yang lebih baik untuk mobile
    function navigateToMainApp() {
        // Disable buttons to prevent multiple clicks
        startAppBtn.disabled = true;
        skipBtn.disabled = true;
        
        // Hapus event listeners sementara untuk mencegah multiple navigations
        startAppBtn.removeEventListener('click', navigateToMainApp);
        skipBtn.removeEventListener('click', skipOnboarding);
        
        // Tambahkan animasi slide-out
        document.querySelector('.onboarding-container').classList.add('slide-out');
        
        // Redirect ke home page setelah animasi
        setTimeout(() => {
            // Store completed intro state in sessionStorage
            sessionStorage.setItem('introCompleted', 'true');
            window.location.href = 'home.html';
        }, 400);
    }
    
    // Skip onboarding dan pergi ke aplikasi utama
    function skipOnboarding() {
        navigateToMainApp();
    }
    
    // Event listeners untuk tombol navigasi
    skipBtn.addEventListener('click', skipOnboarding);
    
    prevBtn.addEventListener('click', function() {
        swiper.slidePrev();
    });
    
    nextBtn.addEventListener('click', function() {
        swiper.slideNext();
    });
    
    startAppBtn.addEventListener('click', navigateToMainApp);
    
    // Using Swiper's built-in touch handling which is better optimized
    // No need for separate touch event handling as Swiper handles it properly
    
    // Add fastclick for removing 300ms delay on mobile devices
    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function() {
            // Remove any click delays on devices that support touch
            FastClick.attach(document.body);
        }, false);
    }
    
    // Prevent zoom on double-tap for iOS devices
    document.addEventListener('gesturestart', function(e) {
        e.preventDefault();
    });
    
    // Improve performance by disabling certain animations while scrolling
    let isScrolling;
    window.addEventListener('scroll', function() {
        document.body.classList.add('is-scrolling');
        clearTimeout(isScrolling);
        isScrolling = setTimeout(function() {
            document.body.classList.remove('is-scrolling');
        }, 100);
    }, false);
    
    // Efek float pada tombol start
    function addStartButtonAnimation() {
        if (startAppBtn) {
            startAppBtn.classList.add('pulse-animation');
        }
    }
    
    // Inisialisasi semua fitur
    initSwiper();
    
    // Tambahkan kelas untuk transisi halaman
    setTimeout(() => {
        document.querySelector('.onboarding-container').classList.add('loaded');
    }, 100);
});
