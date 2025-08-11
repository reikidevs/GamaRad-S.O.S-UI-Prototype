# Sakola Pintar - Frontend Template

> **Template front-end yang konsisten dan bebas flash/flicker untuk sistem manajemen sekolah dengan support multi-role (Admin, Guru, Siswa)**

## 🎯 Tujuan Template

Template ini dirancang khusus untuk **development front-end** dengan fokus pada:

- ✅ **Konsistensi UI/UX** di semua role
- ✅ **Zero Flash/Flicker** saat loading
- ✅ **Responsive Design** yang optimal
- ✅ **Modular Architecture** yang mudah di-maintain
- ✅ **Ready for Backend Integration**

## 🚀 Quick Start

### 1. Setup Development

```bash
# Clone atau download project
cd "d:\Development\UI HTML\Sakola Pintar"

# Start local server
python -m http.server 8000
```

### 2. Access Template

- **Login**: http://localhost:8000/login.html
- **Admin Dashboard**: http://localhost:8000/dashboard-admin.html
- **Teacher Dashboard**: http://localhost:8000/dashboard-teacher.html
- **Student Dashboard**: http://localhost:8000/dashboard-student.html

### 3. Test Accounts

```javascript
// Admin
email: admin@sakola.com, password: admin123

// Teacher
email: guru@sakola.com, password: guru123

// Student
email: siswa@sakola.com, password: siswa123
```

## 📁 Template Architecture

### Core Template Files

```
├── css/
│   ├── style.css                 # Base styles & CSS variables
│   ├── dashboard.css             # Dashboard components
│   ├── dashboard-flash-fix.css   # Flash prevention system
│   └── auth.css                  # Authentication pages
├── js/
│   ├── template-config.js        # Template configuration
│   ├── dashboard-base.js         # Base functionality (shared)
│   ├── auth.js                   # Authentication logic
│   ├── dashboard.js              # Admin specific
│   ├── dashboard-teacher.js      # Teacher specific
│   └── dashboard-student.js      # Student specific
├── dashboard-admin.html          # Admin dashboard
├── dashboard-teacher.html        # Teacher dashboard
├── dashboard-student.html        # Student dashboard
├── dashboard-template.html       # Base template
├── login.html                    # Login page
└── FRONTEND_TEMPLATE_GUIDE.md    # Detailed documentation
```

## 🎨 Design System

### Color Palette

```css
:root {
  --primary-color: #2563eb; /* Professional Blue */
  --secondary-color: #059669; /* Success Green */
  --accent-color: #ea580c; /* Warm Orange */
  --gray-50: #f9fafb; /* Light Background */
  --gray-700: #374151; /* Text Color */
}
```

### Typography

- **Primary**: Inter (Modern, professional)
- **Secondary**: Poppins (Friendly, readable)
- **Icons**: Font Awesome 6.0.0

### Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Template Features

### ✅ Flash Prevention System

- **Zero flash/flicker** saat loading halaman
- **Consistent loading states** di semua dashboard
- **Smooth transitions** antar elemen
- **Preloader management** yang optimal

### ✅ Modular JavaScript Architecture

```javascript
// Base functionality (shared by all roles)
window.DashboardBase = {
    initializeDashboard(),
    setupNavigation(),
    setupMobileMenu(),
    checkUserAuth(),
    updateCurrentTime(),
    logout()
}

// Role-specific extensions
// dashboard.js, dashboard-teacher.js, dashboard-student.js
```

### ✅ Configurable Template

```javascript
// template-config.js
window.TemplateConfig = {
    theme: { primaryColor: '#2563eb' },
    navigation: { admin: [...], teacher: [...], student: [...] },
    welcomeMessages: { admin: {...}, teacher: {...}, student: {...} }
}
```

### ✅ Responsive Navigation

- **Desktop**: Full sidebar navigation
- **Mobile**: Collapsible hamburger menu
- **Touch-friendly** interactions
- **Keyboard accessible**

## 🎯 Role-Specific Features

