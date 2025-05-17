import { Outlet } from 'react-router';
import { Header } from './header';

export function PrivateLayout() {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
