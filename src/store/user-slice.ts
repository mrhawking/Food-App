import { createSlice } from "@reduxjs/toolkit";
import { TOrder } from "../types/types";

type State = {
  ordersQuantity: number;
  orders: TOrder[];
  loading: boolean;
  error: string;
};

const initialUserState: State = {
  ordersQuantity: 0,
  orders: [],
  loading: false,
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    createOrder(state, action) {
      state.ordersQuantity += 1;
      state.orders?.push(action.payload.order)
    },
    updateOrders(state, action) {
      state.ordersQuantity = action.payload.ordersQuantity;
      state.orders = action.payload.orders;
    },
    runLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    },
    setError(state, action) {
      state.error = action.payload.error;
    }
  }
});

export const userActions = userSlice.actions;
export default userSlice.reducer;