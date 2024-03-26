import { useState } from 'react';
import AuthForm from '../components/AuthForm';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store';
import { checkAuthData } from '../store/auth-actions';
import { useAppSelector } from '../store';
import Bg from '../components/UI/Bg';

const LogInPage = () => {
  const [serverError, setServerError] = useState<string>('');
  const { currentUser } = useAppSelector(state => state.auth)
  const isAuth = !!currentUser;
  const navigate = useNavigate();
  const dispatch = useAppDispatch()

  const handleSubmit = async (email: string, password: string) => {
    setServerError('')
    try {
      await dispatch(checkAuthData(email, password));
      navigate('/')
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
        setServerError('Email не зарегистрирован или пароль введен неверно')
      }
    }
  }

  return (
    <>
      {isAuth && <p className="alignCenter">Вы уже вошли в систему</p>}
      {!isAuth && (
        <>
          <Bg>
            <AuthForm mode="login" onSubmitForm={handleSubmit} serverError={serverError} />
          </Bg>
        </>
      )}
    </>
  )
}

export default LogInPage