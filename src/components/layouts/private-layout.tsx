import type { ReactNode } from 'react';
import { Header } from './header';

type PrivateLayoutProps = {
  children: ReactNode;
};

export function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}
