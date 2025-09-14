import { UserProfile } from '@/components/user-profile';
import { UserProfileSkeleton } from '@/components/user-profile-skeleton';
import {
  Dumbbell,
  LayoutGrid,
  Map,
  Menu,
  MessagesSquare,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { Link } from 'react-router';
import { Button } from './ui/button';

export function PrivateHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoading = false;

  const menuVariants = {
    closed: { height: 0, opacity: 0, transition: { duration: 0.2 } },
    open: { height: 'auto', opacity: 1, transition: { duration: 0.3 } },
  };

  return (
    <header className="relative flex h-16 w-full items-center justify-between border-b px-4 py-4 lg:px-8 lg:py-10">
      <div className="flex items-center gap-2">
        <Button
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Fechar Menu' : 'Abrir Menu'}
          variant="ghost"
          className="p-2 lg:hidden"
        >
          {menuOpen ? <X className="size-8" /> : <Menu className="size-8" />}
        </Button>
        <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
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
                  className="flex items-center gap-2 px-4 py-3 text-lg"
                  onClick={() => setMenuOpen(false)}
                >
                  <LayoutGrid className="text-primary size-5" />
                  Módulos
                </Link>
              </li>
              <li>
                <Link
                  to="/exercises"
                  className="flex items-center gap-2 px-4 py-3 text-lg"
                  onClick={() => setMenuOpen(false)}
                >
                  <Dumbbell className="text-primary size-5" />
                  Exercícios
                </Link>
              </li>
              <li>
                <Link
                  to="/roadmap"
                  className="flex items-center gap-2 px-4 py-3 text-lg"
                  onClick={() => setMenuOpen(false)}
                >
                  <Map className="text-primary size-5" />
                  Roadmap
                </Link>
              </li>
              <li>
                <Link
                  to="/conversations"
                  className="flex items-center gap-2 px-4 py-3 text-lg"
                  onClick={() => setMenuOpen(false)}
                >
                  <MessagesSquare className="text-primary size-5" />
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
