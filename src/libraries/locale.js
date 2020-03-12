import messages from "../translations";

export const getLocale = () => {
  const language = getLanguage();
  return language.split(/[-_]/)[0].toLocaleLowerCase();
};

export const getLanguage = () => {
  const navLanguage = navigator.language.replace('-', '_');
  const defaultLanguage = 'fr_FR';

return 'fr_FR';
  return Object.keys(messages).indexOf(navLanguage) !== -1 ? navLanguage : defaultLanguage;
};