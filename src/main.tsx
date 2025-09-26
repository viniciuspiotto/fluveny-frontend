import '@/styles/global.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { ReactQueryProvider } from './app/providers/react-query-provider';
import { router } from './app/routes/app-routes';
import { Toaster } from './components/ui/toaster';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactQueryProvider>
      <RouterProvider router={router} />
    </ReactQueryProvider>
    <Toaster />
  </StrictMode>,
);
