import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/RootPage';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import LogInPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import PrivateRoutes from './utils/PrivateRoute';
import { useAppSelector } from './store';
import { db } from './firebase';
import { doc, addDoc, collection, updateDoc, getDoc, setDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { useAppDispatch } from './store';
import { Dispatch } from 'redux';
import { useEffect } from 'react';
import { fetchUserData } from './store/user-actions';


const router = createBrowserRouter([
  {
    path: '/', element: <RootLayout />, children: [
      { index: true, element: <HomePage /> },
      {
        element: <PrivateRoutes />, children: [
          { path: 'menu', element: <MenuPage /> },
          { path: 'cart', element: <CartPage /> },
          { path: 'orders', element: <OrdersPage /> },
        ]
      },
      { path: 'login', element: <LogInPage /> },
      { path: 'signup', element: <SignUpPage /> }
    ]
  }
]);

function App() {
  const { currentUser } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchUserData(currentUser))
    }
  }, [currentUser, dispatch]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
