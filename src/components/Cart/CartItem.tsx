import { TCartMeal } from '../../types/types';
import { FaRegTrashAlt } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { currencyFormatterRub } from '../../utils/util';
import { useAppDispatch, useAppSelector } from '../../store';
import { useTranslation } from 'react-i18next';
import QuantityControls from '../UI/QuantityControls';
import useTranslationItem from '../../hooks/useTranslationItem';
import { removeItemFromCart, updateItemsInCart } from '../../store/cart-actions';
import classes from './CartItem.module.css';

type Props = {
  item: TCartMeal;
};

const CartItem: React.FC<Props> = ({ item }) => {
  const dispatch = useAppDispatch();
  const {currentUser} = useAppSelector(state=> state.auth);
  const { t } = useTranslation();
  const {getTranslatedText} = useTranslationItem(item);
  const itemTotalPrice = currencyFormatterRub.format(item.quantity * item.price.rub);
  const priceRub = <span className={classes.menuItemPrice}>{currencyFormatterRub.format(item.price.rub)}</span>;

  const handleIncrease = () => {
    dispatch(updateItemsInCart(currentUser, item.id, 1))
  };

  const handleDecrease = () => {
    dispatch(updateItemsInCart(currentUser, item.id, -1))
  };

  const handleRemove = () => {
    dispatch(removeItemFromCart(item.id, currentUser));
  };

  return (
    <li className={classes.cartItem}>
      <button className={classes.cartItemDelete} onClick={handleRemove}>
        <FaRegTrashAlt color="white" />
        <span className="visually-hidden">{t('del')}</span>
      </button>
      <h3 className={classes.cartItemTitle}>{getTranslatedText(item.title)}</h3>
      <QuantityControls quantity={item.quantity} onIncrease={handleIncrease} onDecrease={handleDecrease} />
      <ImCross className={classes.cartItemCross}/>
      <span className={classes.cartItemPrice}>{priceRub}</span>
      <span className={classes.cartItemTotal}>{itemTotalPrice}</span>
    </li>
  )
}

export default CartItem