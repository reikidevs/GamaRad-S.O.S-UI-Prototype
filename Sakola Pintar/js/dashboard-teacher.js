// Dashboard Teacher JavaScript - Extends Base Dashboard

// Navigation handling - menggunakan base template
document.addEventListener('DOMContentLoaded', () => {
    // Gunakan base initialization - sama seperti admin
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
        setupQuickActions();
    }
    
    // Remove flash by adding loaded class - konsisten dengan admin
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Initialize dashboard
function initializeDashboard() {
    // Update user info
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser') || '{}');
    if (currentUser.name) {
        document.getElementById('userName').textContent = currentUser.name;
    }
    
    // Initialize current time
    updateCurrentTime();
    setInterval(updateCurrentTime, 60000); // Update every minute
    
    // Load dashboard data with delay to prevent flash
    setTimeout(() => {
        loadDashboardData();
    }, 200);
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
            contentPages.forEach(page => page.classList.remove('active'));
            
            const targetContent = document.getElementById(`${targetPage}-content`);
            if (targetContent) {
                // Force reflow to ensure transition works
                targetContent.offsetHeight;
                targetContent.classList.add('active');
            }
            
            // Update page title
            const titles = {
                'dashboard': 'Dashboard',
                'classes': 'Kelas Saya',
                'subjects': 'Mata Pelajaran',
                'materials': 'Materi Ajar',
                'assignments': 'Tugas',
                'grades': 'Penilaian',
                'attendance': 'Kehadiran',
                'schedule': 'Jadwal',
                'reports': 'Laporan',
                'profile': 'Profil'
            };
            pageTitle.textContent = titles[targetPage] || 'Dashboard';
            
            // Load page-specific data
            loadPageData(targetPage);
        });
    });
}

// Setup quick actions
function setupQuickActions() {
    const actionButtons = document.querySelectorAll('.action-btn');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const action = button.getAttribute('data-action');
            handleQuickAction(action);
        });
    });
}

// Handle quick actions
function handleQuickAction(action) {
    switch(action) {
        case 'create-material':
            showCreateMaterialModal();
            break;
        case 'create-assignment':
            showCreateAssignmentModal();
            break;
        case 'take-attendance':
            showAttendanceModal();
            break;
        case 'grade-assignments':
            navigateToGrading();
            break;
        case 'send-announcement':
            showAnnouncementModal();
            break;
        case 'view-reports':
            navigateToReports();
            break;
        default:
            showNotification('Fitur sedang dalam pengembangan', 'info');
    }
}

// Setup mobile menu
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    
    mobileMenuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('mobile-hidden');
    });
    
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
    });
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                sidebar.classList.add('mobile-hidden');
            }
        }
    });
}

// Check user authentication
function checkUserAuth() {
    const currentUser = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
    
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }
    
    const userData = JSON.parse(currentUser);
    if (userData.role !== 'teacher' && userData.role !== 'admin') {
        showNotification('Akses ditolak. Anda tidak memiliki izin untuk mengakses halaman ini.', 'error');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    }
}

// Update current time
function updateCurrentTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const dateString = now.toLocaleDateString('id-ID', options);
    
    const dateElements = document.querySelectorAll('.card-date');
    dateElements.forEach(element => {
        element.textContent = dateString;
    });
}

