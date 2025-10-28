import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router";

export default function AuthRoute() {

  const {user} = useSelector((state) => state.userSlice);
  return user ? <Navigate to='/' /> : <Outlet/>
}
