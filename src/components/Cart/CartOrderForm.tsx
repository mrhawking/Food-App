import { useRef, useState } from 'react';
import { Button } from '../UI/Button';
import classes from './CartOrderForm.module.css';
import { validatePhone } from '../../utils/util';
import { TOrder } from '../../types/types';
import { useAppSelector, useAppDispatch } from '../../store';
import { useTranslation } from "react-i18next";
import { PaymentMethod } from '../../types/types';
import { createUserOrder } from '../../store/user-actions';

const MIN_ADDRESS_LENGTH: number = 10

type Props = {
  onCreate: (orderId: number) => void
};

const CartOrderForm: React.FC<Props> = ({onCreate}) => {
  const [error, setError] = useState<string>('');
  const phoneRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLInputElement>(null);
  const cashRef = useRef<HTMLInputElement>(null);
  const { items } = useAppSelector(state => state.cart);
  const { ordersQuantity } = useAppSelector(state => state.user);
  const { currentUser } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleCreateOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const phone = phoneRef.current?.value.trim();
    const address = addressRef.current?.value.trim();
    let payment: PaymentMethod | null = null;

    if (cardRef.current?.checked) {
      payment = PaymentMethod.CARD;
    } else if (cashRef.current?.checked) {
      payment = PaymentMethod.CASH;
    }

    if (!phone || !address || !payment) {
      setError('Все поля обязательны для заполнения');
      return;
    };

    if (phone && address && payment) {
      if (!validatePhone(phone) || !(address.length > MIN_ADDRESS_LENGTH)) {
        setError('Неверный адрес или телефон')
        return;
      }
    }

    const order: TOrder = {
      id: ordersQuantity + 1,
      items: items,
      orderInfo: {
        address: address,
        phone: phone,
        payment: payment,
      }
    };

    dispatch(createUserOrder(order, currentUser));
    onCreate(ordersQuantity + 1);
  };

  return (
    <section className={classes.order}>
      <form onSubmit={handleCreateOrder} className={classes.orderForm}>
        <div className={classes.inputsWrapper}>
          <div className={classes.inputWrapper}>
            <label htmlFor="address">{t('cart.address')}</label>
            <input onFocus={() => setError('')} ref={addressRef} type="text" name="address" id="address" />
          </div>
          <div className={classes.inputWrapper}>
            <label htmlFor="tel">{t('cart.phone')}</label>
            <input onFocus={() => setError('')} ref={phoneRef} type="tel" name="tel" id="tel" />
          </div>
        </div>
        <fieldset className={classes.orderPayment}>
          <legend>{t('cart.payment')}:</legend>
          <div className={classes.radioWrapper}>
            <input onFocus={() => setError('')} ref={cashRef} type="radio" id="cash" name="payment" value="cash" />
            <label htmlFor="cash">{t('cart.bycash')}</label>
          </div>
          <div className={classes.radioWrapper}>
            <input onFocus={() => setError('')} ref={cardRef} type="radio" id="card" name="payment" value="card" />
            <label htmlFor="card">{t('cart.bycard')}</label>
          </div>
        </fieldset>
        <Button type="submit" className={classes.orderFormButtun}>{t('cart.order')}</Button>
      </form>
      {error && <p className="alignCenter error">{error}</p>}
    </section>
  )
}

export default CartOrderForm