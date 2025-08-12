import { UserProfile } from '@/components/user-profile';
import { UserProfileSkeleton } from '@/components/user-profile-skeleton';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { Link } from 'react-router';
import { Button } from '../components/ui/button';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoading = false;

  const menuVariants = {
    closed: { height: 0, opacity: 0, transition: { duration: 0.2 } },
    open: { height: 'auto', opacity: 1, transition: { duration: 0.3 } },
  };

  return (
    <header className="relative flex h-16 w-full items-center justify-between border-b px-4 py-4 lg:px-8 lg:py-10">
      <div className="flex items-center">
        <Link to="/" onClick={() => setMenuOpen(false)}>
          <img
            src="/assets/logo.svg"
            alt="Logo Fluveny"
            className="h-10 lg:h-12"
          />
        </Link>
        <nav className="hidden space-x-12 px-10 lg:flex">
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

      <Button
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={menuOpen ? 'Fechar Menu' : 'Abrir Menu'}
        variant="ghost"
        className="p-2 lg:hidden"
      >
        {menuOpen ? <X className="size-8" /> : <Menu className="size-8" />}
      </Button>

      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.nav
            className="absolute top-16 left-0 z-99 w-full overflow-hidden bg-white shadow-md lg:hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <ul className="z-50 flex flex-col divide-y">
              <li>
                <Link
                  to="/modules"
                  className="block px-4 py-3 text-lg"
                  onClick={() => setMenuOpen(false)}
                >
                  Módulos
                </Link>
              </li>
              <li>
                <Link
                  to="/exercises"
                  className="block px-4 py-3 text-lg"
                  onClick={() => setMenuOpen(false)}
                >
                  Exercícios
                </Link>
              </li>
              <li>
                <Link
                  to="/roadmap"
                  className="block px-4 py-3 text-lg"
                  onClick={() => setMenuOpen(false)}
                >
                  Roadmap
                </Link>
              </li>
              <li>
                <Link
                  to="/conversation"
                  className="block px-4 py-3 text-lg"
                  onClick={() => setMenuOpen(false)}
                >
                  Conversação
                </Link>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
