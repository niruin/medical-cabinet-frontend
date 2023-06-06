import { Box, Button, Container } from '@mui/material';
import React, { useState } from 'react';

import { useUser } from '../../services/user';
import { ProfileDialog } from './profile-dialog';
import { ProfileReview } from './profile-review';

export const Profile = () => {
  const { profile, removeById } = useUser();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  if (!profile) return null;

  const handleRemove = () => {
    removeById(profile.id);
  };

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
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 2 }}>
        <Button onClick={handleOpenModal} variant="contained">
          Редактировать
        </Button>
        <Button onClick={handleRemove} variant="contained" color="error">
          Удалить
        </Button>
      </Box>
      <ProfileDialog isOpenModal={isOpenModal} onClose={handleCloseModal} />
    </Container>
  );
};
