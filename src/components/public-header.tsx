import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  ArrowRight,
  CircleUser,
  Info,
  Menu,
  MessageCircleQuestion,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

export const PublicHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="flex justify-between border-b-1 p-4">
      <div className="flex items-center gap-2">
        <Popover open={menuOpen} onOpenChange={setMenuOpen}>
          <PopoverTrigger asChild>
            <Button
              aria-label={menuOpen ? 'Fechar Menu' : 'Abrir Menu'}
              variant="ghost"
              className="cursor-pointer"
            >
              {menuOpen ? (
                <X className="size-8" />
              ) : (
                <Menu className="size-8" />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            sideOffset={15}
            className="w-screen rounded-none border-x-0 p-0 shadow-md"
          >
            <ul className="z-50 flex flex-col divide-y">
              <li>
                <Link
                  to="/about"
                  className="flex items-center gap-2 px-4 py-3 text-lg"
                  onClick={() => setMenuOpen(false)}
                >
                  <Info className="text-primary" />
                  Sobre nós
                </Link>
              </li>
              <li>
                <Link
                  to="/help"
                  className="flex items-center gap-2 px-4 py-3 text-lg"
                  onClick={() => setMenuOpen(false)}
                >
                  <MessageCircleQuestion className="text-primary" />
                  Ajuda
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-4 py-3 text-lg"
                  onClick={() => setMenuOpen(false)}
                >
                  <CircleUser className="text-primary" />
                  Faça login
                </Link>
              </li>
            </ul>
          </PopoverContent>
        </Popover>

        <Link to="/dashboard">
          <img
            src="/assets/logo.svg"
            alt="Logo Fluveny"
            className="h-10 lg:h-12"
          />
        </Link>
      </div>

      <div className="flex items-center gap-10">
        <Link to={'/login'} className="hidden md:flex">
          <Button className="cursor-pointer px-8 py-5 text-xl">Login</Button>
        </Link>

        <Link to={'/register'}>
          <div className="group text-primary relative flex w-30 cursor-pointer items-center overflow-hidden underline md:w-40 md:text-xl">
            <span className="relative z-10 transition-transform duration-300 ease-in-out group-hover:translate-x-6 md:group-hover:translate-x-8">
              Cadastra-se
            </span>

            <ArrowRight className="absolute top-1/2 right-0 size-5 -translate-y-1/2 transition-all duration-300 ease-in-out group-hover:translate-x-full group-hover:opacity-0 lg:size-7" />

            <ArrowRight className="lg: absolute top-1/2 left-0 size-5 -translate-x-full -translate-y-1/2 opacity-0 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:opacity-100 lg:-left-1 lg:size-7" />
          </div>
        </Link>
      </div>
    </header>
  );
};