// Load dashboard data
function loadDashboardData() {
    // Simulate loading dashboard data
    const dashboardData = {
        stats: {
            activeClasses: 6,
            totalStudents: 180,
            pendingTasks: 12,
            averageAttendance: 92
        },
        todaySchedule: [
            {
                time: '08:00 - 09:30',
                subject: 'Matematika',
                class: 'X-A',
                room: '101',
                topic: 'Trigonometri Dasar',
                status: 'current'
            },
            {
                time: '10:00 - 11:30',
                subject: 'Matematika',
                class: 'X-B',
                room: '102',
                topic: 'Trigonometri Dasar',
                status: 'upcoming'
            },
            {
                time: '13:00 - 14:30',
                subject: 'Matematika',
                class: 'XI-A',
                room: '201',
                topic: 'Integral',
                status: 'upcoming'
            }
        ],
        recentActivities: [
            {
                icon: 'fas fa-file-upload',
                text: 'Materi "Trigonometri Dasar" berhasil diupload',
                time: '30 menit yang lalu'
            },
            {
                icon: 'fas fa-check-circle',
                text: '15 tugas dari Kelas X-A telah dinilai',
                time: '2 jam yang lalu'
            },
            {
                icon: 'fas fa-calendar-plus',
                text: 'Tugas baru "Latihan Integral" telah dibuat',
                time: '4 jam yang lalu'
            }
        ]
    };
    
    // Update stats
    updateDashboardStats(dashboardData.stats);
    
    // Update schedule
    updateTodaySchedule(dashboardData.todaySchedule);
    
    // Update activities
    updateRecentActivities(dashboardData.recentActivities);
}

// Update dashboard stats
function updateDashboardStats(stats) {
    const statCards = document.querySelectorAll('.stat-card');
    const values = [stats.activeClasses, stats.totalStudents, stats.pendingTasks, `${stats.averageAttendance}%`];
    
    statCards.forEach((card, index) => {
        const valueElement = card.querySelector('h3');
        if (valueElement && values[index] !== undefined) {
            animateCounter(valueElement, values[index]);
        }
    });
}

// Update today's schedule
function updateTodaySchedule(schedule) {
    const scheduleList = document.querySelector('.schedule-list');
    if (!scheduleList) return;
    
    scheduleList.innerHTML = '';
    
    schedule.forEach(item => {
        const scheduleItem = document.createElement('div');
        scheduleItem.className = `schedule-item ${item.status}`;
        
        scheduleItem.innerHTML = `
            <div class="schedule-time">
                <span class="time">${item.time}</span>
                <span class="status">${item.status === 'current' ? 'Sedang Berlangsung' : 'Akan Datang'}</span>
            </div>
            <div class="schedule-info">
                <h4>${item.subject}</h4>
                <p>${item.class} • Ruang ${item.room}</p>
                <span class="topic">${item.topic}</span>
            </div>
            <div class="schedule-actions">
                <button class="btn-icon" title="${item.status === 'current' ? 'Mulai Kelas' : 'Lihat Detail'}">
                    <i class="fas ${item.status === 'current' ? 'fa-play' : 'fa-eye'}"></i>
                </button>
            </div>
        `;
        
        scheduleList.appendChild(scheduleItem);
    });
}

// Update recent activities
function updateRecentActivities(activities) {
    const activityList = document.querySelector('.activity-list');
    if (!activityList) return;
    
    activityList.innerHTML = '';
    
    activities.forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        
        activityItem.innerHTML = `
            <div class="activity-icon">
                <i class="${activity.icon}"></i>
            </div>
            <div class="activity-info">
                <p>${activity.text}</p>
                <span class="activity-time">${activity.time}</span>
            </div>
        `;
        
        activityList.appendChild(activityItem);
    });
}

// Load page-specific data
function loadPageData(page) {
    switch(page) {
        case 'classes':
            loadClassesData();
            break;
        case 'subjects':
            loadSubjectsData();
            break;
        case 'materials':
            loadMaterialsData();
            break;
        case 'assignments':
            loadAssignmentsData();
            break;
        case 'grades':
            loadGradesData();
            break;
        case 'attendance':
            loadAttendanceData();
            break;
        case 'schedule':
            loadScheduleData();
            break;
        case 'reports':
            loadReportsData();
            break;
        case 'profile':
            loadProfileData();
            break;
    }
}

// Load classes data
function loadClassesData() {
    // Simulate loading classes data
    console.log('Loading classes data...');
}

// Load subjects data
function loadSubjectsData() {
    // Simulate loading subjects data
    console.log('Loading subjects data...');
}

// Load materials data
function loadMaterialsData() {
    // Simulate loading materials data
    console.log('Loading materials data...');
}

// Load assignments data
function loadAssignmentsData() {
    // Simulate loading assignments data
    console.log('Loading assignments data...');
}

