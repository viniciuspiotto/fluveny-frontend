import { CreateModuleLayout } from '@/components/layouts/create-module-layout';
import { PrivateLayout } from '@/components/layouts/private-layout';
import { NotFound } from '@/components/not-found';
import { DashboardPage } from '@/features/dashboard/pages/dashboard-page';
import { CreateModulePage } from '@/features/module/pages/create-module-page';
import { DraftsPage } from '@/features/module/pages/drafts-page';
import { EditModulePage } from '@/features/module/pages/edit-module-page';
import { FinalChallengePage } from '@/features/module/pages/final-challenge-page';
import { GrammarRulePage } from '@/features/module/pages/grammar-rule-page';
import { IntroductionPage } from '@/features/module/pages/introduction-page';
import { ModulePage } from '@/features/module/pages/module-page';
import { PanelPage } from '@/features/module/pages/panel-page';
import { createBrowserRouter } from 'react-router';
import { ROUTES } from '../configs/routes';

export const router = createBrowserRouter([
  {
    element: <PrivateLayout />,
    children: [
      { path: ROUTES.dashboard, element: <DashboardPage /> },
      {
        path: ROUTES.modules,
        children: [
          { index: true, element: <PanelPage /> },
          { path: 'drafts', element: <DraftsPage /> },
          { path: 'new', element: <CreateModulePage /> },
          { path: ':id', element: <ModulePage /> },
          {
            path: 'create/:id',
            element: <CreateModuleLayout />,
            children: [
              { path: 'introduction', element: <IntroductionPage /> },
              { path: ':grammarRuleId', element: <GrammarRulePage /> },
              { path: 'finalChallenge', element: <FinalChallengePage /> },
            ],
          },
          { path: 'edit/:id', element: <EditModulePage /> },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
