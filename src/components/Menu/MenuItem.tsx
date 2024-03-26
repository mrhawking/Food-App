import { useState } from 'react';
import { TMeal } from '../../types/types';
import { currencyFormatterRub } from '../../utils/util';
import { useAppDispatch } from '../../store';
import { addItemToCart } from '../../store/cart-actions';
import { useAppSelector } from '../../store';
import { useTranslation } from 'react-i18next';
import QuantityControls from '../UI/QuantityControls';
import useTranslationItem from '../../hooks/useTranslationItem';
import classes from './MenuItem.module.css';

const MenuItem: React.FC<{ item: TMeal }> = ({ item }) => {
  const [quantity, setQuantity] = useState(1);
  const priceRub = <span className={classes.menuItemPrice}>{currencyFormatterRub.format(item.price.rub)}</span>;
  const dispatch = useAppDispatch();
  const {currentUser} = useAppSelector(state=>state.auth)
  const {items: cartItems} = useAppSelector(state=>state.cart)
  const { t } = useTranslation();
  const {getTranslatedText} = useTranslationItem(item);

  const inCart = (id: string) => {
    return cartItems.some(item => item.id === id);
  };

  const handleIncrease = () => {
    setQuantity(prev => prev + 1)
  };

  const handleDecrease = () => {
    setQuantity(prev => prev - 1)
  };

  const handleAdd = () => {
    dispatch(addItemToCart({...item, quantity: quantity}, currentUser))
  };

  return (
    <li className={classes.menuItem}>
      <div className={classes.itemLeftSide}>
        <div className={classes.imgWrapper}>
          <img src={item.img} alt={item.title.ru} />
        </div>
        <QuantityControls quantity={quantity} onIncrease={handleIncrease} onDecrease={handleDecrease}/>
        <button disabled={inCart(item.id)} className={!inCart(item.id) ? classes.menuButton : `${classes.menuButton} ${classes.disabled}`} onClick={handleAdd}>{inCart(item.id) ? t('menu.cart') : t('menu.add')}</button>
      </div>
      <div className={classes.itemRightSide}>
        <h3 className={classes.menuItemTitle}>{getTranslatedText(item.title)}</h3>
        <p className={classes.menuItemDesc}>{getTranslatedText(item.description)}</p>
        <p className={classes.menuItemPrice}>{priceRub}</p>
      </div>
    </li>
  )
}

export default MenuItem;