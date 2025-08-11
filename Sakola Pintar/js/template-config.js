// Template Configuration - Sakola Pintar
// File ini berisi konfigurasi yang bisa disesuaikan untuk template

window.TemplateConfig = {
    // Aplikasi Info
    app: {
        name: 'Sakola Pintar',
        version: '1.0.0',
        description: 'Sistem Manajemen Sekolah',
        logo: 'fas fa-graduation-cap'
    },

    // Theme Configuration
    theme: {
        primaryColor: '#2563eb',
        secondaryColor: '#059669',
        accentColor: '#ea580c',
        darkMode: false,
        animations: true
    },

    // Flash Prevention Settings
    loading: {
        preloaderDelay: 100,        // Delay sebelum hide preloader (ms)
        transitionDuration: 300,    // Durasi transisi (ms)
        enablePreloader: true,      // Enable/disable preloader
        preloaderText: 'Memuat Dashboard...'
    },

    // Navigation Configuration per Role
    navigation: {
        admin: [
            { id: 'dashboard', icon: 'fas fa-tachometer-alt', label: 'Dashboard' },
            { id: 'students', icon: 'fas fa-user-graduate', label: 'Manajemen Siswa' },
            { id: 'teachers', icon: 'fas fa-chalkboard-teacher', label: 'Manajemen Guru' },
            { id: 'classes', icon: 'fas fa-school', label: 'Manajemen Kelas' },
            { id: 'subjects', icon: 'fas fa-book', label: 'Mata Pelajaran' },
            { id: 'reports', icon: 'fas fa-chart-bar', label: 'Laporan' },
            { id: 'settings', icon: 'fas fa-cog', label: 'Pengaturan' }
        ],
        teacher: [
            { id: 'dashboard', icon: 'fas fa-tachometer-alt', label: 'Dashboard' },
            { id: 'schedule', icon: 'fas fa-calendar-alt', label: 'Jadwal Mengajar' },
            { id: 'subjects', icon: 'fas fa-book', label: 'Mata Pelajaran' },
            { id: 'assignments', icon: 'fas fa-tasks', label: 'Tugas' },
            { id: 'grades', icon: 'fas fa-star', label: 'Nilai' },
            { id: 'attendance', icon: 'fas fa-calendar-check', label: 'Kehadiran' },
            { id: 'materials', icon: 'fas fa-file-alt', label: 'Materi' },
            { id: 'profile', icon: 'fas fa-user', label: 'Profil' }
        ],
        student: [
            { id: 'dashboard', icon: 'fas fa-tachometer-alt', label: 'Dashboard' },
            { id: 'schedule', icon: 'fas fa-calendar-alt', label: 'Jadwal Kelas' },
            { id: 'subjects', icon: 'fas fa-book', label: 'Mata Pelajaran' },
            { id: 'assignments', icon: 'fas fa-tasks', label: 'Tugas' },
            { id: 'grades', icon: 'fas fa-star', label: 'Nilai' },
            { id: 'attendance', icon: 'fas fa-calendar-check', label: 'Kehadiran' },
            { id: 'materials', icon: 'fas fa-file-alt', label: 'Materi' },
            { id: 'library', icon: 'fas fa-book-open', label: 'Perpustakaan' },
            { id: 'payments', icon: 'fas fa-credit-card', label: 'Pembayaran' },
            { id: 'profile', icon: 'fas fa-user', label: 'Profil' }
        ]
    },

    // Page Titles Configuration
    pageTitles: {
        dashboard: 'Dashboard',
        students: 'Manajemen Siswa',
        teachers: 'Manajemen Guru',
        classes: 'Manajemen Kelas',
        subjects: 'Mata Pelajaran',
        schedule: 'Jadwal',
        assignments: 'Tugas',
        grades: 'Nilai',
        attendance: 'Kehadiran',
        materials: 'Materi',
        library: 'Perpustakaan',
        payments: 'Pembayaran',
        reports: 'Laporan',
        settings: 'Pengaturan',
        profile: 'Profil'
    },

    // Welcome Messages per Role
    welcomeMessages: {
        admin: {
            morning: 'Selamat pagi! Siap mengelola sekolah hari ini.',
            afternoon: 'Selamat siang! Semoga aktivitas administrasi berjalan lancar.',
            evening: 'Selamat sore! Terima kasih atas dedikasi Anda hari ini.'
        },
        teacher: {
            morning: 'Selamat pagi! Siap mengajar dan menginspirasi siswa hari ini.',
            afternoon: 'Selamat siang! Semoga proses pembelajaran berjalan dengan baik.',
            evening: 'Selamat sore! Terima kasih telah mendidik generasi masa depan.'
        },
        student: {
            morning: 'Selamat pagi! Semoga hari ini menjadi hari yang produktif untuk belajar.',
            afternoon: 'Selamat siang! Tetap semangat dalam menuntut ilmu.',
            evening: 'Selamat sore! Semoga ilmu yang dipelajari hari ini bermanfaat.'
        }
    },

    // Notification Settings
    notifications: {
        enabled: true,
        autoHide: true,
        autoHideDelay: 5000,
        position: 'top-right',
        maxNotifications: 5
    },

    // API Configuration (untuk future backend integration)
    api: {
        baseUrl: '/api',
        timeout: 10000,
        retryAttempts: 3,
        endpoints: {
            auth: '/auth',
            dashboard: '/dashboard',
            users: '/users',
            classes: '/classes',
            subjects: '/subjects'
        }
    },

    // Development Settings
    development: {
        enableDebug: true,
        enableConsoleLog: true,
        mockData: true,
        bypassAuth: false
    },

    // Responsive Breakpoints
    breakpoints: {
        mobile: 768,
        tablet: 1024,
        desktop: 1200,
        wide: 1400
    },

    // Animation Settings
    animations: {
        duration: {
            fast: 150,
            normal: 300,
            slow: 500
        },
        easing: {
            default: 'ease',
            smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
            bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        }
    },

    // Feature Flags
    features: {
        darkMode: false,
        notifications: true,
        search: true,
        mobileMenu: true,
        breadcrumbs: false,
        quickActions: true,
        userProfile: true,
        settings: true
    },

    // Default User Data (untuk template/demo)
    defaultUsers: {
        admin: {
            name: 'Administrator',
            email: 'admin@sakola.com',
            role: 'admin',
            avatar: null
        },
        teacher: {
            name: 'Guru',
            email: 'guru@sakola.com',
            role: 'teacher',
            avatar: null
        },
        student: {
            name: 'Siswa',
            email: 'siswa@sakola.com',
            role: 'student',
            avatar: null
        }
    },

    // Utility Functions
    utils: {
        // Get current user role
        getCurrentRole() {
            const user = JSON.parse(localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser') || '{}');
            return user.role || 'student';
        },

        // Get navigation items for current role
        getNavigationItems(role = null) {
            const currentRole = role || this.getCurrentRole();
            return window.TemplateConfig.navigation[currentRole] || [];
        },

        // Get welcome message based on time and role
        getWelcomeMessage(role = null) {
            const currentRole = role || this.getCurrentRole();
            const hour = new Date().getHours();
            const messages = window.TemplateConfig.welcomeMessages[currentRole];
            
            if (hour < 12) return messages.morning;
            if (hour < 17) return messages.afternoon;
            return messages.evening;
        },

        // Apply theme colors
        applyTheme(theme = null) {
            const themeConfig = theme || window.TemplateConfig.theme;
            const root = document.documentElement;
            
            root.style.setProperty('--primary-color', themeConfig.primaryColor);
            root.style.setProperty('--secondary-color', themeConfig.secondaryColor);
            root.style.setProperty('--accent-color', themeConfig.accentColor);
        },

        // Debug log (only in development)
        log(...args) {
            if (window.TemplateConfig.development.enableConsoleLog) {
                console.log('[Template]', ...args);
            }
        },

        // Show notification
        showNotification(message, type = 'info') {
            if (window.DashboardBase && window.DashboardBase.showNotification) {
                window.DashboardBase.showNotification(message, type);
            }
        }
    }
};

// Initialize configuration on load
document.addEventListener('DOMContentLoaded', () => {
    // Apply theme
    window.TemplateConfig.utils.applyTheme();
    
    // Log initialization
    window.TemplateConfig.utils.log('Template configuration initialized');
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.TemplateConfig;
}