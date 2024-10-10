import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const user = localStorage.getItem('token') !==null;
  return user ? <Outlet /> : <Navigate to = "/" />;
}

export default PrivateRoutes;