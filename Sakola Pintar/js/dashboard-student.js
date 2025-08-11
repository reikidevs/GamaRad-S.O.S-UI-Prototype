// Dashboard Student JavaScript - Extends Base Dashboard

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
    
    // Load dashboard data immediately
    loadDashboardData();
    
    // Initialize welcome message
    updateWelcomeMessage();
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
                targetContent.classList.add('active');
            }
            
            // Update page title
            const titles = {
                'dashboard': 'Dashboard',
                'schedule': 'Jadwal Kelas',
                'subjects': 'Mata Pelajaran',
                'assignments': 'Tugas',
                'grades': 'Nilai',
                'attendance': 'Kehadiran',
                'materials': 'Materi',
                'library': 'Perpustakaan',
                'payments': 'Pembayaran',
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
        case 'view-assignments':
            navigateToPage('assignments');
            break;
        case 'view-grades':
            navigateToPage('grades');
            break;
        case 'view-schedule':
            navigateToPage('schedule');
            break;
        case 'view-materials':
            navigateToPage('materials');
            break;
        case 'view-library':
            navigateToPage('library');
            break;
        case 'view-payments':
            navigateToPage('payments');
            break;
        default:
            showNotification('Fitur sedang dalam pengembangan', 'info');
    }
}

// Navigate to specific page
function navigateToPage(page) {
    const targetLink = document.querySelector(`[data-page="${page}"]`);
    if (targetLink) {
        targetLink.click();
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
    if (userData.role !== 'student' && userData.role !== 'admin') {
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

// Update welcome message
function updateWelcomeMessage() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser') || '{}');
    const welcomeContent = document.querySelector('.welcome-content h2');
    
    if (welcomeContent && currentUser.name) {
        const firstName = currentUser.name.split(' ')[0];
        welcomeContent.textContent = `Selamat Datang, ${firstName}! 👋`;
    }
}

// Load dashboard data
function loadDashboardData() {
    // Simulate loading dashboard data
    const dashboardData = {
        stats: {
            averageGrade: 85.5,
            attendance: 96,
            completedAssignments: 12,
            classRank: 5
        },
        todaySchedule: [
            {
                time: '08:00 - 09:30',
                subject: 'Matematika',
                teacher: 'Pak Budi',
                room: '201',
                topic: 'Integral',
                status: 'current'
            },
            {
                time: '10:00 - 11:30',
                subject: 'Bahasa Indonesia',
                teacher: 'Bu Sari',
                room: '202',
                topic: 'Teks Argumentasi',
                status: 'upcoming'
            },
            {
                time: '13:00 - 14:30',
                subject: 'Fisika',
                teacher: 'Pak Andi',
                room: 'Lab Fisika',
                topic: 'Gelombang',
                status: 'upcoming'
            }
        ],
        pendingAssignments: [
            {
                title: 'Latihan Integral',
                subject: 'Matematika',
                teacher: 'Pak Budi',
                deadline: '26 Nov 2024',
                daysLeft: 1,
                priority: 'urgent'
            },
            {
                title: 'Essay Teks Argumentasi',
                subject: 'Bahasa Indonesia',
                teacher: 'Bu Sari',
                deadline: '28 Nov 2024',
                daysLeft: 3,
                priority: 'normal'
            },
            {
                title: 'Laporan Praktikum Gelombang',
                subject: 'Fisika',
                teacher: 'Pak Andi',
                deadline: '30 Nov 2024',
                daysLeft: 5,
                priority: 'normal'
            }
        ],
        recentGrades: [
            {
                title: 'Quiz Trigonometri',
                subject: 'Matematika',
                date: '20 Nov 2024',
                score: 92,
                grade: 'A'
            },
            {
                title: 'UTS Bahasa Indonesia',
                subject: 'Bahasa Indonesia',
                date: '18 Nov 2024',
                score: 85,
                grade: 'B+'
            },
            {
                title: 'Praktikum Fisika',
                subject: 'Fisika',
                date: '15 Nov 2024',
                score: 88,
                grade: 'B+'
            }
        ]
    };
    
    // Update stats
    updateDashboardStats(dashboardData.stats);
    
    // Update schedule
    updateTodaySchedule(dashboardData.todaySchedule);
    
    // Update assignments
    updatePendingAssignments(dashboardData.pendingAssignments);
    
    // Update grades
    updateRecentGrades(dashboardData.recentGrades);
}

// Update dashboard stats
function updateDashboardStats(stats) {
    const statCards = document.querySelectorAll('.stat-card');
    const values = [stats.averageGrade, `${stats.attendance}%`, stats.completedAssignments, stats.classRank];
    
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
                <p>${item.teacher} • ${item.room}</p>
                <span class="topic">${item.topic}</span>
            </div>
            <div class="schedule-actions">
                <button class="btn-icon" title="${item.status === 'current' ? 'Join Kelas' : 'Lihat Detail'}">
                    <i class="fas ${item.status === 'current' ? 'fa-video' : 'fa-eye'}"></i>
                </button>
            </div>
        `;
        
        scheduleList.appendChild(scheduleItem);
    });
}

// Update pending assignments
function updatePendingAssignments(assignments) {
    const assignmentList = document.querySelector('.assignment-list');
    if (!assignmentList) return;
    
    assignmentList.innerHTML = '';
    
    assignments.forEach(assignment => {
        const assignmentItem = document.createElement('div');
        assignmentItem.className = `assignment-item ${assignment.priority}`;
        
        assignmentItem.innerHTML = `
            <div class="assignment-info">
                <h4>${assignment.title}</h4>
                <p>${assignment.subject} • ${assignment.teacher}</p>
                <div class="assignment-meta">
                    <span class="deadline">Deadline: ${assignment.deadline}</span>
                    <span class="time-left">${assignment.daysLeft} hari lagi</span>
                </div>
            </div>
            <div class="assignment-actions">
                <button class="btn-small btn-primary">Kerjakan</button>
            </div>
        `;
        
        assignmentList.appendChild(assignmentItem);
    });
}

// Update recent grades
function updateRecentGrades(grades) {
    const gradesList = document.querySelector('.grades-list');
    if (!gradesList) return;
    
    gradesList.innerHTML = '';
    
    grades.forEach(grade => {
        const gradeItem = document.createElement('div');
        gradeItem.className = 'grade-item';
        
        const gradeClass = grade.score >= 90 ? 'excellent' : grade.score >= 80 ? 'good' : 'average';
        
        gradeItem.innerHTML = `
            <div class="grade-info">
                <h4>${grade.title}</h4>
                <p>${grade.subject} • ${grade.date}</p>
            </div>
            <div class="grade-score ${gradeClass}">
                <span class="score">${grade.score}</span>
                <span class="grade">${grade.grade}</span>
            </div>
        `;
        
        gradesList.appendChild(gradeItem);
    });
}

// Load page-specific data
function loadPageData(page) {
    switch(page) {
        case 'schedule':
            loadScheduleData();
            break;
        case 'subjects':
            loadSubjectsData();
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
        case 'materials':
            loadMaterialsData();
            break;
        case 'library':
            loadLibraryData();
            break;
        case 'payments':
            loadPaymentsData();
            break;
        case 'profile':
            loadProfileData();
            break;
    }
}

// Load specific page data functions
function loadScheduleData() {
    console.log('Loading schedule data...');
}

function loadSubjectsData() {
    console.log('Loading subjects data...');
}

function loadAssignmentsData() {
    console.log('Loading assignments data...');
}

function loadGradesData() {
    console.log('Loading grades data...');
}

function loadAttendanceData() {
    console.log('Loading attendance data...');
}

function loadMaterialsData() {
    console.log('Loading materials data...');
}

function loadLibraryData() {
    console.log('Loading library data...');
}

function loadPaymentsData() {
    console.log('Loading payments data...');
}

function loadProfileData() {
    console.log('Loading profile data...');
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

// Assignment interaction
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-small') && e.target.textContent === 'Kerjakan') {
        e.preventDefault();
        const assignmentTitle = e.target.closest('.assignment-item').querySelector('h4').textContent;
        showNotification(`Membuka tugas: ${assignmentTitle}`, 'info');
    }
});

// Grade interaction
document.addEventListener('click', (e) => {
    if (e.target.closest('.grade-item')) {
        const gradeItem = e.target.closest('.grade-item');
        const gradeTitle = gradeItem.querySelector('h4').textContent;
        showNotification(`Melihat detail nilai: ${gradeTitle}`, 'info');
    }
});

// Schedule interaction
document.addEventListener('click', (e) => {
    if (e.target.closest('.schedule-actions .btn-icon')) {
        const scheduleItem = e.target.closest('.schedule-item');
        const subject = scheduleItem.querySelector('h4').textContent;
        const isCurrentClass = scheduleItem.classList.contains('current');
        
        if (isCurrentClass) {
            showNotification(`Bergabung ke kelas ${subject}...`, 'success');
        } else {
            showNotification(`Melihat detail kelas ${subject}`, 'info');
        }
    }
});

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
        case 'dashboard-content':
            searchDashboard(searchTerm);
            break;
        default:
            console.log(`Search in ${pageId}: ${searchTerm}`);
    }
}

function searchDashboard(searchTerm) {
    // Search in assignments
    const assignmentItems = document.querySelectorAll('.assignment-item');
    assignmentItems.forEach(item => {
        const title = item.querySelector('h4').textContent.toLowerCase();
        const subject = item.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || subject.includes(searchTerm)) {
            item.style.display = 'flex';
        } else {
            item.style.display = searchTerm ? 'none' : 'flex';
        }
    });
    
    // Search in schedule
    const scheduleItems = document.querySelectorAll('.schedule-item');
    scheduleItems.forEach(item => {
        const subject = item.querySelector('h4').textContent.toLowerCase();
        const teacher = item.querySelector('p').textContent.toLowerCase();
        
        if (subject.includes(searchTerm) || teacher.includes(searchTerm)) {
            item.style.display = 'flex';
        } else {
            item.style.display = searchTerm ? 'none' : 'flex';
        }
    });
}

// Console welcome message
console.log(`
👨‍🎓 Dashboard Siswa - Sakola Pintar
📚 Belajar dengan mudah dan menyenangkan
🚀 Versi: 1.0.0
💻 Dikembangkan dengan ❤️
`);