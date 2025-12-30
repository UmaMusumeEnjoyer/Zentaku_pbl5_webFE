import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import commonEn from './locales/en/common.json';
import homePageEn from './locales/en/HomePage.json';
import commonVi from './locales/vi/common.json';
import homePageVi from './locales/vi/HomePage.json';
import commonJp from './locales/jp/common.json';
import homePageJp from './locales/jp/HomePage.json';

export const LANGUAGES = ['vi', 'en', 'jp'] as const;
const DEFAULT_LANG = 'en';
const DEFAULT_NS = 'common';

// Cấu hình i18next
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        common: commonEn,
        HomePage: homePageEn,
      },
      vi: {
        common: commonVi,
        HomePage: homePageVi,
      },
      jp: {
        common: commonJp,
        HomePage: homePageJp,
      },
    },
    lng: localStorage.getItem('language') || DEFAULT_LANG, // Lấy từ localStorage hoặc dùng mặc định
    fallbackLng: DEFAULT_LANG,
    defaultNS: DEFAULT_NS,
    ns: ['common', 'HomePage'],
    interpolation: {
      escapeValue: false, // React đã escape sẵn
    },
    react: {
      useSuspense: false, // Tắt suspense để tránh lỗi với React 19
    },
  });

// Lưu ngôn ngữ vào localStorage khi thay đổi
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
});

export default i18n;
