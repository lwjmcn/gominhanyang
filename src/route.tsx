import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';

export const ProtectedRoute = () => {
  const { isAuth } = useAuthStore();
  return isAuth ? <Outlet /> : <Navigate to="/signin" replace />;
};
export const PublicRoute = () => {
  const { isAuth } = useAuthStore();
  return !isAuth ? <Outlet /> : <Navigate to="/" replace />;
};
