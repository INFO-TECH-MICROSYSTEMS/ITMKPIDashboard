import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from '../locales/en.json';
import zh from '../locales/zh.json';
import hi from '../locales/hi.json';
import es from '../locales/es.json';
import fr from '../locales/fr.json';
import ar from '../locales/ar.json';
import bn from '../locales/bn.json';
import pt from '../locales/pt.json';
import ru from '../locales/ru.json';
import de from '../locales/de.json';
import ja from '../locales/ja.json';

import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE, getLanguageDirection } from './languages';

const resources = {
  en: { translation: en },
  zh: { translation: zh },
  hi: { translation: hi },
  es: { translation: es },
  fr: { translation: fr },
  ar: { translation: ar },
  bn: { translation: bn },
  pt: { translation: pt },
  ru: { translation: ru },
  de: { translation: de },
  ja: { translation: ja },
};

const supportedCodes = SUPPORTED_LANGUAGES.map((l) => l.code);

export const updateHtmlAttributes = (langCode: string) => {
  if (typeof document !== 'undefined') {
    const code = supportedCodes.includes(langCode) ? langCode : DEFAULT_LANGUAGE;
    document.documentElement.lang = code;
    document.documentElement.dir = getLanguageDirection(code);
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: supportedCodes,
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'itm_language',
      caches: ['localStorage'],
      convertDetectedLanguage: (lng: string) => {
        if (!lng) return DEFAULT_LANGUAGE;
        const normalized = lng.toLowerCase().split('-')[0];
        return supportedCodes.includes(normalized) ? normalized : DEFAULT_LANGUAGE;
      },
    },
    interpolation: {
      escapeValue: false, // React handles escaping
    },
    react: {
      useSuspense: false,
    },
  });

// Apply document attributes on load and on language change
updateHtmlAttributes(i18n.language || DEFAULT_LANGUAGE);

i18n.on('languageChanged', (lng) => {
  updateHtmlAttributes(lng);
});

export default i18n;
