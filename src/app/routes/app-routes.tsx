import { ModuleLayout } from '@/components/layouts/module-layout';
import { PrivateLayout } from '@/components/layouts/private-layout';
import { CreateModulePage } from '@/features/module/pages/create-module-page';
import { FinalChallengePage } from '@/features/module/pages/final-challenge';
import { IntroductionPage } from '@/features/module/pages/introduction';
import { PanelPage } from '@/features/module/pages/panel-page';
import { TopicPage } from '@/features/module/pages/topic-page';
import { BrowserRouter, Route, Routes } from 'react-router';
import { ROUTES } from '../configs/routes';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.modules} element={<PrivateLayout />}>
          <Route index element={<PanelPage />} />
          <Route path="setup" element={<CreateModulePage />} />
          <Route path="create/:id" element={<ModuleLayout />}>
            <Route path="introduction" element={<IntroductionPage />} />
            <Route path=":topic" element={<TopicPage />} />
            <Route path="final-challenge" element={<FinalChallengePage />} />
          </Route>
        </Route>
        <Route path="*" element={<div>404 - Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
