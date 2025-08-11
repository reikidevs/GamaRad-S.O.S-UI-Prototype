// Dashboard Admin JavaScript - Extends Base Dashboard

// Navigation handling - menggunakan base template
document.addEventListener('DOMContentLoaded', () => {
    // Gunakan base initialization
    if (window.DashboardBase) {
        window.DashboardBase.initializeDashboard();
        window.DashboardBase.setupNavigation();
        window.DashboardBase.setupMobileMenu();
        window.DashboardBase.checkUserAuth();
        window.DashboardBase.setupQuickActions();
    } else {
        // Fallback jika base tidak tersedia
        initializeDashboard();
        setupNavigation();
        setupMobileMenu();
        checkUserAuth();
    }
    
    // Remove flash by adding loaded class - konsisten dengan base
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Initialize dashboard
function initializeDashboard() {
    // Update user info
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser') || '{}');
    if (currentUser.name) {
        const userNameElement = document.getElementById('userName');
        if (userNameElement) {
            userNameElement.textContent = currentUser.name;
        }
    }
    
    // Initialize current time
    updateCurrentTime();
    setInterval(updateCurrentTime, 60000); // Update every minute
    
    // Load dashboard data
    loadDashboardData();
}

// Setup navigation
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
            
            // Show target content page with smooth transition
            contentPages.forEach(page => {
                page.classList.remove('active');
            });
            
            // Immediate transition without delay
            const targetContent = document.getElementById(`${targetPage}-content`);
            if (targetContent) {
                // Force reflow to ensure transition works
                targetContent.offsetHeight;
                targetContent.classList.add('active');
            }
            
            // Update page title
            if (pageTitle) {
                const linkText = link.textContent.trim();
                pageTitle.textContent = linkText;
            }
        });
    });
}

// Setup mobile menu
function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    
    if (mobileMenuBtn && sidebar) {
        mobileMenuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('mobile-hidden');
            if (overlay) {
                overlay.classList.toggle('active');
            }
        });
    }
    
    if (overlay) {
        overlay.addEventListener('click', () => {
            sidebar.classList.add('mobile-hidden');
            overlay.classList.remove('active');
        });
    }
    
    // Close mobile menu when clicking nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                sidebar.classList.add('mobile-hidden');
                if (overlay) {
                    overlay.classList.remove('active');
                }
            }
        });
    });
}

// Update current time
function updateCurrentTime() {
    const timeElement = document.getElementById('currentTime');
    if (timeElement) {
        const now = new Date();
        const timeString = now.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit'
        });
        timeElement.textContent = timeString;
    }
}

// Load dashboard data
function loadDashboardData() {
    // Simulate loading dashboard statistics
    const stats = {
        totalStudents: 1247,
        totalTeachers: 89,
        totalClasses: 42,
        pendingPayments: 156
    };
    
    // Add loading delay to prevent flash
    setTimeout(() => {
        // Update statistics cards
        updateStatCard('totalStudents', stats.totalStudents, 'Siswa Aktif');
        updateStatCard('totalTeachers', stats.totalTeachers, 'Guru & Staff');
        updateStatCard('totalClasses', stats.totalClasses, 'Kelas Aktif');
        updateStatCard('pendingPayments', stats.pendingPayments, 'Pembayaran Pending');
        
        // Load recent activities
        loadRecentActivities();
        
        // Load pending payments
        loadPendingPayments();
        
        // Load today's schedule
        loadTodaySchedule();
    }, 200);
}

// Update stat card
function updateStatCard(id, value, label) {
    const card = document.getElementById(id);
    if (card) {
        const valueElement = card.querySelector('.stat-value');
        const labelElement = card.querySelector('.stat-label');
        
        if (valueElement) {
            // Animate number counting
            animateNumber(valueElement, 0, value, 1000);
        }
        
        if (labelElement) {
            labelElement.textContent = label;
        }
    }
}

// Animate number counting
function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * progress);
        element.textContent = current.toLocaleString('id-ID');
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Load recent activities
function loadRecentActivities() {
    const activities = [
        {
            icon: 'fas fa-user-plus',
            text: 'Siswa baru mendaftar: Ahmad Rizki',
            time: '5 menit yang lalu',
            type: 'success'
        },
        {
            icon: 'fas fa-credit-card',
            text: 'Pembayaran SPP diterima dari Siti Nurhaliza',
            time: '15 menit yang lalu',
            type: 'info'
        },
        {
            icon: 'fas fa-chalkboard-teacher',
            text: 'Guru baru bergabung: Dr. Budi Santoso',
            time: '1 jam yang lalu',
            type: 'success'
        },
        {
            icon: 'fas fa-exclamation-triangle',
            text: 'Sistem backup selesai dengan warning',
            time: '2 jam yang lalu',
            type: 'warning'
        }
    ];
    
    const activityList = document.getElementById('activityList');
    if (activityList) {
        activityList.innerHTML = activities.map(activity => `
            <div class="activity-item ${activity.type}">
                <div class="activity-icon">
                    <i class="${activity.icon}"></i>
                </div>
                <div class="activity-content">
                    <p class="activity-text">${activity.text}</p>
                    <span class="activity-time">${activity.time}</span>
                </div>
            </div>
        `).join('');
    }
}