### 👨‍💼 Admin Dashboard

- Manajemen Siswa & Guru
- Manajemen Kelas & Mata Pelajaran
- Laporan & Analytics
- Pengaturan Sistem

### 👨‍🏫 Teacher Dashboard

- Jadwal Mengajar
- Manajemen Tugas & Nilai
- Kehadiran Siswa
- Materi Pembelajaran

### 👨‍🎓 Student Dashboard

- Jadwal Kelas
- Tugas & Nilai
- Materi Pembelajaran
- Pembayaran & Perpustakaan

## 🛠️ Customization Guide

### 1. Mengubah Theme

```css
/* Edit css/style.css */
:root {
  --primary-color: #your-color;
  --secondary-color: #your-color;
}
```

### 2. Menambah Navigation

```html
<!-- Add to sidebar -->
<li class="nav-item">
  <a href="#newpage" class="nav-link" data-page="newpage">
    <i class="fas fa-icon"></i>
    <span>New Page</span>
  </a>
</li>

<!-- Add content page -->
<div id="newpage-content" class="content-page">
  <!-- Page content -->
</div>
```

### 3. Menambah Role Baru

1. Copy `dashboard-template.html`
2. Create `js/dashboard-newrole.js`
3. Extend `window.DashboardBase`
4. Add navigation config

## 📱 Browser Support & Testing

### Supported Browsers

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Testing Checklist

- [ ] No flash/flicker on all dashboards
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Navigation works properly
- [ ] Authentication flow
- [ ] Cross-browser compatibility

## 🚀 Production Ready

### Optimization

- **Minified CSS/JS** untuk production
- **Optimized images** dan assets
- **CDN fallbacks** untuk external resources
- **Gzip compression** ready

### Deployment

```bash
# Static hosting (Netlify, Vercel, GitHub Pages)
# Upload semua file ke hosting
# Set proper cache headers
# Enable gzip compression
```

## 📚 Documentation

- **[Frontend Template Guide](FRONTEND_TEMPLATE_GUIDE.md)** - Dokumentasi lengkap
- **[Quick Start Guide](TEMPLATE_QUICK_START.md)** - Panduan cepat
- **[Template Config](js/template-config.js)** - Konfigurasi template

## 🔄 Backend Integration Ready

Template ini siap untuk integrasi backend:

- **API endpoints** sudah didefinisikan di config
- **Authentication flow** siap untuk real backend
- **Data loading functions** siap di-override
- **Error handling** structure sudah ada

```javascript
// Example backend integration
function loadDashboardData() {
  fetch("/api/dashboard")
    .then((response) => response.json())
    .then((data) => updateDashboard(data))
    .catch((error) => handleError(error));
}
```

## 🎯 Best Practices

### Development

- ✅ Gunakan `dashboard-base.js` untuk functionality bersama
- ✅ Follow CSS naming convention (BEM)
- ✅ Test di berbagai browser dan device
- ✅ Maintain consistency across all roles

### Performance

- ✅ Lazy load heavy content
- ✅ Optimize images dan assets
- ✅ Minimize initial JavaScript load
- ✅ Use CSS variables untuk theming

## 📞 Support & Contributing

### Issues & Questions

- Check documentation terlebih dahulu
- Test di browser yang berbeda
- Clear cache jika ada masalah

### Contributing

1. Fork repository
2. Create feature branch
3. Follow existing code style
4. Test thoroughly
5. Submit pull request

---

## 🏆 Template Benefits

✅ **Zero Flash/Flicker** - Pengalaman loading yang smooth  
✅ **Consistent UI/UX** - Semua role menggunakan base yang sama  
✅ **Mobile Responsive** - Optimal di semua device  
✅ **Modular Architecture** - Mudah di-maintain dan extend  
✅ **Production Ready** - Siap untuk deployment  
✅ **Backend Ready** - Siap untuk integrasi API

**Template ini adalah foundation yang solid untuk development sistem manajemen sekolah yang professional dan user-friendly.** 🎓
