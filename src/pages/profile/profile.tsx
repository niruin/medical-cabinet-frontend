import { Box, Button, Container } from '@mui/material';
import React, { useState } from 'react';

import { UserProfileForm } from '../../components/user-profile-form';
import { useUser } from '../../services/user';
import { ProfileDialog } from './profile-dialog';

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
    <Container>
      <UserProfileForm profile={profile} />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, padding: '0 8px' }}>
        <Button onClick={handleOpenModal} variant="contained">
          Редактировать
        </Button>
      </Box>
      <ProfileDialog isOpenModal={isOpenModal} onClose={handleCloseModal} />
    </Container>
  );
};
