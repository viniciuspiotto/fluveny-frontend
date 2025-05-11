import { Menu } from 'lucide-react';
import { Button } from '../ui/button';

export function Header() {
  return (
    <header className="flex h-16 w-full items-center justify-between px-8 py-4">
      <img src="/assets/logo.svg" alt="Logo da empresa" className="h-10" />
      <Button variant={'ghost'}>
        <Menu className="size-7" />
      </Button>
    </header>
  );
}
