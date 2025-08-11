// Register JavaScript

// Toggle password visibility
function togglePassword(inputId, iconId) {
    const passwordInput = document.getElementById(inputId);
    const passwordIcon = document.getElementById(iconId);
    
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

// Form validation
function validateRegisterForm(formData) {
    const errors = {};
    
    // First name validation
    if (!formData.firstName || formData.firstName.trim().length < 2) {
        errors.firstName = 'Nama depan minimal 2 karakter';
    }
    
    // Last name validation
    if (!formData.lastName || formData.lastName.trim().length < 2) {
        errors.lastName = 'Nama belakang minimal 2 karakter';
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
        errors.email = 'Email harus diisi';
    } else if (!emailRegex.test(formData.email)) {
        errors.email = 'Format email tidak valid';
    }
    
    // Phone validation
    const phoneRegex = /^[0-9+\-\s()]{10,15}$/;
    if (!formData.phone) {
        errors.phone = 'Nomor telepon harus diisi';
    } else if (!phoneRegex.test(formData.phone)) {
        errors.phone = 'Format nomor telepon tidak valid';
    }
    
    // Role validation
    if (!formData.role) {
        errors.role = 'Pilih peran Anda';
    }
    
    // School validation
    if (!formData.school || formData.school.trim().length < 3) {
        errors.school = 'Nama sekolah minimal 3 karakter';
    }
    
    // Password validation
    if (!formData.password) {
        errors.password = 'Password harus diisi';
    } else if (formData.password.length < 8) {
        errors.password = 'Password minimal 8 karakter';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
        errors.password = 'Password harus mengandung huruf besar, kecil, dan angka';
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
        errors.confirmPassword = 'Konfirmasi password harus diisi';
    } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Password tidak cocok';
    }
    
    // Terms validation
    if (!formData.terms) {
        errors.terms = 'Anda harus menyetujui syarat dan ketentuan';
    }
    
    return errors;
}

// Show error message
function showError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const inputGroup = field.closest('.input-group') || field.parentElement;
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
    const fields = ['firstName', 'lastName', 'email', 'phone', 'school', 'password', 'confirmPassword'];
    
    fields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field) {
            field.addEventListener('blur', () => validateField(fieldName));
            field.addEventListener('input', () => {
                if (field.classList.contains('input-error')) {
                    clearValidation(fieldName);
                }
            });
        }
    });
    
    // Special handling for confirm password
    const confirmPasswordField = document.getElementById('confirmPassword');
    const passwordField = document.getElementById('password');
    
    if (confirmPasswordField && passwordField) {
        confirmPasswordField.addEventListener('input', () => {
            if (confirmPasswordField.value && passwordField.value) {
                if (confirmPasswordField.value === passwordField.value) {
                    showSuccess('confirmPassword');
                } else {
                    showError('confirmPassword', 'Password tidak cocok');
                }
            }
        });
    }
});

// Validate individual field
function validateField(fieldName) {
    const field = document.getElementById(fieldName);
    const value = field.value.trim();
    
    switch(fieldName) {
        case 'firstName':
        case 'lastName':
            if (value && value.length >= 2) {
                showSuccess(fieldName);
            } else if (value) {
                showError(fieldName, 'Minimal 2 karakter');
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value && emailRegex.test(value)) {
                showSuccess(fieldName);
            } else if (value) {
                showError(fieldName, 'Format email tidak valid');
            }
            break;
            
        case 'phone':
            const phoneRegex = /^[0-9+\-\s()]{10,15}$/;
            if (value && phoneRegex.test(value)) {
                showSuccess(fieldName);
            } else if (value) {
                showError(fieldName, 'Format nomor telepon tidak valid');
            }
            break;
            
        case 'school':
            if (value && value.length >= 3) {
                showSuccess(fieldName);
            } else if (value) {
                showError(fieldName, 'Minimal 3 karakter');
            }
            break;
            
        case 'password':
            if (value && value.length >= 8 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
                showSuccess(fieldName);
            } else if (value) {
                if (value.length < 8) {
                    showError(fieldName, 'Password minimal 8 karakter');
                } else {
                    showError(fieldName, 'Password harus mengandung huruf besar, kecil, dan angka');
                }
            }
            break;
            
        case 'confirmPassword':
            const passwordValue = document.getElementById('password').value;
            if (value && value === passwordValue) {
                showSuccess(fieldName);
            } else if (value) {
                showError(fieldName, 'Password tidak cocok');
            }
            break;
    }
}

