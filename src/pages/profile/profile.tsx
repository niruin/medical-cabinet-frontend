import { Box, Button, Container } from '@mui/material';
import React, { useState } from 'react';

import { useUser } from '../../services/user';
import { ProfileDialog } from './profile-dialog';
import { ProfileReview } from './profile-review';

export const Profile = () => {
  const { profile } = useUser();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  if (!profile) return null;

  return (
    <Container
      sx={{
        display: 'flex',
        gap: 2,
        flexDirection: 'column',
        maxWidth: '720px!important',
        margin: 'auto',
      }}
    >
      <ProfileReview profile={profile} />
      <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Button onClick={handleOpenModal} variant="contained">
          Редактировать
        </Button>
      </Box>
      <ProfileDialog isOpenModal={isOpenModal} onClose={handleCloseModal} />
    </Container>
  );
};
