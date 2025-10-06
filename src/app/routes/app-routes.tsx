import { LoginPage } from '@/features/authentication/pages/login';
import { RegisterPage } from '@/features/authentication/pages/register';
import { DashboardPage } from '@/features/dashboard/pages/dashboard-page';
import { DraftsPage } from '@/features/module/pages/drafts-page';
import { FormExerciseFinalChallengePage } from '@/features/module/pages/form-exercise-final-challenge.page';
import { FormExerciseGrammarRulePage } from '@/features/module/pages/form-exercise-grammar-rule-page';
import { FormFinalChallengePage } from '@/features/module/pages/form-final-challenge-page';
import { FormIntroductionPage } from '@/features/module/pages/form-introduction-page';
import { FormModulePage } from '@/features/module/pages/form-module-page';
import { FormPresentationPage } from '@/features/module/pages/form-presentation-page';
import { PanelPage } from '@/features/module/pages/panel-page';
import { CreateModuleLayout } from '@/features/module/templates/create-module-layout';
import { GrammarRuleLayout } from '@/features/module/templates/grammar-rule-layout';
import { Layout } from '@/templates/layout';
import { NotFound } from '@/templates/not-found';
import { ProtectedRoute } from '@/templates/private-route';
import { PublicRoute } from '@/templates/public-route';
import { createBrowserRouter } from 'react-router';
import { ROUTES } from '../configs/routes';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: ROUTES.dashboard,
        element: (
          <ProtectedRoute
            permittedRoles={['STUDENT', 'CONTENT_CREATOR', 'ADMIN']}
            redirect="/login"
          >
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTES.modules,
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute
                permittedRoles={['STUDENT', 'CONTENT_CREATOR', 'ADMIN']}
                redirect="/login"
              >
                <PanelPage />
              </ProtectedRoute>
            ),
          },
          {
            element: (
              <ProtectedRoute
                permittedRoles={['CONTENT_CREATOR']}
                redirect="/dashboard"
              />
            ),
            children: [
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
                        element: <FormExerciseGrammarRulePage />,
                      },
                      {
                        path: `${ROUTES.presentation}/${ROUTES.windowId}`,
                        element: <FormPresentationPage />,
                      },
                      {
                        path: `${ROUTES.exercise}/${ROUTES.windowId}`,
                        element: <FormExerciseGrammarRulePage />,
                      },
                    ],
                  },
                  {
                    path: ROUTES.finalChallenge,
                    element: <FormFinalChallengePage />,
                    children: [
                      {
                        path: `${ROUTES.exerciseId}`,
                        element: <FormExerciseFinalChallengePage />,
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
        path: '*',
        element: <NotFound />,
      },
      {
        path: 'register',
        element: (
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        ),
      },
      {
        path: 'login',
        element: (
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        ),
      },
    ],
  },
]);
