import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./auth-slice";
import cartSliceReducer from "./cart-slice";
import userSliceReducer from "./user-slice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import counterSliceReducer from "./counter-slice";


export const store = configureStore({
  reducer: {
    // counter: counterSliceReducer,
    auth: authSliceReducer,
    cart: cartSliceReducer,
    user: userSliceReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;