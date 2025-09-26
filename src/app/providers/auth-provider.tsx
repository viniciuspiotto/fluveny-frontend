import { useGetUserInformation } from '@/hooks/use-get-user-information';
import { useAuthStore } from '@/stores/auth-store';
import { useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: response, isSuccess } = useGetUserInformation();
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      setUser(response.data);
      navigate('/dashboard');
    } else {
      setUser(null);
    }
  }, [isSuccess, response, setUser, navigate]);

  return <>{children}</>;
};
