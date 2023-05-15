import { Box } from '@mui/material';
import React, { useState } from 'react';

import { UserTable } from '../../components/user-table';
import { useUser } from '../../services/user';

export const Users = () => {
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
    <Box sx={{ marginBottom: '-30px' }}>
      <UserTable openModal={handleOpenModal} />
    </Box>
  );
};
