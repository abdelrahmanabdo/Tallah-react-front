import i18n from "i18next";
import {
  reactI18nextModule
} from "react-i18next";

import translationEN from './locales/en/index.json';
import translationAr from './locales/ar/index.json';


// the translations
const resources = {
  en: {
    translation: translationEN
  },
  ar: {
    translation: translationAr
  } 
};

i18n
  .use(reactI18nextModule) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false // react already safes from xss
    },
    react: {
      wait: true
    }
  });

export default i18n;