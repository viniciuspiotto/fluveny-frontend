import { ModuleLayout } from '@/components/layouts/module-layout';
import { PrivateLayout } from '@/components/layouts/private-layout';
import { CreateModulePage } from '@/features/module/pages/create-module-page';
import { IntroductionPage } from '@/features/module/pages/introduction';
import { PanelPage } from '@/features/module/pages/panel-page';
import { BrowserRouter, Route, Routes } from 'react-router';
import { ROUTES } from '../configs/routes';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.modules} element={<PrivateLayout />}>
          <Route index element={<PanelPage />} />
          <Route path="information" element={<CreateModulePage />} />
          <Route path="create" element={<ModuleLayout />}>
            <Route path="introduction" element={<IntroductionPage />} />
          </Route>
        </Route>
        <Route path="*" element={<div>404 - Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
