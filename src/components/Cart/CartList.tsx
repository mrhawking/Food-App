import { TCartMeal } from '../../types/types';
import { currencyFormatterRub } from '../../utils/util';
import { useTranslation } from "react-i18next";
import CartItem from './CartItem';
import classes from './CartList.module.css';

type Props = {
  items: TCartMeal[];
  totalPrice: number;
};

const CartList: React.FC<Props> = ({ items, totalPrice }) => {
  const total = currencyFormatterRub.format(totalPrice);
  const { t } = useTranslation();
  return (
    <div className={classes.listWrapper}>
      <ul className={classes.cartList}>
        {items.map(item => <CartItem key={item.id} item={item} />)}
      </ul>
      <p className={classes.cartTotal}>{t('cart.pay')}: {total}</p>
    </div>
  )
}

export default CartList