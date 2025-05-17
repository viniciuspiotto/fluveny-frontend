import { UserProfile } from '@/components/user-profile';
import { UserProfileSkeleton } from '@/components/user-profile-skeleton';
import { Menu } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '../ui/button';

export function Header() {
  const isLoading = false;

  return (
    <header className="flex h-16 w-full items-center justify-between border-b-1 px-4 py-4 lg:px-8 lg:py-10">
      <div className="flex items-center lg:gap-16">
        <Link to={'/'}>
          <img
            src="/assets/logo.svg"
            alt="Letra F com dois pedaços de pergaminhos atrás, um azul e outro vermelho, com a palavra fluveny com um degrade de azul e vermelho ao lado direito"
            className="h-10 lg:h-12"
          />
        </Link>
        <nav className="hidden space-x-12 lg:block">
          <Link to="/modules" className="text-lg">
            Módulos
          </Link>
          <Link to="/exercises" className="text-lg">
            Exercícios
          </Link>
          <Link to="/roadmap" className="text-lg">
            Roadmap
          </Link>
          <Link to="/conversation" className="text-lg">
            Conversação
          </Link>
        </nav>
      </div>
      {isLoading ? <UserProfileSkeleton /> : <UserProfile />}
      <Button variant={'ghost'} className="p-6 lg:hidden">
        <Menu className="size-7 lg:size-8" />
      </Button>
    </header>
  );
}
