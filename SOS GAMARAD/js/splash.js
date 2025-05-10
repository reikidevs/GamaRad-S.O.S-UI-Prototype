/**
 * GamaRad S.O.S - Splash Screen Controller
 * Handles loading animation and automatic redirect to introduction page
 */

document.addEventListener('DOMContentLoaded', () => {
    // References to elements
    const splashScreen = document.querySelector('.splash-screen');
    const loadingProgress = document.querySelector('.loading-progress');
    
    // Simulate loading progress
    let progress = 0;
    const totalTime = 3000; // Total loading time in milliseconds
    const interval = 30; // Update interval in milliseconds
    const increment = (interval / totalTime) * 100;
    
    const simulateLoading = setInterval(() => {
        progress += increment;
        
        // Update the progress bar width
        if (progress <= 100) {
            loadingProgress.style.width = `${progress}%`;
        } else {
            clearInterval(simulateLoading);
            completeLoading();
        }
    }, interval);
    
    // Function to handle completion of loading
    function completeLoading() {
        // Add fade-out animation
        setTimeout(() => {
            splashScreen.classList.add('fade-out');
            
            // Redirect to introduction page after animation completes
            setTimeout(() => {
                window.location.href = 'introduction.html';
            }, 500); // Matches the duration of the fade-out animation
        }, 300); // Small delay before starting fade animation
    }
    
    // Fallback - if loading takes too long, force redirect
    setTimeout(() => {
        if (progress < 100) {
            clearInterval(simulateLoading);
            loadingProgress.style.width = '100%';
            completeLoading();
        }
    }, totalTime + 1000); // Add 1 second buffer
    
    // Preload images for the main application
    preloadMainAppResources();
});

/**
 * Preloads critical resources for the main application
 * to improve the transition experience
 */
function preloadMainAppResources() {
    // List of critical images to preload
    const criticalImages = [
        '../img/onboarding/slide1.svg',
        '../img/onboarding/slide2.svg',
        '../img/onboarding/slide3.svg',
        '../img/cropped-Simbol-Logo-Garis.png'
    ];
    
    // Preload images
    criticalImages.forEach(imageSrc => {
        const img = new Image();
        img.src = imageSrc;
    });
}

/**
 * Function to check if the app is being loaded as a standalone PWA
 * This helps customize the experience for installed app vs browser
 */
function isRunningStandalone() {
    return (window.matchMedia('(display-mode: standalone)').matches) || 
           (window.navigator.standalone) || 
           document.referrer.includes('android-app://');
}

// Check if app is being opened as installed PWA and adjust behavior if needed
if (isRunningStandalone()) {
    // Additional behaviors for when app is running as installed PWA
    console.log('App running in standalone/installed mode');
    
    // In the future, could add logic here to:
    // - Skip onboarding for returning users
    // - Check for cached data
    // - Adjust splash duration
}
