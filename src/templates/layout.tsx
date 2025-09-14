import { Outlet } from 'react-router';
import { Header } from './header';

export const Layout = () => {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="h-screen">
        <Outlet />
      </main>
    </div>
  );
};
