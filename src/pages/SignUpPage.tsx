import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store';
import { useAppSelector } from '../store';
import { createAuthData } from '../store/auth-actions';
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import AuthForm from "../components/AuthForm";
import { db } from '../firebase';
import Bg from '../components/UI/Bg';

const SignUpPage = () => {

  const [serverError, setServerError] = useState<string>('');
  const { currentUser } = useAppSelector(state => state.auth)
  const isAuth = !!currentUser;
  const navigate = useNavigate();
  const dispatch = useAppDispatch()

  const handleSignup = async (email: string, password: string) => {
    setServerError('')
    try {
      await dispatch(createAuthData(email, password));
      navigate('/')
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
        setServerError('Ошибка, возможно вы уже зарегистрированы')
      }
    }
  }


  return (
    <>
      {isAuth && <p className="alignCenter">Вы вошли в систему</p>}
      {!isAuth && (
        <Bg>
          <AuthForm mode="signup" onSubmitForm={handleSignup} serverError={serverError} />
        </Bg>
      )}
    </>
  )
}

export default SignUpPage;