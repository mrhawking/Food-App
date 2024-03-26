import { authActions } from './auth-slice';
import { Dispatch } from 'redux';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore";
import { serverTimestamp } from 'firebase/firestore';
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";

export const checkAuthData = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      dispatch(authActions.login(user.uid));
      return user;
    } catch (error) {
      throw new Error('Ошибка авторизации');
    }
  };
};

export const createAuthData = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        email: email,
        cart: [],
        orders: [],
        ordersQuantity: 0,
        timeStamp: serverTimestamp()
      });
      dispatch(authActions.login(user.uid))
    } catch (error) {
      throw new Error('Ошибка регистрации');
    }
  }
}

export const signOutFromApp = () => {
  return async (dispatch: Dispatch) => {
    try {
      await signOut(auth);
      dispatch(authActions.logout())
    } catch (error) {
      console.log('Ошибочка вышла')
    }
  };
};