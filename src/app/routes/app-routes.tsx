import { CreateModuleLayout } from '@/components/layouts/create-module-layout';
import { PrivateLayout } from '@/components/layouts/private-layout';
import { DetailsPage } from '@/features/module/pages/details-page';
import { FinalChallengePage } from '@/features/module/pages/final-challenge-page';
import { IntroductionPage } from '@/features/module/pages/introduction-page';
import { PanelPage } from '@/features/module/pages/panel-page';
import { GrammarRulePage } from '@/features/module/pages/topic-page';
import { BrowserRouter, Route, Routes } from 'react-router';
import { ROUTES } from '../configs/routes';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.modules} element={<PrivateLayout />}>
          <Route index element={<PanelPage />} />
          <Route path="details" element={<DetailsPage />} />
          <Route path="create/:id" element={<CreateModuleLayout />}>
            <Route path="introduction" element={<IntroductionPage />} />
            <Route path=":grammarRule" element={<GrammarRulePage />} />
            <Route path="final-challenge" element={<FinalChallengePage />} />
          </Route>
        </Route>
        <Route path="*" element={<div>404 - Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