// Register form submission
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(registerForm);
            const data = {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                role: formData.get('role'),
                school: formData.get('school'),
                password: formData.get('password'),
                confirmPassword: formData.get('confirmPassword'),
                terms: formData.get('terms'),
                newsletter: formData.get('newsletter')
            };
            
            // Validate form
            const errors = validateRegisterForm(data);
            
            // Clear previous errors
            document.querySelectorAll('.input-error').forEach(input => {
                clearValidation(input.id);
            });
            
            // Show errors if any
            if (Object.keys(errors).length > 0) {
                Object.keys(errors).forEach(field => {
                    if (field === 'terms') {
                        showNotification(errors[field], 'error');
                    } else {
                        showError(field, errors[field]);
                    }
                });
                return;
            }
            
            // Show loading state
            const submitBtn = registerForm.querySelector('button[type="submit"]');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoading = submitBtn.querySelector('.btn-loading');
            
            btnText.style.display = 'none';
            btnLoading.style.display = 'flex';
            submitBtn.disabled = true;
            
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 3000));
                
                // Check if email already exists (simulation)
                const existingEmails = [
                    'admin@sakolapintar.com',
                    'guru@sakolapintar.com',
                    'siswa@sakolapintar.com'
                ];
                
                if (existingEmails.includes(data.email)) {
                    throw new Error('Email sudah terdaftar. Silakan gunakan email lain.');
                }
                
                // Success - store user data
                const userData = {
                    id: Date.now(),
                    name: `${data.firstName} ${data.lastName}`,
                    email: data.email,
                    phone: data.phone,
                    role: data.role,
                    school: data.school,
                    registrationDate: new Date().toISOString(),
                    isVerified: false
                };
                
                // Store in localStorage (in real app, this would be sent to server)
                localStorage.setItem('pendingUser', JSON.stringify(userData));
                
                // Show success message
                showNotification('Pendaftaran berhasil! Silakan cek email untuk verifikasi akun.', 'success');
                
                // Reset form
                registerForm.reset();
                
                // Redirect to login after delay
                setTimeout(() => {
                    window.location.href = 'login.html?registered=true';
                }, 2000);
                
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

// Social login handlers
document.addEventListener('DOMContentLoaded', () => {
    const googleBtn = document.querySelector('.google-btn');
    const microsoftBtn = document.querySelector('.microsoft-btn');
    
    if (googleBtn) {
        googleBtn.addEventListener('click', () => {
            showNotification('Login dengan Google akan segera tersedia', 'info');
        });
    }
    
    if (microsoftBtn) {
        microsoftBtn.addEventListener('click', () => {
            showNotification('Login dengan Microsoft akan segera tersedia', 'info');
        });
    }
});

// Check if user is already logged in
document.addEventListener('DOMContentLoaded', () => {
    const currentUser = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
    
    if (currentUser) {
        const userData = JSON.parse(currentUser);
        const dashboards = {
            admin: 'dashboard-admin.html',
            teacher: 'dashboard-teacher.html',
            student: 'dashboard-student.html'
        };
        
        if (dashboards[userData.role]) {
            showNotification('Anda sudah login. Mengalihkan ke dashboard...', 'info');
            setTimeout(() => {
                window.location.href = dashboards[userData.role];
            }, 1500);
        }
    }
});

// Password strength indicator
document.addEventListener('DOMContentLoaded', () => {
    const passwordField = document.getElementById('password');
    
    if (passwordField) {
        passwordField.addEventListener('input', () => {
            const password = passwordField.value;
            const strength = calculatePasswordStrength(password);
            updatePasswordStrengthIndicator(strength);
        });
    }
});

function calculatePasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 8) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[^a-zA-Z\d]/.test(password)) strength += 1;
    
    return strength;
}

function updatePasswordStrengthIndicator(strength) {
    // Remove existing indicator
    const existingIndicator = document.querySelector('.password-strength');
    if (existingIndicator) {
        existingIndicator.remove();
    }
    
    if (strength === 0) return;
    
    const passwordGroup = document.getElementById('password').closest('.form-group');
    const indicator = document.createElement('div');
    indicator.className = 'password-strength';
    
    const strengthLevels = ['Sangat Lemah', 'Lemah', 'Sedang', 'Kuat', 'Sangat Kuat'];
    const strengthColors = ['#ef4444', '#f59e0b', '#eab308', '#22c55e', '#16a34a'];
    
    indicator.innerHTML = `
        <div class="strength-bar">
            <div class="strength-fill" style="width: ${(strength / 5) * 100}%; background: ${strengthColors[strength - 1]}"></div>
        </div>
        <span class="strength-text" style="color: ${strengthColors[strength - 1]}">${strengthLevels[strength - 1]}</span>
    `;
    
    passwordGroup.appendChild(indicator);
}

// Add password strength styles
const strengthStyles = document.createElement('style');
strengthStyles.textContent = `
    .password-strength {
        margin-top: 0.5rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .strength-bar {
        flex: 1;
        height: 4px;
        background: var(--gray-200);
        border-radius: 2px;
        overflow: hidden;
    }
    
    .strength-fill {
        height: 100%;
        transition: width 0.3s ease, background 0.3s ease;
        border-radius: 2px;
    }
    
    .strength-text {
        font-size: 0.8rem;
        font-weight: 500;
        min-width: 80px;
    }
    
    .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }
    
    .social-login {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }
    
    .social-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        padding: 0.75rem 1rem;
        border: 2px solid var(--gray-200);
        border-radius: 12px;
        background: var(--white);
        color: var(--gray-700);
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
        text-decoration: none;
    }
    
    .social-btn:hover {
        border-color: var(--primary-color);
        color: var(--primary-color);
        transform: translateY(-2px);
        box-shadow: var(--shadow-md);
    }
    
    .google-btn:hover {
        border-color: #db4437;
        color: #db4437;
    }
    
    .microsoft-btn:hover {
        border-color: #0078d4;
        color: #0078d4;
    }
    
    .terms-link {
        color: var(--primary-color);
        text-decoration: none;
        font-weight: 500;
    }
    
    .terms-link:hover {
        text-decoration: underline;
    }
    
    @media (max-width: 768px) {
        .form-row {
            grid-template-columns: 1fr;
        }
    }
`;
document.head.appendChild(strengthStyles);

// Console welcome message
console.log(`
📝 Halaman Registrasi - Sakola Pintar
🎓 Bergabunglah dengan platform pendidikan modern
🚀 Versi: 1.0.0
💻 Dikembangkan dengan ❤️
`);