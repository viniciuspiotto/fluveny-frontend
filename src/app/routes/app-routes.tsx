import { PrivateLayout } from '@/components/layouts/private-layout';
import { CreateModulePage } from '@/features/module/pages/create-module-page';
import { PanelPage } from '@/features/module/pages/panel-page';
import { BrowserRouter, Route, Routes } from 'react-router';
import { ROUTES } from '../configs/routes';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.modules} element={<PrivateLayout />}>
          <Route index element={<PanelPage />} />
          <Route path={ROUTES.create} element={<CreateModulePage />} />
        </Route>
        <Route path="*" element={<div>404 - Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
