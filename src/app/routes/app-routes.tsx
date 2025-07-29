import { CreateModuleLayout } from '@/components/layouts/create-module-layout';
import { PrivateLayout } from '@/components/layouts/private-layout';
import { NotFound } from '@/components/not-found';
import { Toaster } from '@/components/ui/toaster';
import { DashboardPage } from '@/features/dashboard/pages/dashboard-page';
import { CreateModulePage } from '@/features/module/pages/create-module-page';
import { DraftsPage } from '@/features/module/pages/drafts-page';
import { EditModulePage } from '@/features/module/pages/edit-module-page';
import { FinalChallengePage } from '@/features/module/pages/final-challenge-page';
import { GrammarRulePage } from '@/features/module/pages/grammar-rule-page';
import { IntroductionPage } from '@/features/module/pages/introduction-page';
import { ModulePage } from '@/features/module/pages/module-page';
import { PanelPage } from '@/features/module/pages/panel-page';
import { BrowserRouter, Route, Routes } from 'react-router';
import { ROUTES } from '../configs/routes';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateLayout />}>
          <Route path={ROUTES.dashboard} element={<DashboardPage />} />
          <Route path={ROUTES.modules}>
            <Route index element={<PanelPage />} />
            <Route path="drafts" element={<DraftsPage />} />
            <Route path="new" element={<CreateModulePage />} />
            <Route path=":id" element={<ModulePage />} />
            <Route path="create/:id" element={<CreateModuleLayout />}>
              <Route path="introduction" element={<IntroductionPage />} />
              <Route path=":grammar-rule" element={<GrammarRulePage />} />
              <Route path="final-challenge" element={<FinalChallengePage />} />
            </Route>
            <Route path="edit/:id" element={<EditModulePage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}
