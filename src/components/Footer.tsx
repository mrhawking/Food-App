import { useTranslation } from 'react-i18next';
import classes from './Footer.module.css';

const Footer = () => {

  const { t } = useTranslation();
  return (
    <footer className={classes.mainFooter}>
      <div className="container">
        <div className={classes.mainFooterInner}>
          <p>{t('footer.address')}</p>
          <a href="tel:+1234567890">+1 (234) 567-890</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer