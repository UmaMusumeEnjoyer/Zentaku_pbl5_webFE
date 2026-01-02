// src/pages/Auth/AuthPage.tsx
import React from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import styles from './AuthPage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlusG, faFacebookF, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import Hook và useAuth từ context
import { useAuthPage } from '@umamusumeenjoyer/shared-logic';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next'; // Import translation hook

const AuthPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const { theme } = useTheme();
  
  // Initialize translation hook with 'Auth' namespace
  const { t } = useTranslation(['Auth']);

  // Xác định initial path và verification token
  const initialPath = location.pathname === '/signup' ? 'signup' : 'login';
  const verificationToken = searchParams.get('token');

  // Tạo loginCallback wrapper để convert từ LoginCredentials sang email/password
  const loginCallback = async (email: string, password: string) => {
    return await login({ email, password });
  };

  // Lấy tất cả logic và state từ Hook với callbacks
  const {
    isActive,
    registerData,
    loginData,
    handleRegisterChange,
    handleLoginChange,
    handleRegisterSubmit,
    handleLoginSubmit,
    handleRegisterClick,
    handleLoginClick
  } = useAuthPage(
    {
      onLoginSuccess: (message) => {
        toast.success(message);
        navigate('/'); 
      },
      onLoginError: (message) => toast.error(message),
      onRegisterSuccess: (message) => toast.success(message),
      onRegisterError: (message) => toast.error(message),
      onVerifySuccess: (message) => toast.success(message),
      onVerifyError: (message) => toast.error(message),
      onNavigateToSignup: () => navigate('/signup'),
      onNavigateToLogin: () => navigate('/login'),
      loginCallback,
    },
    initialPath,
    verificationToken
  );

  return (
    <div className={styles.authPageWrapper} data-theme={theme}>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
      
      <div className={`${styles.container} ${isActive ? styles.active : ''}`} data-theme={theme} id="container">
        
        {/* --- FORM ĐĂNG KÝ (SIGN UP) --- */}
        <div className={`${styles.formContainer} ${styles.signUp}`}>
          <form onSubmit={handleRegisterSubmit}>
            <h1>{t('Auth:signup.title')}</h1>
            
            <input 
              name="email" 
              type="email" 
              placeholder={t('Auth:placeholders.email')} 
              value={registerData.email} 
              onChange={handleRegisterChange} 
              required 
            />
            <input 
              name="username" 
              type="text" 
              placeholder={t('Auth:placeholders.username')} 
              value={registerData.username} 
              onChange={handleRegisterChange} 
              required 
            />
            <input 
              name="password" 
              type="password" 
              placeholder={t('Auth:placeholders.password')} 
              value={registerData.password} 
              onChange={handleRegisterChange} 
              required 
            />
            <input 
              name="confirm_password" 
              type="password" 
              placeholder={t('Auth:placeholders.confirm_password')} 
              value={registerData.confirm_password} 
              onChange={handleRegisterChange} 
              required 
            />
            
            <div className={styles.terms}>
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">{t('Auth:signup.terms')}</label>
            </div>
            
            <button type="submit">{t('Auth:signup.submit')}</button>
          </form>
        </div>

        {/* --- FORM ĐĂNG NHẬP (SIGN IN) --- */}
        <div className={`${styles.formContainer} ${styles.signIn}`}>
          <form onSubmit={handleLoginSubmit}>
            <h1>{t('Auth:signin.title')}</h1>
            
            <div className={styles.socialIcons}>
              <a href="#" className="icon"><FontAwesomeIcon icon={faGooglePlusG} /></a>
              <a href="#" className="icon"><FontAwesomeIcon icon={faFacebookF} /></a>
              <a href="#" className="icon"><FontAwesomeIcon icon={faGithub} /></a>
              <a href="#" className="icon"><FontAwesomeIcon icon={faLinkedinIn} /></a>
            </div>
            
            <span>{t('Auth:signin.divider')}</span>
            
            <input 
              name="email" 
              type="email" 
              placeholder={t('Auth:placeholders.email')} 
              value={loginData.email} 
              onChange={handleLoginChange} 
              required 
            />
            <input 
              name="password" 
              type="password" 
              placeholder={t('Auth:placeholders.password')} 
              value={loginData.password} 
              onChange={handleLoginChange} 
              required 
            />
            
            <a href="#">{t('Auth:signin.forgot_password')}</a>
            <button type="submit">{t('Auth:signin.submit')}</button>
          </form>
        </div>

        {/* --- OVERLAY ANIMATION --- */}
        <div className={styles.toggleContainer}>
          <div className={styles.toggle}>
            
            {/* Panel Trái: Hiển thị khi đang ở Form Register -> Bấm để về Login */}
            <div className={`${styles.togglePanel} ${styles.toggleLeft}`}>
              <h1>{t('Auth:toggle.welcome_back')}</h1>
              <button className={styles.hidden} onClick={handleLoginClick}>
                {t('Auth:toggle.to_signin')}
              </button>
            </div>
            
            {/* Panel Phải: Hiển thị khi đang ở Form Login -> Bấm để qua Register */}
            <div className={`${styles.togglePanel} ${styles.toggleRight}`}>
              <h1>{t('Auth:toggle.hello_friend')}</h1>
              <button className={styles.hidden} onClick={handleRegisterClick}>
                {t('Auth:toggle.to_signup')}
              </button>
            </div>
            
          </div>
        </div>
      
      </div>
    </div>
  );
};

export default AuthPage;