import { authActions } from './auth-slice';
import { Dispatch } from 'redux';
import { doc, collection, updateDoc, addDoc, getDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { serverTimestamp } from 'firebase/firestore';
import { auth, db } from "../firebase";
import { TCartMeal } from '../types/types';
import { useAppSelector } from './index';
import { cartActions } from './cart-slice';

export const addItemToCart = (item: TCartMeal, userId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const userDocRef = doc(db, "users", userId);
      console.log(userDocRef)
      await updateDoc(userDocRef, {
        "cart": arrayUnion(item),
      });
      dispatch(cartActions.addItem({ item: item }))
    } catch (error) {
      throw new Error('Ошибка добавления товара в корзину')
    }
  };
};

export const removeItemFromCart = (itemId: string, currentUser: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const userDocRef = doc(db, "users", currentUser);
      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
        const cart = userDocSnapshot.data().cart || [];
        const updatedCart = cart.filter((item: TCartMeal) => item.id !== itemId);
        await updateDoc(userDocRef, { cart: updatedCart }); 
        dispatch(cartActions.removeItem({ id: itemId }))
      } else {
        throw new Error('Пользователя не существует')
      }
    } catch (error) {
      throw new Error('Ошибка удаления')
    }
  };
};

export const updateItemsInCart = (userId: string, itemId: string, quantity: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const userDocRef = doc(db, 'users', userId);
      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
        const cart = userDocSnapshot.data().cart || [];
        const updatedCart = cart.map((item: TCartMeal) => {
          if (item.id === itemId) {
            return { ...item, quantity: Math.max(1, item.quantity + quantity) };
          }
          return item;
        });
        await updateDoc(userDocRef, { cart: updatedCart });
        dispatch(cartActions.updateItem({id: itemId, quantity: quantity}));
      } else {
        throw new Error('Пользователя не существует')
      }
    } catch (error) {
      throw new Error('Ошибка, количество не изменилось'); 
    }
  };
};