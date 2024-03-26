import classes from './QuantityControls.module.css';

type Props = {
  quantity: number;
  onIncrease: ()=> void;
  onDecrease: ()=> void;
};

const QuantityControls: React.FC<Props> = ({quantity, onIncrease, onDecrease}) => {
  return (
    <div className={classes.quantityControls}>
      <button className={quantity < 2 ? classes.disabled : undefined} onClick={onDecrease} disabled={quantity < 2}>-</button>
      <label className="visually-hidden" htmlFor="quantity">Количество</label>
      <input type="text" value={quantity} readOnly />
      <button onClick={onIncrease}>+</button>
    </div>
  )
}

export default QuantityControls