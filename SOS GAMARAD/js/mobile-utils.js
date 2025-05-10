/**
 * GamaRad S.O.S Mobile Utilities
 * Script untuk meningkatkan pengalaman mobile
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mendapatkan elemen mobile search button
    const mobileSearchBtn = document.getElementById('mobile-search');
    const searchContainer = document.getElementById('search-container');
    
    // Jika tombol search mobile ada, tambahkan event listener
    if (mobileSearchBtn) {
        mobileSearchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (searchContainer) {
                searchContainer.classList.toggle('active');
                // Auto focus ke input search
                const searchInput = document.querySelector('.search-input');
                if (searchInput) {
                    setTimeout(() => {
                        searchInput.focus();
                    }, 100);
                }
            }
        });
    }
    
    // Menambahkan class touch-feedback ke semua button dan card
    const touchElements = document.querySelectorAll('button, .category-card, .nav-btn, .activity-item');
    touchElements.forEach(element => {
        element.classList.add('touch-feedback');
    });
    
    // Mengubah perilaku navigasi pada perangkat mobile
    function handleMobileNavigation() {
        const navLinks = document.querySelectorAll('.mobile-nav-link');
        
        navLinks.forEach(link => {
            // Skip link dengan ID mobile-search karena sudah memiliki handler sendiri
            if (link.id === 'mobile-search') return;
            
            link.addEventListener('click', function() {
                // Hapus class active dari semua link
                navLinks.forEach(l => l.classList.remove('active'));
                // Tambahkan class active ke link yang diklik
                this.classList.add('active');
            });
        });
    }
    
    // Deteksi swipe untuk navigasi kembali
    function detectSwipeGestures() {
        let touchStartX = 0;
        let touchEndX = 0;
        const MIN_SWIPE_DISTANCE = 100;
        
        document.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        document.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
        
        function handleSwipe() {
            // Swipe dari kiri ke kanan (swipe back)
            if (touchEndX - touchStartX > MIN_SWIPE_DISTANCE) {
                // Tampilkan indikator swipe
                const backHint = document.querySelector('.back-gesture-hint');
                if (backHint) {
                    backHint.style.opacity = '1';
                    setTimeout(() => {
                        backHint.style.opacity = '0.3';
                    }, 300);
                }
                
                // Cek jika ada history untuk kembali
                if (window.history.length > 1) {
                    window.history.back();
                }
            }
        }
    }
    
    // Pull to refresh implementation
    function setupPullToRefresh() {
        // Cek apakah perangkat touch atau tidak
        if (!('ontouchstart' in window)) return;
        
        const body = document.querySelector('body');
        
        // Membuat elemen indikator pull to refresh
        const pullIndicator = document.createElement('div');
        pullIndicator.className = 'pull-indicator';
        
        const spinner = document.createElement('div');
        spinner.className = 'pull-spinner';
        
        const pullText = document.createElement('span');
        pullText.textContent = 'Pull down to refresh';
        pullText.style.marginLeft = '10px';
        
        pullIndicator.appendChild(spinner);
        pullIndicator.appendChild(pullText);
        body.insertBefore(pullIndicator, body.firstChild);
        
        let startY = 0;
        let currentY = 0;
        let refreshing = false;
        
        document.addEventListener('touchstart', function(e) {
            startY = e.touches[0].pageY;
        }, false);
        
        document.addEventListener('touchmove', function(e) {
            if (refreshing) return;
            
            currentY = e.touches[0].pageY;
            let distance = currentY - startY;
            
            // Hanya aktifkan pull to refresh jika scroll ke atas pada posisi paling atas halaman
            if (distance > 0 && window.scrollY <= 0) {
                pullIndicator.classList.add('active');
                if (distance > 100) {
                    pullText.textContent = 'Release to refresh';
                } else {
                    pullText.textContent = 'Pull down to refresh';
                }
            }
        }, false);
        
        document.addEventListener('touchend', function(e) {
            if (refreshing) return;
            
            if (currentY - startY > 100 && window.scrollY <= 0) {
                refreshing = true;
                pullText.textContent = 'Refreshing...';
                
                // Refresh halaman setelah animation
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                pullIndicator.classList.remove('active');
            }
        }, false);
    }
    
    // Menjalankan fungsi inisialisasi mobile
    handleMobileNavigation();
    detectSwipeGestures();
    setupPullToRefresh();
    
    // Menambahkan toast notifications
    function showToast(message, type = 'info', duration = 3000) {
        // Hapus toast yang ada sebelumnya
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }
        
        // Buat elemen toast baru
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        // Icon berdasarkan tipe notifikasi
        let icon = '';
        switch(type) {
            case 'success':
                icon = '<i class="fas fa-check-circle"></i>';
                break;
            case 'error':
                icon = '<i class="fas fa-exclamation-circle"></i>';
                break;
            case 'warning':
                icon = '<i class="fas fa-exclamation-triangle"></i>';
                break;
            default:
                icon = '<i class="fas fa-info-circle"></i>';
        }
        
        toast.innerHTML = `${icon} ${message}`;
        document.body.appendChild(toast);
        
        // Tampilkan toast dengan animasi
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translate(-50%, 0)';
        }, 100);
        
        // Sembunyikan toast setelah durasi tertentu
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translate(-50%, 20px)';
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, duration);
    }
    
    // Tambahkan showToast ke global scope agar dapat dipanggil dari mana saja
    window.showToast = showToast;
    
    // Contoh penggunaan toast untuk memperlihatkan fitur saat halaman pertama kali dibuka
    // setTimeout(() => {
    //     showToast('Selamat datang di GamaRad S.O.S!', 'success');
    // }, 1000);
});
