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

// Enhanced demo login function
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
    const clickedBtn = event.target.closest('.demo-btn');
    
    // Remove active class from all buttons
    document.querySelectorAll('.demo-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to clicked button
    clickedBtn.classList.add('active');
    
    // Show credentials info
    const credentialsDiv = document.getElementById('demoCredentials');
    credentialsDiv.style.display = 'block';
    credentialsDiv.querySelector('span').textContent = `Login sebagai ${credentials.name}...`;
    
    // Fill form with demo credentials with animation
    const emailField = document.getElementById('email');
    const passwordField = document.getElementById('password');
    
    // Clear fields first
    emailField.value = '';
    passwordField.value = '';
    
    // Type effect for email
    typeText(emailField, credentials.email, 50, () => {
        // Trigger validation
        emailField.dispatchEvent(new Event('input'));
        
        // Type effect for password
        setTimeout(() => {
            typeText(passwordField, credentials.password, 50, () => {
                // Trigger validation
                passwordField.dispatchEvent(new Event('input'));
                
                // Show success notification
                showNotification(`Demo ${credentials.name} siap! Klik "Masuk" untuk melanjutkan.`, 'success');
            });
        }, 500);
    });
}

// Type text effect
function typeText(element, text, speed, callback) {
    let i = 0;
    element.focus();
    
    function typeChar() {
        if (i < text.length) {
            element.value += text.charAt(i);
            i++;
            setTimeout(typeChar, speed);
        } else if (callback) {
            callback();
        }
    }
    
    typeChar();
}

// Enhanced demo button interactions
document.addEventListener('DOMContentLoaded', () => {
    const demoButtons = document.querySelectorAll('.demo-btn');
    
    demoButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            const role = button.dataset.role;
            const roleNames = {
                admin: 'Administrator',
                teacher: 'Guru',
                student: 'Siswa'
            };
            
            // Show tooltip or preview
            button.setAttribute('title', `Coba demo sebagai ${roleNames[role]}`);
        });
        
        button.addEventListener('click', () => {
            // Add click animation
            button.style.transform = 'scale(0.98)';
            setTimeout(() => {
                button.style.transform = '';
            }, 150);
        });
    });
});

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

// Enhanced real-time validation
document.addEventListener('DOMContentLoaded', () => {
    const emailField = document.getElementById('email');
    const passwordField = document.getElementById('password');
    
    if (emailField) {
        const emailGroup = emailField.closest('.input-group');
        const emailValidation = emailGroup.querySelector('.input-validation');
        const emailMessage = emailField.closest('.form-group').querySelector('.validation-message');
        
        emailField.addEventListener('input', () => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const value = emailField.value.trim();
            
            if (value === '') {
                emailGroup.classList.remove('valid', 'invalid');
                emailMessage.classList.remove('show', 'error', 'success');
            } else if (emailRegex.test(value)) {
                emailGroup.classList.add('valid');
                emailGroup.classList.remove('invalid');
                emailMessage.textContent = 'Email valid';
                emailMessage.classList.add('show', 'success');
                emailMessage.classList.remove('error');
            } else {
                emailGroup.classList.add('invalid');
                emailGroup.classList.remove('valid');
                emailMessage.textContent = 'Format email tidak valid';
                emailMessage.classList.add('show', 'error');
                emailMessage.classList.remove('success');
            }
        });
    }
    
    if (passwordField) {
        const passwordGroup = passwordField.closest('.input-group');
        const passwordValidation = passwordGroup.querySelector('.input-validation');
        const passwordMessage = passwordField.closest('.form-group').querySelector('.validation-message');
        const strengthIndicator = passwordField.closest('.form-group').querySelector('.password-strength');
        const strengthFill = strengthIndicator.querySelector('.strength-fill');
        const strengthText = strengthIndicator.querySelector('.strength-text');
        
        passwordField.addEventListener('input', () => {
            const value = passwordField.value;
            
            if (value === '') {
                passwordGroup.classList.remove('valid', 'invalid');
                passwordMessage.classList.remove('show');
                strengthIndicator.classList.remove('show');
                return;
            }
            
            // Show strength indicator
            strengthIndicator.classList.add('show');
            
            // Calculate password strength
            const strength = calculatePasswordStrength(value);
            
            // Update strength bar
            strengthFill.className = `strength-fill ${strength.level}`;
            strengthText.textContent = strength.text;
            
            // Update validation
            if (strength.score >= 2) {
                passwordGroup.classList.add('valid');
                passwordGroup.classList.remove('invalid');
                passwordMessage.textContent = 'Password cukup kuat';
                passwordMessage.classList.add('show', 'success');
                passwordMessage.classList.remove('error');
            } else {
                passwordGroup.classList.add('invalid');
                passwordGroup.classList.remove('valid');
                passwordMessage.textContent = strength.feedback;
                passwordMessage.classList.add('show', 'error');
                passwordMessage.classList.remove('success');
            }
        });
    }
});

// Password strength calculator
function calculatePasswordStrength(password) {
    let score = 0;
    let feedback = '';
    
    // Length check
    if (password.length >= 8) score += 1;
    else feedback = 'Password minimal 8 karakter';
    
    // Lowercase check
    if (/[a-z]/.test(password)) score += 1;
    else if (feedback === '') feedback = 'Tambahkan huruf kecil';
    
    // Uppercase check
    if (/[A-Z]/.test(password)) score += 1;
    else if (feedback === '') feedback = 'Tambahkan huruf besar';
    
    // Number check
    if (/\d/.test(password)) score += 1;
    else if (feedback === '') feedback = 'Tambahkan angka';
    
    // Special character check
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;
    else if (feedback === '') feedback = 'Tambahkan karakter khusus';
    
    // Determine strength level
    let level, text;
    if (score <= 1) {
        level = 'weak';
        text = 'Lemah';
    } else if (score <= 2) {
        level = 'fair';
        text = 'Cukup';
    } else if (score <= 3) {
        level = 'good';
        text = 'Baik';
    } else {
        level = 'strong';
        text = 'Kuat';
    }
    
    return { score, level, text, feedback };
}

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