import React from 'react';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '../../i18n/config';
import './LanguageSwitcher.css';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const languageNames: Record<string, string> = {
    vi: 'Tiếng Việt',
    en: 'English',
    jp: '日本語',
  };

  const languageFlags: Record<string, string> = {
    vi: '🇻🇳',
    en: '🇬🇧',
    jp: '🇯🇵',
  };

  return (
    <div className="language-switcher">
      {LANGUAGES.map((lang: string) => (
        <button
          key={lang}
          onClick={() => changeLanguage(lang)}
          className={`language-button ${i18n.language === lang ? 'active' : ''}`}
          title={languageNames[lang]}
        >
          <span className="flag">{languageFlags[lang]}</span>
          <span className="lang-code">{lang.toUpperCase()}</span>
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
