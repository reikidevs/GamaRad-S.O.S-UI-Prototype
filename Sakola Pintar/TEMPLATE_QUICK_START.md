# Quick Start Guide - Sakola Pintar Template

## 🚀 Memulai Development

### 1. Setup Project

```bash
# Clone atau download project
# Buka terminal di folder project
cd "d:\Development\UI HTML\Sakola Pintar"

# Start local server
python -m http.server 8000
# atau
npx serve .
# atau
php -S localhost:8000
```

### 2. Akses Template

- **Login Page**: http://localhost:8000/login.html
- **Dashboard Admin**: http://localhost:8000/dashboard-admin.html
- **Dashboard Guru**: http://localhost:8000/dashboard-teacher.html
- **Dashboard Siswa**: http://localhost:8000/dashboard-student.html

### 3. Test Accounts (Frontend Only)

```javascript
// Admin
email: admin@sakola.com
password: admin123

// Guru
email: guru@sakola.com
password: guru123

// Siswa
email: siswa@sakola.com
password: siswa123
```

## 📁 Template Files

### Core Files (Jangan Diubah)

- `css/dashboard-flash-fix.css` - Flash prevention
- `js/dashboard-base.js` - Base functionality
- `js/auth.js` - Authentication logic

### Customizable Files

- `css/style.css` - Variables & base styles
- `css/dashboard.css` - Dashboard components
- `dashboard-*.html` - Dashboard pages
- `js/dashboard-*.js` - Role-specific logic

## 🎨 Customization

### 1. Mengubah Warna Theme

Edit `css/style.css`:

```css
:root {
  --primary-color: #2563eb; /* Ubah warna utama */
  --secondary-color: #059669; /* Ubah warna sekunder */
  --accent-color: #ea580c; /* Ubah warna aksen */
}
```

### 2. Menambah Navigation Item

Edit file dashboard HTML:

```html
<li class="nav-item">
  <a href="#newpage" class="nav-link" data-page="newpage">
    <i class="fas fa-new-icon"></i>
    <span>New Page</span>
  </a>
</li>
```

Tambah content page:

```html
<div id="newpage-content" class="content-page">
  <h2>New Page Content</h2>
</div>
```

Update JavaScript titles:

```javascript
const titles = {
  newpage: "New Page Title",
  // ... existing titles
};
```

### 3. Menambah Stats Card

```html
<div class="stat-card">
  <div class="stat-icon">
    <i class="fas fa-chart-bar"></i>
  </div>
  <div class="stat-content">
    <h3 class="stat-number">100</h3>
    <p class="stat-label">New Stat</p>
    <span class="stat-change positive">+10%</span>
  </div>
</div>
```

## 🔧 Development Tips

### 1. Flash Prevention

Selalu gunakan pattern ini untuk JavaScript baru:

```javascript
document.addEventListener("DOMContentLoaded", () => {
  // Your initialization code

  // Flash prevention - WAJIB!
  setTimeout(() => {
    document.body.classList.add("loaded");
  }, 100);
});
```

### 2. CSS Loading Order

Selalu ikuti urutan ini:

```html
<link rel="stylesheet" href="css/style.css" />
<link rel="stylesheet" href="css/dashboard.css" />
<link rel="stylesheet" href="css/dashboard-flash-fix.css" />
<!-- External CSS terakhir -->
```

### 3. Responsive Design

Gunakan breakpoints yang sudah didefinisikan:

```css
/* Mobile */
@media (max-width: 768px) {
}

/* Tablet */
@media (min-width: 769px) and (max-width: 1024px) {
}

/* Desktop */
@media (min-width: 1025px) {
}
```

## 🐛 Troubleshooting

### Flash/Flicker Issues

1. Pastikan `dashboard-flash-fix.css` dimuat
2. Pastikan `dashboard-base.js` dimuat sebelum role-specific JS
3. Pastikan `setTimeout` dengan `loaded` class ada
4. Clear browser cache

### Navigation Not Working

1. Pastikan `data-page` attribute sesuai dengan content ID
2. Pastikan `setupNavigation()` dipanggil
3. Check console untuk JavaScript errors

### Mobile Menu Issues

1. Pastikan `setupMobileMenu()` dipanggil
2. Check CSS media queries
3. Test di device sebenarnya, bukan hanya browser dev tools

### Authentication Issues

1. Check localStorage/sessionStorage di browser dev tools
2. Pastikan `auth.js` dimuat
3. Pastikan test accounts sesuai dengan yang di `auth.js`

## 📱 Testing Checklist

### Before Deployment

- [ ] Test di Chrome, Firefox, Safari, Edge
- [ ] Test responsive di mobile, tablet, desktop
- [ ] Test semua navigation links
- [ ] Test login/logout functionality
- [ ] Test flash prevention (refresh multiple times)
- [ ] Validate HTML & CSS
- [ ] Check console untuk errors

### Performance Check

- [ ] Page load time < 3 seconds
- [ ] No console errors
- [ ] Images optimized
- [ ] CSS/JS minified (production)

## 🚀 Production Deployment

### 1. Optimize Files

```bash
# Minify CSS
# Minify JavaScript
# Optimize images
# Enable gzip compression
```

### 2. Update Paths

Pastikan semua paths relatif untuk production:

```html
<!-- Good -->
<link rel="stylesheet" href="css/style.css" />

<!-- Bad -->
<link rel="stylesheet" href="/css/style.css" />
```

### 3. CDN Fallbacks

Tambahkan fallback untuk CDN resources:

```html
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
/>
<script>
  if (!window.FontAwesome) {
    document.write(
      '<link rel="stylesheet" href="css/fontawesome-fallback.css">'
    );
  }
</script>
```

## 📞 Support

Jika ada masalah dengan template:

1. Check dokumentasi lengkap di `FRONTEND_TEMPLATE_GUIDE.md`
2. Check troubleshooting section di atas
3. Pastikan mengikuti best practices
4. Test di browser yang berbeda

---

**Happy Coding! 🎉**

Template ini dirancang untuk memudahkan development front-end yang konsisten dan professional.
