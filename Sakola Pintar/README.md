# 🎓 Sakola Pintar - Platform Manajemen Sekolah Modern

Sakola Pintar adalah platform manajemen sekolah berbasis web yang dirancang untuk mengelola seluruh aspek operasional sekolah dalam satu sistem terintegrasi. Platform ini menyediakan interface yang modern, responsif, dan mudah digunakan untuk admin, guru, dan siswa.

## 📋 Daftar Isi

- [Fitur Utama](#-fitur-utama)
- [Struktur Proyek](#-struktur-proyek)
- [Teknologi](#-teknologi)
- [Instalasi](#-instalasi)
- [Demo Akun](#-demo-akun)
- [Halaman & Fitur](#-halaman--fitur)
- [Dokumentasi API](#-dokumentasi-api)
- [Kontribusi](#-kontribusi)
- [Lisensi](#-lisensi)

## ✨ Fitur Utama

### 🏠 Landing Page

- Hero section yang menarik dengan CTA
- Showcase fitur lengkap platform
- Informasi tentang perusahaan
- Form kontak untuk prospek
- Design responsif untuk semua device

### 🔐 Sistem Autentikasi

- **Multi-role Login**: Admin, Guru, Siswa
- **Demo Accounts** untuk testing
- **Form Validation** real-time
- **Password Security** dengan toggle visibility
- **Remember Me** functionality
- **Registration System** dengan validasi lengkap

### 👨‍💼 Dashboard Admin

- **Overview Statistics** dengan metrics penting
- **Manajemen Siswa** - CRUD operations
- **Manajemen Guru & Staff** - profil dan kinerja
- **Sistem Kehadiran** - tracking real-time
- **Manajemen Pembayaran** - SPP dan iuran
- **Sistem Penggajian** - otomatis dan akurat
- **LMS Integration** - pembelajaran online
- **Reporting System** - laporan komprehensif

### 👨‍🏫 Dashboard Guru

- **Manajemen Kelas** - kelola kelas aktif
- **Mata Pelajaran** - organize subjects
- **Materi Ajar** - upload dan share materials
- **Sistem Tugas** - create dan grade assignments
- **Penilaian** - grading system
- **Kehadiran Siswa** - attendance tracking
- **Jadwal Mengajar** - schedule management
- **Laporan Kelas** - class performance reports

### 👨‍🎓 Dashboard Siswa

- **Personal Dashboard** dengan welcome message
- **Jadwal Kelas** - daily dan weekly schedule
- **Tugas & Assignments** - view dan submit
- **Nilai & Grades** - academic performance
- **Kehadiran** - attendance history
- **Materi Pembelajaran** - access materials
- **Perpustakaan Digital** - e-library
- **Pembayaran** - fee management
- **Progress Tracking** - learning progress

## 📁 Struktur Proyek

```
Sakola Pintar/
├── index.html                 # Landing page utama
├── login.html                 # Halaman login
├── register.html              # Halaman registrasi
├── dashboard-admin.html       # Dashboard administrator
├── dashboard-teacher.html     # Dashboard guru
├── dashboard-student.html     # Dashboard siswa
├── css/
│   ├── style.css             # Styling utama
│   ├── auth.css              # Styling autentikasi
│   └── dashboard.css         # Styling dashboard
├── js/
│   ├── script.js             # JavaScript utama
│   ├── auth.js               # JavaScript autentikasi
│   ├── register.js           # JavaScript registrasi
│   ├── dashboard-teacher.js  # JavaScript dashboard guru
│   └── dashboard-student.js  # JavaScript dashboard siswa
└── README.md                 # Dokumentasi proyek
```

## 🛠 Teknologi

### Frontend

- **HTML5** - Struktur semantic modern
- **CSS3** - Styling dengan:
  - CSS Variables untuk theming
  - Flexbox & Grid Layout
  - Animations & Transitions
  - Responsive Design
- **JavaScript (Vanilla)** - Interaktivitas:
  - DOM Manipulation
  - Event Handling
  - Local/Session Storage
  - Form Validation
  - SPA-like Navigation

### External Libraries

- **Font Awesome 6.0.0** - Icon library
- **Google Fonts (Poppins)** - Typography

### Design System

- **Color Palette**:
  - Primary: `#4f46e5` (Indigo)
  - Secondary: `#06b6d4` (Cyan)
  - Success: `#10b981` (Emerald)
  - Warning: `#f59e0b` (Amber)
  - Danger: `#ef4444` (Red)

## 🚀 Instalasi

### Persyaratan

- Web browser modern (Chrome, Firefox, Safari, Edge)
- Python 3.x (untuk local server) atau web server lainnya

### Langkah Instalasi

1. **Clone atau Download Proyek**

   ```bash
   git clone [repository-url]
   cd sakola-pintar
   ```

2. **Jalankan Local Server**

   ```bash
   # Menggunakan Python
   python -m http.server 8000

   # Atau menggunakan Node.js
   npx serve .

   # Atau menggunakan PHP
   php -S localhost:8000
   ```

3. **Buka Browser**
   ```
   http://localhost:8000
   ```

## 🔑 Demo Akun

Platform menyediakan demo akun untuk testing:

| Role      | Email                  | Password | Dashboard              |
| --------- | ---------------------- | -------- | ---------------------- |
| **Admin** | admin@sakolapintar.com | admin123 | dashboard-admin.html   |
| **Guru**  | guru@sakolapintar.com  | guru123  | dashboard-teacher.html |
| **Siswa** | siswa@sakolapintar.com | siswa123 | dashboard-student.html |

### Keyboard Shortcuts

- `Alt + D` - Demo Admin Login
- `Alt + T` - Demo Teacher Login
- `Alt + S` - Demo Student Login

## 📄 Halaman & Fitur

### 1. Landing Page (`index.html`)

- **Hero Section** dengan value proposition
- **Features Showcase** - 8 fitur utama
- **About Section** dengan keunggulan
- **Contact Form** untuk lead generation
- **Responsive Navigation** dengan hamburger menu
- **Smooth Scrolling** dan animations
- **Back to Top** button

### 2. Login Page (`login.html`)

- **Multi-role Authentication**
- **Demo Account Buttons**
- **Form Validation** real-time
- **Password Toggle** visibility
- **Remember Me** option
- **Forgot Password** link
- **Registration** redirect

### 3. Registration Page (`register.html`)

- **Multi-step Form** dengan validasi
- **Password Strength** indicator
- **Role Selection** (Siswa, Guru, Orang Tua)
- **Terms & Conditions** agreement
- **Social Login** options (Google, Microsoft)
- **Email Verification** simulation

### 4. Admin Dashboard (`dashboard-admin.html`)

- **Statistics Overview** - 4 key metrics
- **Activity Feed** - recent activities
- **Payment Tracking** - pending payments
- **Schedule Management** - daily schedule
- **Quick Actions** - common tasks
- **Navigation Sidebar** - 9 main sections

### 5. Teacher Dashboard (`dashboard-teacher.html`)

- **Class Management** - active classes
- **Subject Organization** - mata pelajaran
- **Material Upload** - teaching materials
- **Assignment Creation** - tugas dan quiz
- **Grade Management** - penilaian siswa
- **Attendance Tracking** - kehadiran
- **Schedule View** - jadwal mengajar
- **Performance Reports** - class analytics

### 6. Student Dashboard (`dashboard-student.html`)

- **Welcome Section** - personalized greeting
- **Today's Schedule** - jadwal hari ini
- **Assignment Tracker** - tugas pending
- **Grade Viewer** - nilai terbaru
- **Announcements** - pengumuman sekolah
- **Progress Tracking** - learning progress
- **Quick Actions** - shortcut menu

## 🎨 Design Features

### Responsive Design

- **Mobile-first** approach
- **Breakpoints** untuk tablet dan desktop
- **Flexible Grid** system
- **Touch-friendly** interactions

### Animations & Interactions

- **Smooth Transitions** pada semua elemen
- **Hover Effects** yang konsisten
- **Loading States** untuk feedback
- **Ripple Effects** pada buttons
- **Fade In** animations untuk content

### Accessibility

- **Semantic HTML** structure
- **ARIA Labels** untuk screen readers
- **Keyboard Navigation** support
- **Color Contrast** yang memadai
- **Focus Indicators** yang jelas

## 🔧 Kustomisasi

### CSS Variables

```css
:root {
  --primary-color: #4f46e5;
  --secondary-color: #06b6d4;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --danger-color: #ef4444;
}
```

### JavaScript Configuration

```javascript
// Notification duration
const NOTIFICATION_DURATION = 5000;

// Animation timing
const ANIMATION_DURATION = 300;

// API endpoints (untuk integrasi backend)
const API_BASE_URL = "https://api.sakolapintar.com";
```

## 🚧 Roadmap Pengembangan

### Phase 1 - Backend Integration

- [ ] REST API development
- [ ] Database design dan implementation
- [ ] User authentication system
- [ ] File upload functionality

### Phase 2 - Advanced Features

- [ ] Real-time notifications
- [ ] Video conferencing integration
- [ ] Advanced reporting system
- [ ] Mobile app development

### Phase 3 - Enterprise Features

- [ ] Multi-school support
- [ ] Advanced analytics
- [ ] Third-party integrations
- [ ] White-label solution

## 🤝 Kontribusi

Kami menerima kontribusi dari developer lain! Berikut cara berkontribusi:

1. **Fork** repository ini
2. **Create** feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to branch (`git push origin feature/AmazingFeature`)
5. **Open** Pull Request

### Guidelines

- Ikuti coding standards yang ada
- Tambahkan dokumentasi untuk fitur baru
- Test semua perubahan sebelum submit
- Gunakan commit message yang descriptive

## 📞 Support

Jika Anda memiliki pertanyaan atau membutuhkan bantuan:

- **Email**: support@sakolapintar.com
- **Documentation**: [docs.sakolapintar.com](https://docs.sakolapintar.com)
- **Issues**: [GitHub Issues](https://github.com/sakolapintar/issues)

## 📄 Lisensi

Proyek ini dilisensikan under MIT License - lihat file [LICENSE](LICENSE) untuk detail.

---

## 🎯 Status Proyek

**Current Version**: 1.0.0  
**Status**: ✅ Template Complete - Ready for Backend Integration  
**Last Updated**: November 2024

### ✅ Completed Features

- ✅ Landing page dengan semua section
- ✅ Authentication system (login/register)
- ✅ Admin dashboard dengan full UI
- ✅ Teacher dashboard dengan class management
- ✅ Student dashboard dengan learning features
- ✅ Responsive design untuk semua device
- ✅ Form validation dan error handling
- ✅ Navigation dan routing system

### 🚧 In Development

- 🚧 Backend API integration
- 🚧 Database connectivity
- 🚧 File upload system
- 🚧 Real-time notifications

### 📋 Planned Features

- 📋 Advanced reporting system
- 📋 Video conferencing integration
- 📋 Mobile app development
- 📋 Multi-language support

---

**Dikembangkan dengan ❤️ untuk kemajuan pendidikan Indonesia**
