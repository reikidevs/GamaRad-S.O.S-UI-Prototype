// Authentication JavaScript

// Toggle password visibility
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const passwordIcon = document.getElementById('passwordIcon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        passwordIcon.classList.remove('fa-eye');
        passwordIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        passwordIcon.classList.remove('fa-eye-slash');
        passwordIcon.classList.add('fa-eye');
    }
}

// Demo login function
function loginDemo(role) {
    const demoCredentials = {
        admin: {
            email: 'admin@sakolapintar.com',
            password: 'admin123',
            name: 'Administrator',
            dashboard: 'dashboard-admin.html'
        },
        teacher: {
            email: 'guru@sakolapintar.com',
            password: 'guru123',
            name: 'Guru',
            dashboard: 'dashboard-teacher.html'
        },
        student: {
            email: 'siswa@sakolapintar.com',
            password: 'siswa123',
            name: 'Siswa',
            dashboard: 'dashboard-student.html'
        }
    };
    
    const credentials = demoCredentials[role];
    
    // Fill form with demo credentials
    document.getElementById('email').value = credentials.email;
    document.getElementById('password').value = credentials.password;
    
    // Add visual feedback
    const demoButtons = document.querySelectorAll('.demo-btn');
    demoButtons.forEach(btn => btn.style.opacity = '0.5');
    
    const clickedBtn = event.target.closest('.demo-btn');
    clickedBtn.style.opacity = '1';
    clickedBtn.style.transform = 'scale(0.95)';
    
    // Simulate login process
    setTimeout(() => {
        // Store user data in localStorage
        localStorage.setItem('currentUser', JSON.stringify({
            role: role,
            name: credentials.name,
            email: credentials.email,
            loginTime: new Date().toISOString()
        }));
        
        // Redirect to appropriate dashboard
        window.location.href = credentials.dashboard;
    }, 1000);
}

// Form validation
function validateForm(formData) {
    const errors = {};
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
        errors.email = 'Email harus diisi';
    } else if (!emailRegex.test(formData.email)) {
        errors.email = 'Format email tidak valid';
    }
    
    // Password validation
    if (!formData.password) {
        errors.password = 'Password harus diisi';
    } else if (formData.password.length < 6) {
        errors.password = 'Password minimal 6 karakter';
    }
    
    return errors;
}

// Show error message
function showError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const inputGroup = field.closest('.input-group');
    const formGroup = field.closest('.form-group');
    
    // Remove existing error
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error class
    field.classList.add('input-error');
    field.classList.remove('input-success');
    
    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    formGroup.appendChild(errorDiv);
    
    // Add shake animation
    inputGroup.classList.add('shake');
    setTimeout(() => inputGroup.classList.remove('shake'), 500);
}

// Show success message
function showSuccess(fieldName) {
    const field = document.getElementById(fieldName);
    const formGroup = field.closest('.form-group');
    
    // Remove existing error
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add success class
    field.classList.add('input-success');
    field.classList.remove('input-error');
}

// Clear validation
function clearValidation(fieldName) {
    const field = document.getElementById(fieldName);
    const formGroup = field.closest('.form-group');
    
    // Remove existing messages
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Remove classes
    field.classList.remove('input-error', 'input-success');
}

// Real-time validation
document.addEventListener('DOMContentLoaded', () => {
    const emailField = document.getElementById('email');
    const passwordField = document.getElementById('password');
    
    if (emailField) {
        emailField.addEventListener('blur', () => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailField.value && emailRegex.test(emailField.value)) {
                showSuccess('email');
            } else if (emailField.value) {
                showError('email', 'Format email tidak valid');
            }
        });
        
        emailField.addEventListener('input', () => {
            if (emailField.classList.contains('input-error')) {
                clearValidation('email');
            }
        });
    }
    
    if (passwordField) {
        passwordField.addEventListener('blur', () => {
            if (passwordField.value && passwordField.value.length >= 6) {
                showSuccess('password');
            } else if (passwordField.value) {
                showError('password', 'Password minimal 6 karakter');
            }
        });
        
        passwordField.addEventListener('input', () => {
            if (passwordField.classList.contains('input-error')) {
                clearValidation('password');
            }
        });
    }
});

