import { useAppSelector } from "../store"
import { useTranslation } from 'react-i18next';
import Bg from "../components/UI/Bg";
import Greetings from "../components/Greetings";

const HomePage = () => {
  const { currentUser } = useAppSelector(state => state.auth);
  const isAuth = !!currentUser;
  const { t } = useTranslation();

  return (
    <Bg>
      <>
        {isAuth && <Greetings text={t('greet.text-auth')} />}
        {!isAuth && <Greetings text={t('greet.text')} />}
      </>
    </Bg>
  )
}

export default HomePage