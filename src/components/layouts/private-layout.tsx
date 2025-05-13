import { Outlet } from 'react-router';
import { Header } from './header';

export function PrivateLayout() {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
