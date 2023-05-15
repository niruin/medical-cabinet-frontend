import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import { AuthProvider } from './services/auth';
import { Routing } from './routing';
import { UserProvider } from './services/user';
import './styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  // <React.StrictMode>
  <AuthProvider>
    <UserProvider>
      <SnackbarProvider>
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
      </SnackbarProvider>
    </UserProvider>
  </AuthProvider>,
  // </React.StrictMode>,
);
