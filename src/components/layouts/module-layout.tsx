import { getTitle } from '@/app/utils/get-title';
import { Back } from '@/features/module/components/back';
import { ConfirmNavigationModal } from '@/features/module/components/confirm-navigation-modal';
import { NavigationSections } from '@/features/module/components/navigation-sections';
import { Outlet, useLocation } from 'react-router';

export const ModuleLayout = () => {
  const location = useLocation();
  const moduleTopics = [{ slug: 'simple-present', name: 'Simple Present' }];

  const topic = location.pathname.split('/').at(-1);

  const title = getTitle(topic, moduleTopics);

  return (
    <div className="flex h-screen flex-col">
      <div className="flex flex-1 flex-col">
        <div className="relative flex w-full items-center justify-center py-10">
          <Back className="absolute left-8 lg:left-100" />
          <h2 className="text-3xl font-bold tracking-widest">{title}</h2>
        </div>
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
      <NavigationSections />
      <ConfirmNavigationModal />
    </div>
  );
};