// Login form submission
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(loginForm);
            const data = {
                email: formData.get('email'),
                password: formData.get('password'),
                remember: formData.get('remember')
            };
            
            // Validate form
            const errors = validateForm(data);
            
            // Clear previous errors
            document.querySelectorAll('.input-error').forEach(input => {
                clearValidation(input.id);
            });
            
            // Show errors if any
            if (Object.keys(errors).length > 0) {
                Object.keys(errors).forEach(field => {
                    showError(field, errors[field]);
                });
                return;
            }
            
            // Show loading state
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoading = submitBtn.querySelector('.btn-loading');
            
            btnText.style.display = 'none';
            btnLoading.style.display = 'flex';
            submitBtn.disabled = true;
            
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Check demo credentials
                const demoCredentials = [
                    { email: 'admin@sakolapintar.com', password: 'admin123', role: 'admin', name: 'Administrator', dashboard: 'dashboard-admin.html' },
                    { email: 'guru@sakolapintar.com', password: 'guru123', role: 'teacher', name: 'Guru', dashboard: 'dashboard-teacher.html' },
                    { email: 'siswa@sakolapintar.com', password: 'siswa123', role: 'student', name: 'Siswa', dashboard: 'dashboard-student.html' }
                ];
                
                const user = demoCredentials.find(cred => 
                    cred.email === data.email && cred.password === data.password
                );
                
                if (user) {
                    // Store user data
                    const userData = {
                        role: user.role,
                        name: user.name,
                        email: user.email,
                        loginTime: new Date().toISOString(),
                        remember: data.remember
                    };
                    
                    if (data.remember) {
                        localStorage.setItem('currentUser', JSON.stringify(userData));
                    } else {
                        sessionStorage.setItem('currentUser', JSON.stringify(userData));
                    }
                    
                    // Show success message
                    showNotification('Login berhasil! Mengalihkan...', 'success');
                    
                    // Redirect after delay
                    setTimeout(() => {
                        window.location.href = user.dashboard;
                    }, 1500);
                } else {
                    throw new Error('Email atau password salah');
                }
                
            } catch (error) {
                // Show error notification
                showNotification(error.message, 'error');
                
                // Reset button
                btnText.style.display = 'block';
                btnLoading.style.display = 'none';
                submitBtn.disabled = false;
            }
        });
    }
});

// Notification system
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

// Add notification animations
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
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
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 50%;
        transition: background-color 0.3s ease;
    }
    
    .notification-close:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
`;
document.head.appendChild(notificationStyles);

// Check if user is already logged in
document.addEventListener('DOMContentLoaded', () => {
    const currentUser = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
    
    if (currentUser) {
        const userData = JSON.parse(currentUser);
        const loginTime = new Date(userData.loginTime);
        const now = new Date();
        const hoursDiff = (now - loginTime) / (1000 * 60 * 60);
        
        // If login is less than 24 hours old, redirect to dashboard
        if (hoursDiff < 24) {
            const dashboards = {
                admin: 'dashboard-admin.html',
                teacher: 'dashboard-teacher.html',
                student: 'dashboard-student.html'
            };
            
            if (dashboards[userData.role]) {
                window.location.href = dashboards[userData.role];
            }
        } else {
            // Clear expired session
            localStorage.removeItem('currentUser');
            sessionStorage.removeItem('currentUser');
        }
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Alt + D for demo admin login
    if (e.altKey && e.key === 'd') {
        e.preventDefault();
        loginDemo('admin');
    }
    
    // Alt + T for demo teacher login
    if (e.altKey && e.key === 't') {
        e.preventDefault();
        loginDemo('teacher');
    }
    
    // Alt + S for demo student login
    if (e.altKey && e.key === 's') {
        e.preventDefault();
        loginDemo('student');
    }
});

// Console welcome message for developers
console.log(`
🔐 Sakola Pintar - Authentication System
📝 Demo Credentials:
   Admin: admin@sakolapintar.com / admin123
   Guru: guru@sakolapintar.com / guru123
   Siswa: siswa@sakolapintar.com / siswa123

⌨️ Keyboard Shortcuts:
   Alt + D: Demo Admin Login
   Alt + T: Demo Teacher Login
   Alt + S: Demo Student Login
`);