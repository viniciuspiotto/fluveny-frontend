import { useGetUserInformation } from '@/hooks/use-get-user-information';
import { useAuthStore } from '@/stores/auth-store';
import { useEffect, type ReactNode } from 'react';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: user, isSuccess } = useGetUserInformation();
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    if (isSuccess) {
      setUser(user);
    } else {
      setUser(null);
    }
  }, [isSuccess, user, setUser]);

  return <>{children}</>;
};
