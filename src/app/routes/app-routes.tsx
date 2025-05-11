import { PrivateLayout } from '@/components/layouts/private-layout';
import { BrowserRouter, Route, Routes } from 'react-router';
import { ROUTES } from '../configs/routes';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={ROUTES.modules}
          element={<PrivateLayout>Teste</PrivateLayout>}
        />
        <Route path="*" element={<div>404 - Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
