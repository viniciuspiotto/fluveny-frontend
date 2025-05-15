import { NavigationSections } from '@/features/module/components/navigation-sections';
import { Outlet } from 'react-router';

// TODO: Título com botão de voltar
export const ModuleLayout = () => {
  return (
    <div className="flex h-screen flex-col">
      <div className="flex flex-1">
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
      <NavigationSections />
    </div>
  );
};
