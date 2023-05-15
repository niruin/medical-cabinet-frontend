import { Box, Container } from '@mui/material';
import { useLocation } from 'react-router-dom';

import { AuthFormRegistration, AuthFormLogin } from './auth-form';
import { StyledLink } from './ui';

export const Auth = () => {
  const { pathname } = useLocation();

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mt: 8,
          maxWidth: 380,
          width: '100%',
          flexDirection: 'column',
        }}
      >
        <h2>Medical Cabinet</h2>
        {pathname === '/login' ? (
          <>
            <AuthFormLogin />
            <StyledLink to="/registration">Зарегистрироваться</StyledLink>
          </>
        ) : (
          <>
            <AuthFormRegistration />
            <StyledLink to="/login">Войти</StyledLink>
          </>
        )}
      </Box>
    </Container>
  );
};
