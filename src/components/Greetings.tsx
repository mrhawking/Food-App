import { useTranslation } from 'react-i18next';
import classes from './Greetings.module.css';

type Props = {
  text: string;
};

const Greetings: React.FC<Props> = ({text}) => {
  const { t } = useTranslation();
  return (
    <div className={classes.greetings}>
      <div className={classes.greetingsInner}>
        <h1>{t('greet.title')}</h1>
        <p>{text}</p>
      </div>
    </div>
  )
}

export default Greetings