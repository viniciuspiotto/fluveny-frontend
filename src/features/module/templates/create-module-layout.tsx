import { Outlet } from 'react-router';
import { NavigationSections } from '../components/navigation-sections';

export const CreateModuleLayout = () => {
  return (
    <>
      <div className="flex h-full flex-col">
        <Outlet />
      </div>
      <NavigationSections />
    </>
  );
};
