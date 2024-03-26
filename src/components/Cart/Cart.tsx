import { useState } from 'react';
import { useAppSelector } from '../../store';
import { useTranslation } from "react-i18next";
import classes from './Cart.module.css';
import CartList from './CartList';
import CartOrderForm from './CartOrderForm';

const Cart = () => {
  const { items, totalPrice } = useAppSelector(state => state.cart);
  const { loading, error } = useAppSelector(state => state.user);
  const [orderNumber, setOrderNumber] = useState<number>(0);
  const { t } = useTranslation();

  return (
    <section className={classes.cart}>
      <div className="container">
        <h2 className="title alignCenter">{t('cart.title')}</h2>
        {error && <p className="alignCenter error">{error}</p>}
        {loading && <p className="alignCenter title">{t('load')}...</p>}
        {items.length < 1 && !loading && !error && <p className="alignCenter">{t('cart.empty')}</p>}
        {orderNumber > 0 && items.length < 1 && !loading && <p className="alignCenter title">{t('cart.number')}: {orderNumber}</p>}
        {items.length > 0 && !loading && !error && (
          <>
            <CartList items={items} totalPrice={totalPrice}/>
            <CartOrderForm onCreate={(orderId) => setOrderNumber(orderId)}/>
          </>
        )}
      </div>
    </section>
  )
};

export default Cart;