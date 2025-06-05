import { Outlet } from 'react-router';
import { Header } from './header';

export function PrivateLayout() {
  return (
    <div className="flex h-full flex-col">
      <Header />
      <main className="h-full">
        <Outlet />
      </main>
    </div>
  );
}
