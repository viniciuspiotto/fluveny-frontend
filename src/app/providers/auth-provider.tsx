import { useGetUserInformation } from '@/hooks/use-get-user-information';
import { useAuthStore } from '@/stores/auth-store';
import { LoaderCircle } from 'lucide-react';
import { useEffect, type ReactNode } from 'react';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: response,
    isSuccess,
    isLoading,
    isError,
  } = useGetUserInformation();
  const setUser = useAuthStore((state) => state.setUser);
  const isAuthLoading = useAuthStore((state) => state.isLoading);
  const setIsLoading = useAuthStore((state) => state.setIsLoading);

  useEffect(() => {
    if (isLoading) {
      setIsLoading(true);
    }

    if (isSuccess) {
      setUser(response.data);
      setIsLoading(false);
    }

    if (isError) {
      setUser(null);
      setIsLoading(false);
    }
  }, [isLoading, isSuccess, isError, response, setUser, setIsLoading]);

  if (isAuthLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-100">
        <LoaderCircle className="h-12 w-12 animate-spin text-indigo-600" />
      </div>
    );
  }

  return <>{children}</>;
};
