import { ButtonNavLink, Button } from './UI/Button';
import { IoMdCart } from "react-icons/io";
import { useAppSelector, useAppDispatch } from '../store';
import { signOutFromApp } from '../store/auth-actions';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import classes from './Header.module.css';

const Header: React.FC = () => {
  const { currentUser } = useAppSelector(state => state.auth)
  const { totalQuantity } = useAppSelector(state => state.cart)
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const isAuth = !!currentUser;

  const handleExit = () => {
    dispatch(signOutFromApp());
  };

  return (
    <header className={classes.mainHeader}>
      <div className="container">
        {isAuth && (
          <nav className={classes.mainNavAuth}>
            <ul className={classes.navList}>
              <li>
                <ButtonNavLink url="/menu">{t('header.menu')}</ButtonNavLink>
              </li>
            </ul>
            <ul className={classes.userNav}>
            <li><LanguageSwitcher/></li>
              <li className={classes.cart}>
                <span className={classes.cartLabel}>{totalQuantity}</span>
                <ButtonNavLink url="/cart">
                  <span className="visually-hidden">{t('header.cart')}</span>
                  <IoMdCart fontSize={24} />
                </ButtonNavLink>
              </li>
              <li>
                <ButtonNavLink url="orders">{t('header.orders')}</ButtonNavLink>
              </li>
              <li>
                <Button onClick={handleExit}>{t('header.logout')}</Button>
              </li>
            </ul>
          </nav>
        )}
        {!isAuth && (
          <nav className={classes.mainNavNotAuth}>
            <ul className={classes.userNav}>
              <li>
                <ButtonNavLink url="/signup">{t('header.signup')}</ButtonNavLink>
              </li>
              <li>
                <ButtonNavLink url="/login">{t('header.login')}</ButtonNavLink>
              </li>
              <li><LanguageSwitcher/></li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header