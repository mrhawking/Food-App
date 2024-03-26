import { useRef, useState } from 'react';
import { Button } from './UI/Button';
import { validateEmail, validatePassword } from '../utils/util';
import { useTranslation } from 'react-i18next';
import classes from './AuthForm.module.css';

type FormProps = {
  mode: 'login' | 'signup';
  serverError: string;
  onSubmitForm: (email: string, password: string) => void;
};

const AuthForm: React.FC<FormProps> = ({ mode, onSubmitForm, serverError }) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);
    if (emailRef.current && passwordRef.current) {
      const enteredEmail = emailRef.current.value.trim();
      const enteredPassword = passwordRef.current.value.trim();
      const isEmailValid = validateEmail(enteredEmail);
      const isPassworfValid = validatePassword(enteredPassword);

      if (!isEmailValid) {
        setErrors(prevErrors => (
          [...prevErrors, 'Проверьте email']
        ))
      }

      if (!isPassworfValid) {
        setErrors(prevErrors => (
          [...prevErrors, 'Проверьте пароль']
        ))
      }

      if (isEmailValid && isPassworfValid) {
        onSubmitForm(enteredEmail, enteredPassword);
      }
    }
  }

  return (
    <div className={classes.auth}>
      <form onSubmit={handleSubmit} className={classes.authForm}>
        <h2 className={classes.authFormTitle}>{mode === 'login' ? `${t('auth-form.login')}` : `${t('auth-form.reg')}`}</h2>
        <div className={classes.authFormWrapper}>
          <label className="visually-hidden" htmlFor="email">{t('auth-form.email-label')}</label>
          <input onFocus={()=>setErrors([])} ref={emailRef} type="email" placeholder={t('auth-form.email')} id='email' name='email'/>
        </div>
        <div className={classes.authFormWrapper}>
          <label className="visually-hidden" htmlFor="email">{t('auth-form.pass-label')}</label>
          <input onFocus={()=>setErrors([])} ref={passwordRef} type="password" placeholder={t('auth-form.password')} id='password' name='password'/>
        </div>
        <Button type="submit">{mode === 'login' ? `${t('auth-form.login-action')}` : `${t('auth-form.create')}`}</Button>
        {errors && errors.length > 0 && (
          <ul>
            {errors.map((error) => <li className="error" key={error}>{error}</li>)}
          </ul>
        )}
        {(serverError !== '') ? <p className="error">{serverError}</p> : undefined}
      </form>
    </div>
  )
}

export default AuthForm;