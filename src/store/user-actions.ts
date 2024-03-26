import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from "../firebase";
import { Dispatch } from 'redux';
import { cartActions } from './cart-slice';
import { userActions } from './user-slice';
import { TCartMeal, TOrder } from '../types/types';

export const fetchUserData = (currentUser: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(userActions.runLoading())
    dispatch(userActions.setError(''))
    try {
      const userDocRef = doc(db, 'users', currentUser);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const cart = userDocSnap.data().cart || [];
        const totalQuantity = cart.reduce((total: number, item: TCartMeal) => total + item.quantity, 0);
        const totalPrice = cart.reduce((total: number, item: TCartMeal) => total + (item.price.rub * item.quantity), 0);
        const orders = userDocSnap.data().orders || [];
        const ordersQuantity = orders.length;
        dispatch(cartActions.replaceCart({ cart, totalQuantity, totalPrice }));
        dispatch(userActions.updateOrders({ ordersQuantity, orders }));
      } else {
        dispatch(userActions.setError({ error: 'Данные пользователя не найдены' }))
        throw new Error('Данные пользователя не найдены');
      }
    } catch (error) {
      dispatch(userActions.setError({ error: 'Ошибка загрузки данных' }))
      throw new Error('Ошибка загрузки данных')
    } finally {
      dispatch(userActions.stopLoading())
    }
  };
};

export const createUserOrder = (newOrder: TOrder, userId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const userDocRef = doc(db, 'users', userId);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const orders = userDocSnap.data().orders || [];
        orders.push(newOrder);
        let ordersQuantity = userDocSnap.data().ordersQuantity || 0;
        ordersQuantity += 1;
        await updateDoc(userDocRef, { orders: orders });
        await updateDoc(userDocRef, { ordersQuantity: ordersQuantity });
        await updateDoc(userDocRef, { cart: [] });
        dispatch(userActions.createOrder({ order: newOrder }));
        dispatch(cartActions.clearCart());
      } else {
        throw new Error('Пользователя не существует');
      }
    } catch (error) {
      console.log(error)
    }
  };
};