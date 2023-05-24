import React, { useState } from 'react';
import { Box } from '@mui/material';

import { UserTable } from '../../components/user-table';
import { useUser } from '../../services/user';
import { ProfileDialog } from '../../components/profile-dialog';
import { ProfilePatch } from '../../services/user/types';
import { RoleDialog } from './role-dialog';

export const Users = () => {
  const { profile } = useUser();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenRoleModal, setIsOpenRoleModal] = useState(false);
  const [profileSelect, setProfileSelect] = useState<Nullable<ProfilePatch>>(null);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleOpenRoleModal = () => {
    setIsOpenRoleModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setIsOpenRoleModal(false);
  };

  if (!profile) return null;

  const selectUser = (user: ProfilePatch, modal?: 'role' | 'profile') => {
    setProfileSelect(user);
    if (modal === 'role') {
      handleOpenRoleModal();
    } else {
      handleOpenModal();
    }
  };

  return (
    <Box sx={{ marginBottom: '-30px' }}>
      <UserTable setProfileSelect={selectUser} />
      {profileSelect && (
        <>
          <ProfileDialog
            profile={profileSelect}
            isOpenModal={isOpenModal}
            onClose={handleCloseModal}
          />

          <RoleDialog
            selectUserId={profileSelect.id}
            currentRole={profileSelect.role}
            isOpenModal={isOpenRoleModal}
            onClose={handleCloseModal}
          />
        </>
      )}
    </Box>
  );
};
