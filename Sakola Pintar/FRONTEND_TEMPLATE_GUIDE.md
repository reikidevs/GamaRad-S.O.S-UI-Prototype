# Frontend Template Guide - Sakola Pintar

## Overview

Template front-end Sakola Pintar yang konsisten untuk semua role (Admin, Guru, Siswa) dengan sistem yang terstandarisasi dan bebas dari flash/flicker.

## Struktur Template

### 1. File Struktur

```
├── css/
│   ├── style.css              # Base styles & variables
│   ├── dashboard.css          # Dashboard components
│   ├── dashboard-flash-fix.css # Flash prevention
│   └── auth.css              # Authentication pages
├── js/
│   ├── auth.js               # Authentication logic
│   ├── dashboard-base.js     # Base dashboard functionality
│   ├── dashboard.js          # Admin specific
│   ├── dashboard-student.js  # Student specific
│   ├── dashboard-teacher.js  # Teacher specific
│   └── script.js            # General utilities
├── dashboard-admin.html      # Admin dashboard
├── dashboard-student.html    # Student dashboard
├── dashboard-teacher.html    # Teacher dashboard
├── dashboard-template.html   # Base template
├── login.html               # Login page
└── register.html            # Registration page
```

### 2. CSS Architecture

#### Base Styles (style.css)

- CSS Variables untuk konsistensi warna
- Reset dan base typography
- Utility classes
- Responsive breakpoints

#### Dashboard Styles (dashboard.css)

- Sidebar navigation
- Main content layout
- Cards dan components
- Stats dan widgets
- Mobile responsiveness

#### Flash Fix (dashboard-flash-fix.css)

- Mencegah flash/flicker saat loading
- Smooth transitions
- Preloader handling
- Consistent loading states

### 3. JavaScript Architecture

#### Base Dashboard (dashboard-base.js)

```javascript
// Fungsi utama yang digunakan semua role:
-initializeDashboard() - // Setup dasar
  setupNavigation() - // Navigasi sidebar
  setupMobileMenu() - // Mobile menu
  checkUserAuth() - // Validasi login
  updateCurrentTime() - // Update waktu
  loadDashboardData() - // Load data (override per role)
  logout(); // Logout functionality
```

#### Role-Specific Files

- `dashboard.js` - Admin functionality
- `dashboard-student.js` - Student functionality
- `dashboard-teacher.js` - Teacher functionality

## Template Usage

### 1. Membuat Dashboard Baru

#### HTML Template

```html
<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dashboard [Role] - Sakola Pintar</title>

    <!-- CSS Loading Order - PENTING! -->
    <link rel="stylesheet" href="css/style.css" />
    <link rel="stylesheet" href="css/dashboard.css" />
    <link rel="stylesheet" href="css/dashboard-flash-fix.css" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@300;400;500;600;700&display=swap"
    />
  </head>
  <body class="dashboard-body">
    <!-- Preloader - WAJIB untuk mencegah flash -->
    <div class="dashboard-preloader">
      <div class="preloader-content">
        <div class="preloader-spinner"></div>
        <div class="preloader-text">Memuat Dashboard...</div>
      </div>
    </div>

    <!-- Sidebar -->
    <aside class="sidebar" id="sidebar">
      <!-- Sidebar content -->
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <!-- Header -->
      <header class="main-header">
        <!-- Header content -->
      </header>

      <!-- Content Area -->
      <div class="content-area">
        <!-- Dashboard content -->
      </div>
    </main>

    <!-- JavaScript Loading Order - PENTING! -->
    <script src="js/auth.js"></script>
    <script src="js/dashboard-base.js"></script>
    <script src="js/dashboard-[role].js"></script>
  </body>
</html>
```

#### JavaScript Template

```javascript
// Dashboard [Role] JavaScript - Extends Base Dashboard

document.addEventListener("DOMContentLoaded", () => {
  // Gunakan base initialization - KONSISTEN!
  if (window.DashboardBase) {
    window.DashboardBase.initializeDashboard();
    window.DashboardBase.setupNavigation();
    window.DashboardBase.setupMobileMenu();
    window.DashboardBase.checkUserAuth();
    window.DashboardBase.setupQuickActions();
  }

  // Flash prevention - WAJIB!
  setTimeout(() => {
    document.body.classList.add("loaded");
  }, 100);
});

// Override base functions jika diperlukan
function loadDashboardData() {
  // Role-specific data loading
}
```

### 2. Sidebar Navigation

#### Standard Navigation Structure

