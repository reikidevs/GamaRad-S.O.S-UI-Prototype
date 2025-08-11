/**
 * GamaRad S.O.S - Regio Chest JavaScript
 * Menangani fungsionalitas halaman Regio Chest
 */

document.addEventListener('DOMContentLoaded', () => {
    // Inisialisasi tampilan
    initCategoryFilters();
    initSearchFunctionality();
    
    // Tampilkan semua kasus saat halaman pertama kali dimuat
    showAllCases();
});

/**
 * Inisialisasi filter kategori kasus
 */
function initCategoryFilters() {
    const categoryTabs = document.querySelectorAll('.category-tab');
    const caseCards = document.querySelectorAll('.case-card');
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Hapus kelas active dari semua tab
            categoryTabs.forEach(t => t.classList.remove('active'));
            
            // Tambahkan kelas active ke tab yang diklik
            tab.classList.add('active');
            
            const category = tab.getAttribute('data-category');
            
            // Filter kasus berdasarkan kategori
            if (category === 'all') {
                showAllCases();
            } else {
                filterCasesByCategory(category);
            }
        });
    });
}

/**
 * Tampilkan semua kasus
 */
function showAllCases() {
    const caseCards = document.querySelectorAll('.case-card');
    caseCards.forEach(card => {
        card.style.display = 'block';
        
        // Animasi sederhana untuk tampilan yang lebih menarik
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 50);
    });
}

/**
 * Filter kasus berdasarkan kategori
 * @param {string} category - Kategori kasus (common, advanced, emergency)
 */
function filterCasesByCategory(category) {
    const caseCards = document.querySelectorAll('.case-card');
    
    caseCards.forEach(card => {
        const cardCategories = card.getAttribute('data-category');
        
        if (cardCategories && cardCategories.includes(category)) {
            card.style.display = 'block';
            
            // Animasi sederhana ketika kasus ditampilkan
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        } else {
            // Sembunyikan kasus yang tidak sesuai kategori
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

/**
 * Inisialisasi fungsionalitas pencarian
 */
function initSearchFunctionality() {
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    const searchToggle = document.getElementById('search-toggle');
    const searchContainer = document.getElementById('search-container');
    
    // Toggle tampilan search box
    searchToggle.addEventListener('click', (e) => {
        e.preventDefault();
        searchContainer.classList.toggle('visible');
        if (searchContainer.classList.contains('visible')) {
            searchInput.focus();
        }
    });
    
    // Fungsi pencarian ketika tombol search diklik
    searchButton.addEventListener('click', () => {
        performSearch(searchInput.value);
    });
    
    // Fungsi pencarian ketika tombol Enter ditekan
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            performSearch(searchInput.value);
        }
    });
}

/**
 * Melakukan pencarian pada kasus-kasus
 * @param {string} query - Kata kunci pencarian
 */
function performSearch(query) {
    if (!query) return;
    
    query = query.toLowerCase();
    const caseCards = document.querySelectorAll('.case-card');
    let hasResults = false;
    
    caseCards.forEach(card => {
        const cardTitle = card.querySelector('h3').textContent.toLowerCase();
        const cardDesc = card.querySelector('p').textContent.toLowerCase();
        
        if (cardTitle.includes(query) || cardDesc.includes(query)) {
            card.style.display = 'block';
            // Highlight hasil pencarian dengan animasi
            card.classList.add('highlight');
            setTimeout(() => {
                card.classList.remove('highlight');
            }, 1500);
            hasResults = true;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Jika tidak ada hasil, tampilkan pesan
    if (!hasResults) {
        showSearchNotification('Tidak ditemukan kasus yang sesuai dengan pencarian');
    }
}

/**
 * Menampilkan notifikasi hasil pencarian
 * @param {string} message - Pesan notifikasi
 */
function showSearchNotification(message) {
    // Cek apakah sudah ada notifikasi
    let notification = document.querySelector('.search-notification');
    
    if (!notification) {
        // Buat elemen notifikasi baru jika belum ada
        notification = document.createElement('div');
        notification.className = 'search-notification';
        document.querySelector('.case-section').prepend(notification);
    }
    
    // Tampilkan pesan dan hilangkan setelah beberapa detik
    notification.textContent = message;
    notification.classList.add('visible');
    
    setTimeout(() => {
        notification.classList.remove('visible');
    }, 3000);
}

// Tambahkan CSS untuk elemen yang diperlukan oleh JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .case-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        
        .highlight {
            animation: highlightAnimation 1.5s;
        }
        
        @keyframes highlightAnimation {
            0% { box-shadow: 0 0 0 2px #FFB700; }
            50% { box-shadow: 0 0 15px 5px #FFB700; }
            100% { box-shadow: 0 0 0 2px #FFB700; }
        }
        
        .search-notification {
            background-color: rgba(29, 29, 29, 0.9);
            color: #fff;
            border-left: 4px solid #FFB700;
            padding: 12px 20px;
            margin-bottom: 20px;
            border-radius: 4px;
            opacity: 0;
            transform: translateY(-10px);
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        
        .search-notification.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});
