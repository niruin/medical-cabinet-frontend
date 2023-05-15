import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';

import { Footer } from './components/footer';
import { Header } from './components/header';
import { Navigation } from './components/navigation';
import { StyledContentBox, StyledMainBox } from './styles/ui';

export function App() {
  return (
    <Container sx={{ mt: 2 }}>
      <Header />
      <StyledMainBox>
        <Navigation />
        <StyledContentBox>
          <Outlet />
        </StyledContentBox>
      </StyledMainBox>
      <Footer />
    </Container>
  );
}
