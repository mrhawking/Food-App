import { useAppSelector } from '../../store';
import { useTranslation } from "react-i18next";
import OrderItem from './OrderItem';
import classes from './OrdersList.module.css';

const OrdersList = () => {
  const { orders } = useAppSelector(state => state.user);
  const { loading, error } = useAppSelector(state => state.user);
  const { t } = useTranslation();

  return (
    <section className={classes.orders}>
      <div className="container">
        <h2 className="alignCenter title">{t('orders.title')}</h2>
        {error && <p className="alignCenter error">{error}</p>}
        {loading && <p className="alignCenter title">{t('load')}...</p>}
        {orders.length < 1 && !loading && !error && <p className="alignCenter">{t('orders.empty')}</p>}

        {orders.length > 0 && !loading && !error && (<ul className={classes.ordersList}>
          {orders.map(order => <OrderItem key={order.id} order={order} />)}
        </ul>)}
      </div>
    </section>
  )
}

export default OrdersList