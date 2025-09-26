import { ROUTES } from '@/app/configs/routes';
import { useAuthStore } from '@/stores/auth-store';
import { type ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router';

type PublicRouteProps = {
  children: ReactNode;
};

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);
  const location = useLocation();

  if (isLoading) {
    return <div>loading</div>;
  }

  const from = location.state?.from?.pathname || ROUTES.dashboard;

  if (user) {
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
};