// Load pending payments
function loadPendingPayments() {
    const payments = [
        { name: 'Ahmad Rizki', class: 'X-A', amount: 500000, type: 'SPP' },
        { name: 'Siti Nurhaliza', class: 'XI-B', amount: 750000, type: 'Uang Gedung' },
        { name: 'Budi Santoso', class: 'XII-C', amount: 500000, type: 'SPP' },
        { name: 'Dewi Sartika', class: 'X-B', amount: 300000, type: 'Seragam' }
    ];
    
    const paymentList = document.getElementById('paymentList');
    if (paymentList) {
        paymentList.innerHTML = payments.map(payment => `
            <div class="payment-item">
                <div class="payment-info">
                    <h4>${payment.name}</h4>
                    <p>Kelas ${payment.class} - ${payment.type}</p>
                </div>
                <div class="payment-amount">
                    <span>Rp ${payment.amount.toLocaleString('id-ID')}</span>
                    <button class="btn btn-sm btn-primary">Tagih</button>
                </div>
            </div>
        `).join('');
    }
}

// Load today's schedule
function loadTodaySchedule() {
    const schedule = [
        { time: '07:00', event: 'Upacara Bendera', location: 'Lapangan' },
        { time: '08:00', event: 'Rapat Guru', location: 'Ruang Guru' },
        { time: '10:00', event: 'Kunjungan Orang Tua', location: 'Ruang Kepala Sekolah' },
        { time: '13:00', event: 'Ekstrakurikuler', location: 'Berbagai Ruang' },
        { time: '15:00', event: 'Rapat Komite', location: 'Aula' }
    ];
    
    const scheduleList = document.getElementById('scheduleList');
    if (scheduleList) {
        scheduleList.innerHTML = schedule.map(item => `
            <div class="schedule-item">
                <div class="schedule-time">${item.time}</div>
                <div class="schedule-content">
                    <h4>${item.event}</h4>
                    <p><i class="fas fa-map-marker-alt"></i> ${item.location}</p>
                </div>
            </div>
        `).join('');
    }
}

// Check user authentication
function checkUserAuth() {
    const currentUser = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
    
    if (!currentUser) {
        showNotification('Sesi Anda telah berakhir. Silakan login kembali.', 'warning');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
        return;
    }
    
    const userData = JSON.parse(currentUser);
    if (userData.role !== 'admin') {
        showNotification('Akses ditolak. Anda tidak memiliki izin admin.', 'error');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
        return;
    }
}

// Logout function
function logout() {
    if (confirm('Apakah Anda yakin ingin keluar?')) {
        localStorage.removeItem('currentUser');
        sessionStorage.removeItem('currentUser');
        showNotification('Logout berhasil', 'success');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1000);
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Add notification styles
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--white);
        border-radius: 12px;
        box-shadow: var(--shadow-lg);
        padding: 1rem 1.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        z-index: 10000;
        min-width: 300px;
        animation: slideInRight 0.3s ease;
        border-left: 4px solid var(--primary-color);
    }
    
    .notification.success {
        border-left-color: var(--success-color);
    }
    
    .notification.error {
        border-left-color: var(--danger-color);
    }
    
    .notification.warning {
        border-left-color: var(--warning-color);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex: 1;
    }
    
    .notification-content i {
        font-size: 1.2rem;
    }
    
    .notification.success .notification-content i {
        color: var(--success-color);
    }
    
    .notification.error .notification-content i {
        color: var(--danger-color);
    }
    
    .notification.warning .notification-content i {
        color: var(--warning-color);
    }
    
    .notification.info .notification-content i {
        color: var(--primary-color);
    }
    
    .notification-close {
        background: none;
        border: none;
        color: var(--gray-500);
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        transition: all 0.3s ease;
    }
    
    .notification-close:hover {
        background: var(--gray-100);
        color: var(--gray-700);
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Console welcome message
console.log(`
👨‍💼 Dashboard Admin - Sakola Pintar
🎓 Platform Manajemen Sekolah Modern
🚀 Versi: 1.0.0
💻 Dikembangkan dengan ❤️
`);