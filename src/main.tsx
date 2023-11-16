import React from 'react';
import './styles/index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import App from './app/home/routes/App.tsx';
import theme from './core/themes/theme.ts';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './app/auth/context/UserContext.tsx';
import { initState } from './app/auth/utils/helper.ts';

const root = document.getElementById('root') as HTMLElement;

createRoot(root).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <UserProvider {...initState}>
          <App />
        </UserProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
