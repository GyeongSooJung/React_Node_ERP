import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationKO from "./locales/ko.json";
import translationEN from "./locales/en.json"; 
import translationEX from "./locales/ex.json"; 

const resource = {
  kr: {
    translation: translationKO
  },
  en: {
    translation: translationEN
  }
};
i18n.use(initReactI18next).init({
  resources: resource,
  lng: "kr",
  fallbackLng: "kr",
  debug: true,
  keySeparator: false,
  interpolation: { escapeValue: false },
});

export default i18n;