// Load grades data
function loadGradesData() {
    // Simulate loading grades data
    console.log('Loading grades data...');
}

// Load attendance data
function loadAttendanceData() {
    // Simulate loading attendance data
    console.log('Loading attendance data...');
}

// Load schedule data
function loadScheduleData() {
    // Simulate loading schedule data
    console.log('Loading schedule data...');
}

// Load reports data
function loadReportsData() {
    // Simulate loading reports data
    console.log('Loading reports data...');
}

// Load profile data
function loadProfileData() {
    // Simulate loading profile data
    console.log('Loading profile data...');
}

// Modal functions
function showCreateMaterialModal() {
    showNotification('Modal Buat Materi akan segera tersedia', 'info');
}

function showCreateAssignmentModal() {
    showNotification('Modal Buat Tugas akan segera tersedia', 'info');
}

function showAttendanceModal() {
    showNotification('Modal Absensi akan segera tersedia', 'info');
}

function showAnnouncementModal() {
    showNotification('Modal Pengumuman akan segera tersedia', 'info');
}

// Navigation functions
function navigateToGrading() {
    // Simulate navigation to grading page
    const gradesLink = document.querySelector('[data-page="grades"]');
    if (gradesLink) {
        gradesLink.click();
    }
}

function navigateToReports() {
    // Simulate navigation to reports page
    const reportsLink = document.querySelector('[data-page="reports"]');
    if (reportsLink) {
        reportsLink.click();
    }
}

// Counter animation
function animateCounter(element, target) {
    const isPercentage = typeof target === 'string' && target.includes('%');
    const numericTarget = isPercentage ? parseInt(target) : target;
    
    let start = 0;
    const increment = numericTarget / 30; // 30 frames
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= numericTarget) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = isPercentage ? Math.floor(start) + '%' : Math.floor(start);
        }
    }, 50);
}

// Logout function
function logout() {
    if (confirm('Apakah Anda yakin ingin keluar?')) {
        localStorage.removeItem('currentUser');
        sessionStorage.removeItem('currentUser');
        showNotification('Berhasil logout', 'success');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1000);
    }
}

// Notification function (reuse from auth.js)
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--success-color)' : type === 'error' ? 'var(--danger-color)' : 'var(--primary-color)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        min-width: 300px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Handle window resize
window.addEventListener('resize', () => {
    const sidebar = document.getElementById('sidebar');
    if (window.innerWidth > 768) {
        sidebar.classList.remove('mobile-hidden');
    }
});

// Search functionality
document.addEventListener('DOMContentLoaded', () => {
    const searchInputs = document.querySelectorAll('input[type="text"][placeholder*="Cari"]');
    
    searchInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            // Implement search functionality based on current page
            handleSearch(searchTerm);
        });
    });
});

function handleSearch(searchTerm) {
    // Get current active page
    const activePage = document.querySelector('.content-page.active');
    if (!activePage) return;
    
    const pageId = activePage.id;
    
    // Implement search based on page
    switch(pageId) {
        case 'materials-content':
            searchMaterials(searchTerm);
            break;
        case 'classes-content':
            searchClasses(searchTerm);
            break;
        default:
            console.log(`Search in ${pageId}: ${searchTerm}`);
    }
}

function searchMaterials(searchTerm) {
    const materialCards = document.querySelectorAll('.material-card');
    
    materialCards.forEach(card => {
        const title = card.querySelector('h4').textContent.toLowerCase();
        const info = card.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || info.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = searchTerm ? 'none' : 'block';
        }
    });
}

function searchClasses(searchTerm) {
    const classCards = document.querySelectorAll('.class-card');
    
    classCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const subject = card.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || subject.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = searchTerm ? 'none' : 'block';
        }
    });
}

// Console welcome message
console.log(`
👨‍🏫 Dashboard Guru - Sakola Pintar
📚 Kelola kelas dan pembelajaran dengan mudah
🚀 Versi: 1.0.0
💻 Dikembangkan dengan ❤️
`);