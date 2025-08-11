// Base Dashboard JavaScript - Template untuk semua role
// Digunakan untuk Admin, Guru, dan Siswa

// Navigation handling - Konsisten untuk semua role
document.addEventListener('DOMContentLoaded', () => {
    initializeDashboard();
    setupNavigation();
    setupMobileMenu();
    checkUserAuth();
    
    // Simple flash prevention - sama seperti admin
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Initialize dashboard - Base function
function initializeDashboard() {
    // Update user info
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser') || '{}');
    if (currentUser.name) {
        const userNameElement = document.getElementById('userName');
        const headerUserNameElement = document.getElementById('headerUserName');
        const welcomeUserNameElement = document.getElementById('welcomeUserName');
        
        if (userNameElement) userNameElement.textContent = currentUser.name;
        if (headerUserNameElement) headerUserNameElement.textContent = currentUser.name;
        if (welcomeUserNameElement) welcomeUserNameElement.textContent = currentUser.name;
    }
    
    // Initialize current time
    updateCurrentTime();
    setInterval(updateCurrentTime, 60000); // Update every minute
    
    // Load dashboard data
    loadDashboardData();
    
    // Initialize welcome message
    updateWelcomeMessage();
}

// Setup navigation - Konsisten untuk semua role
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentPages = document.querySelectorAll('.content-page');
    const pageTitle = document.getElementById('pageTitle');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetPage = link.getAttribute('data-page');
            
            // Update active nav item
            navLinks.forEach(nav => nav.parentElement.classList.remove('active'));
            link.parentElement.classList.add('active');
            
            // Show target content page
            contentPages.forEach(page => page.classList.remove('active'));
            
            const targetContent = document.getElementById(`${targetPage}-content`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
            
            // Update page title
            const titles = {
                'dashboard': 'Dashboard',
                'students': 'Manajemen Siswa',
                'teachers': 'Manajemen Guru',
                'classes': 'Manajemen Kelas',
                'subjects': 'Mata Pelajaran',
                'schedule': 'Jadwal Kelas',
                'assignments': 'Tugas',
                'grades': 'Nilai',
                'attendance': 'Kehadiran',
                'materials': 'Materi',
                'library': 'Perpustakaan',
                'payments': 'Pembayaran',
                'reports': 'Laporan',
                'settings': 'Pengaturan',
                'profile': 'Profil'
            };
            
            if (pageTitle && titles[targetPage]) {
                pageTitle.textContent = titles[targetPage];
            }
        });
    });
}

// Setup mobile menu - Konsisten untuk semua role
function setupMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('mobile-open');
        });
    }
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            !sidebar.contains(e.target) && 
            !mobileMenuToggle.contains(e.target)) {
            sidebar.classList.remove('mobile-open');
        }
    });
}

// Update current time - Konsisten untuk semua role
function updateCurrentTime() {
    const currentTimeElement = document.getElementById('currentTime');
    if (currentTimeElement) {
        const now = new Date();
        const timeString = now.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit'
        });
        currentTimeElement.textContent = timeString;
    }
}

// Load dashboard data - Base function, bisa di-override per role
function loadDashboardData() {
    // Base implementation - akan di-extend per role
    console.log('Loading dashboard data...');
}

// Update welcome message - Base function
function updateWelcomeMessage() {
    const welcomeMessageElement = document.getElementById('welcomeMessage');
    if (welcomeMessageElement) {
        let message = '';
        
        // Use config if available
        if (window.TemplateConfig && window.TemplateConfig.utils) {
            message = window.TemplateConfig.utils.getWelcomeMessage();
        } else {
            // Fallback message
            const hour = new Date().getHours();
            if (hour < 12) {
                message = 'Selamat pagi! Semoga hari ini menjadi hari yang produktif.';
            } else if (hour < 17) {
                message = 'Selamat siang! Tetap semangat dalam aktivitas hari ini.';
            } else {
                message = 'Selamat sore! Semoga hari ini telah berjalan dengan baik.';
            }
        }
        
        welcomeMessageElement.textContent = message;
    }
}

// Check user authentication - Konsisten untuk semua role
function checkUserAuth() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser') || '{}');
    
    if (!currentUser.email) {
        // Redirect to login if not authenticated
        window.location.href = 'login.html';
        return;
    }
    
    // Update user role display
    const userRoleElements = document.querySelectorAll('.user-role, .profile-role');
    userRoleElements.forEach(element => {
        if (currentUser.role) {
            element.textContent = currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1);
        }
    });
}

// Logout function - Konsisten untuk semua role
function logout() {
    if (confirm('Apakah Anda yakin ingin keluar?')) {
        localStorage.removeItem('currentUser');
        sessionStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    }
}

// Notification handling - Base function
function setupNotifications() {
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationDropdown = document.getElementById('notificationDropdown');
    
    if (notificationBtn && notificationDropdown) {
        notificationBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            notificationDropdown.classList.toggle('show');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            notificationDropdown.classList.remove('show');
        });
    }
}

// Quick actions setup - Base function
function setupQuickActions() {
    // Base implementation - bisa di-extend per role
    setupNotifications();
}

// Utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Export functions for use in role-specific files
window.DashboardBase = {
    initializeDashboard,
    setupNavigation,
    setupMobileMenu,
    updateCurrentTime,
    loadDashboardData,
    updateWelcomeMessage,
    checkUserAuth,
    logout,
    setupNotifications,
    setupQuickActions,
    showNotification
};