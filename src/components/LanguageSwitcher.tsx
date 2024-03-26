import i18n from "../i18n";
import classes from './LanguageSwitcher.module.css';

const LanguageSwitcher = () => {
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className={classes.langSwitcher}>
      <button onClick={() => changeLanguage('en')} aria-label="Switch to English">En</button>
      <button onClick={() => changeLanguage('ru')} aria-label="Переключиться на русский">Ru</button>
    </div>
  );
};

export default LanguageSwitcher;