import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store";

const PrivateRoutes = () => {
  const { currentUser } = useAppSelector(state => state.auth)
  const isAuth = !!currentUser;

  return (
    isAuth ? <Outlet /> : <Navigate to="/login"/>
  )
}

export default PrivateRoutes;