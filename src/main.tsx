import '@/styles/global.css';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { ReactQueryProvider } from './app/providers/react-query-provider';

import { AuthProvider } from './app/providers/auth-provider';
import { router } from './app/routes/app-routes';
import { Toaster } from './components/ui/toaster';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactQueryProvider>
      <NuqsAdapter>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </NuqsAdapter>
    </ReactQueryProvider>
    <Toaster />
  </StrictMode>,
);