```html
<nav class="sidebar-nav">
  <ul class="nav-list">
    <li class="nav-item active">
      <a href="#dashboard" class="nav-link" data-page="dashboard">
        <i class="fas fa-tachometer-alt"></i>
        <span>Dashboard</span>
      </a>
    </li>
    <!-- Additional nav items per role -->
  </ul>
</nav>
```

#### Navigation per Role

**Admin:**

- Dashboard
- Manajemen Siswa
- Manajemen Guru
- Manajemen Kelas
- Mata Pelajaran
- Laporan
- Pengaturan

**Guru:**

- Dashboard
- Jadwal Mengajar
- Mata Pelajaran
- Tugas
- Nilai
- Kehadiran
- Materi
- Profil

**Siswa:**

- Dashboard
- Jadwal Kelas
- Mata Pelajaran
- Tugas
- Nilai
- Kehadiran
- Materi
- Perpustakaan
- Pembayaran
- Profil

### 3. Content Pages

#### Standard Content Structure

```html
<div class="content-area">
  <!-- Dashboard Content - Always active by default -->
  <div id="dashboard-content" class="content-page active">
    <!-- Welcome Section -->
    <section class="welcome-section">
      <!-- Welcome content -->
    </section>

    <!-- Stats Section -->
    <section class="dashboard-stats">
      <!-- Stats cards -->
    </section>

    <!-- Dashboard Grid -->
    <div class="dashboard-grid">
      <!-- Dashboard cards -->
    </div>
  </div>

  <!-- Additional content pages -->
  <div id="[page]-content" class="content-page">
    <!-- Page content -->
  </div>
</div>
```

## Flash Prevention System

### 1. CSS Flash Fix

- `dashboard-flash-fix.css` mencegah flash dengan opacity control
- Preloader overlay saat loading
- Smooth transitions setelah load

### 2. JavaScript Flash Prevention

```javascript
// Base pattern - SELALU gunakan ini
setTimeout(() => {
  document.body.classList.add("loaded");
}, 100);
```

### 3. Loading Order

1. HTML structure loaded
2. CSS files loaded (termasuk flash-fix)
3. JavaScript base loaded
4. Role-specific JavaScript loaded
5. `loaded` class ditambahkan
6. Preloader hidden
7. Content shown dengan smooth transition

## Customization Guidelines

### 1. Menambah Role Baru

1. Copy `dashboard-template.html`
2. Sesuaikan navigation items
3. Buat file JavaScript baru yang extends `dashboard-base.js`
4. Tambahkan role-specific functionality

### 2. Menambah Page Baru

1. Tambah navigation item di sidebar
2. Tambah content page div dengan id `[page]-content`
3. Update titles object di JavaScript
4. Implementasi page-specific functionality

### 3. Styling Customization

- Gunakan CSS variables di `style.css` untuk konsistensi
- Tambah custom styles di file terpisah
- Jangan modify `dashboard-flash-fix.css` kecuali perlu

## Best Practices

### 1. Konsistensi

- Selalu gunakan base template
- Ikuti naming convention
- Gunakan CSS variables untuk warna

### 2. Performance

- Minimize JavaScript pada initial load
- Gunakan lazy loading untuk content berat
- Optimize images dan assets

### 3. Responsiveness

- Test di berbagai device sizes
- Gunakan mobile-first approach
- Implement proper touch interactions

### 4. Accessibility

- Gunakan semantic HTML
- Implement proper ARIA labels
- Ensure keyboard navigation

## Testing Checklist

### 1. Flash Prevention

- [ ] No flash saat first load
- [ ] No flash saat refresh
- [ ] Consistent loading di semua browser
- [ ] Smooth transitions

### 2. Functionality

- [ ] Navigation works properly
- [ ] Mobile menu responsive
- [ ] User authentication
- [ ] Logout functionality

### 3. Cross-browser

- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

### 4. Responsive

- [ ] Desktop (1920px+)
- [ ] Laptop (1366px)
- [ ] Tablet (768px)
- [ ] Mobile (375px)

## Deployment Notes

### 1. Production Build

- Minify CSS dan JavaScript
- Optimize images
- Enable gzip compression
- Set proper cache headers

### 2. CDN Resources

- Font Awesome 6.0.0
- Google Fonts (Inter & Poppins)
- Fallback untuk offline usage

### 3. Browser Support

- Modern browsers (ES6+)
- IE11+ (dengan polyfills jika diperlukan)
- Mobile browsers

---

**Template ini dirancang untuk development front-end yang konsisten dan mudah di-maintain. Semua dashboard role menggunakan base yang sama untuk memastikan user experience yang seragam.**
