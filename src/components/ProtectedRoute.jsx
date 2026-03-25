import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const ProtectedRoute = () => {
  const usuario = useSelector((state) => state.auth.usuario);

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};