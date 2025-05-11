import '@/styles/global.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ReactQueryProvider } from './app/providers/react-query-provider';
import { ThemeProvider } from './app/providers/theme-provider';
import { AppRoutes } from './app/routes/app-routes';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="fluveny-ui-theme">
      <ReactQueryProvider>
        <AppRoutes />
      </ReactQueryProvider>
    </ThemeProvider>
  </StrictMode>,
);
