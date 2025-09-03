import { NotFound } from '@/components/not-found';
import { Register } from '@/features/authentication/pages/register';
import { DashboardPage } from '@/features/dashboard/pages/dashboard-page';
import { DraftsPage } from '@/features/module/pages/drafts-page';
import { FormExercisePage } from '@/features/module/pages/form-exercise-page';
import { FormIntroductionPage } from '@/features/module/pages/form-introduction-page';
import { FormModulePage } from '@/features/module/pages/form-module-page';
import { FormPresentationPage } from '@/features/module/pages/form-presentation-page';
import { PanelPage } from '@/features/module/pages/panel-page';
import { CreateModuleLayout } from '@/features/module/templates/create-module-layout';
import { GrammarRuleLayout } from '@/features/module/templates/grammar-rule-layout';
import { PrivateLayout } from '@/templates/private-layout';
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
          { path: ROUTES.drafts, element: <DraftsPage /> },
          { path: ROUTES.create, element: <FormModulePage /> },
          {
            path: `${ROUTES.create}/${ROUTES.moduleId}`,
            element: <FormModulePage />,
          },
          {
            path: `${ROUTES.create}/${ROUTES.moduleId}`,
            element: <CreateModuleLayout />,
            children: [
              {
                path: ROUTES.introduction,
                element: <FormIntroductionPage />,
              },
              {
                path: `${ROUTES.grammarRule}/${ROUTES.grammarRuleId}`,
                element: <GrammarRuleLayout />,
                children: [
                  {
                    path: `${ROUTES.presentation}`,
                    element: <FormPresentationPage />,
                  },
                  {
                    path: `${ROUTES.exercise}`,
                    element: <FormExercisePage />,
                  },
                  {
                    path: `${ROUTES.presentation}/${ROUTES.windowId}`,
                    element: <FormPresentationPage />,
                  },
                  {
                    path: `${ROUTES.exercise}/${ROUTES.windowId}`,
                    element: <FormExercisePage />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: 'register',
    element: <Register />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
