// src/components/Header/Header.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import GlobalSearchModal from '../GlobalSearch/GlobalSearch';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next'; // Import translation hook

const Header: React.FC = () => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  
  // Initialize translation hook with 'Header' namespace
  const { t } = useTranslation(['Header']);

  return (
    <>
      <header className="app-header" data-theme={theme}>
        <div className="header-left">
          <div className="logo">
            <Link to="/">
              <img src="/images/Gemini_Generated_Image_eg5d1qeg5d1qeg5d (1).png" alt="Logo" className="logo-img" /> 
            </Link>
          </div>
        </div>

        <nav className="header-center">
          {/* Translated navigation links */}
          <Link to="/">{t('Header:navigation.home')}</Link>
          <Link to="/browse">{t('Header:navigation.browse')}</Link>
        </nav>

        <div className="header-right">
          <button 
            className="btn-theme" 
            aria-label={t('Header:accessibility.toggle_theme')} 
            onClick={toggleTheme}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          
          <button 
            className="btn-search" 
            aria-label={t('Header:accessibility.search')} 
            onClick={() => setIsSearchModalOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
          
          {/* Translated auth buttons */}
          <Link to="/login" className="btn-login">
            {t('Header:buttons.login')}
          </Link>
          <Link to="/signup" className="btn-signup">
            {t('Header:buttons.sign_up')}
          </Link>
        </div>
      </header>

      <GlobalSearchModal 
        isOpen={isSearchModalOpen} 
        onClose={() => setIsSearchModalOpen(false)} 
      />
    </>
  );
};

export default Header;