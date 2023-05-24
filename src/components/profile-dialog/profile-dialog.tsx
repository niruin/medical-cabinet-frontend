import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { enqueueSnackbar, VariantType } from 'notistack';

import { ProfilePatch } from '../../services/user/types';
import { useUser } from '../../services/user';
import { UserProfileForm } from '../user-profile-form';
import { Roles } from '../../shared/utils/roles';

type Props = {
  profile: ProfilePatch;
  isOpenModal: boolean;
  onClose: () => void;
};

export const ProfileDialog = ({ profile, isOpenModal, onClose }: Props) => {
  const { updateProfile, allUsers, profile: currentUser } = useUser();
  const [profileForm, setProfileForm] = useState<ProfilePatch>(profile);

  useEffect(() => {
    setProfileForm(profile);
  }, [profile]);

  const onSuccessCallback = (msg: string, status: VariantType) => {
    enqueueSnackbar(msg, { variant: status });
    allUsers();
  };

  const handleChangeProfile = (name?: string, value?: string) => {
    if (!profileForm || !name || !value) return null;

    setProfileForm({
      ...profileForm,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if (!profileForm) return null;

    console.log('submit', profileForm);

    updateProfile(profileForm, onSuccessCallback, profile.id);
    onClose();
  };

  if (!profileForm) return null;

  return (
    <Dialog open={isOpenModal} onClose={onClose}>
      <DialogTitle>Редактирование</DialogTitle>
      <DialogContent>
        <UserProfileForm
          profile={profileForm}
          modeAdmin={currentUser?.role === Roles.ADMIN}
          onChange={handleChangeProfile}
        />
      </DialogContent>
      <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 1,
          minWidth: 300,
          boxSizing: 'border-box',
        }}
      >
        <Button onClick={handleSubmit} variant="contained" color="success">
          Сохранить
        </Button>
        <Button onClick={onClose} variant="contained">
          Отмена
        </Button>
      </DialogActions>
    </Dialog>
  );
};
