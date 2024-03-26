import useTranslationItem from '../../hooks/useTranslationItem';
import { TOrder } from '../../types/types';
import { useTranslation } from "react-i18next";
import classes from './OrderItem.module.css';

type Props = {
  order: TOrder;
};

const OrderItem: React.FC<Props> = ({ order }) => {
  const {getTranslatedText} = useTranslationItem(order);
  const { t } = useTranslation();

  return (
    <li className={classes.orderItem}>
      <h3 className={classes.orderItemTitle}>{t('orders.order')} {order.id}</h3>
      <ol className={classes.itemsList}>
        {order.items.map(item => (
          <li key={item.id}>
            <span>{getTranslatedText(item.title)}</span>
            <span>{item.quantity}{t('orders.part')}.</span>
          </li>
        ))}
      </ol>
    </li>
  )
}

export default OrderItem