import classes from './Bg.module.css';

type Props = {
  children: JSX.Element
};

const Bg:React.FC<Props> = ({children}) => {
  return (
    <div className={classes.fullHigh}>
    <div className={classes.mainBg}>
      <div className={classes.mainBgItem}></div>
      <div className={classes.mainBgItem}></div>
      <div className={classes.mainBgItem}></div>
      <div className={classes.mainBgItem}></div>
    </div>
    {children}
  </div>
  )
}

export default Bg