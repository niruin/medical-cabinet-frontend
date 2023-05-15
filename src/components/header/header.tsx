import { useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { enqueueSnackbar, VariantType } from 'notistack';

import { useAuth } from '../../services/auth';
import { StyledBox } from './ui';
import { useUser } from '../../services/user';

export const Header = () => {
  const { logout } = useAuth();
  const { getProfile } = useUser();

  useEffect(() => {
    getProfile();
  }, []);

  const onSuccessCallback = (msg: string, status: VariantType) => {
    enqueueSnackbar(msg, { variant: status });
  };

  const handleLogout = () => {
    logout(onSuccessCallback);
  };

  return (
    <StyledBox>
      <h3>Medical Cabinet</h3>
      <Box sx={{ display: 'flex', gap: '12px', height: '42px' }}>
        <Button onClick={handleLogout} variant="outlined">
          Выйти
        </Button>
      </Box>
    </StyledBox>
  );
};
