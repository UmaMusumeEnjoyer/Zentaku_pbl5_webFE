import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import {
  commonEn,
  homePageEn,
  commonJp,
  homePageJp,
  LANGUAGES,
  newsDetailPageEn,
  newsDetailPageJp,
} from '@umamusumeenjoyer/shared-logic';

export { LANGUAGES };

const DEFAULT_LANG = 'en';
const DEFAULT_NS = 'common';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: commonEn,
        HomePage: homePageEn,
        NewsDetailPage: newsDetailPageEn,
      },
      jp: {
        common: commonJp,
        HomePage: homePageJp,
        NewsDetailPage: newsDetailPageJp,
      },
    },
    lng: localStorage.getItem('language') || DEFAULT_LANG,
    fallbackLng: DEFAULT_LANG,
    defaultNS: DEFAULT_NS,
    ns: ['common', 'HomePage', 'NewsDetailPage'],
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
});

export default i18n;
