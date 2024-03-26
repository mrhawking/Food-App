import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem('user');
const initialAuthState = {
  currentUser: storedUser ? JSON.parse(storedUser) : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.currentUser = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload))
    },
    logout(state) {
      state.currentUser = null;
      localStorage.removeItem('user')
    }
  }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;