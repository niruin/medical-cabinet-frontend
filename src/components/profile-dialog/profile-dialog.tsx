import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { enqueueSnackbar, VariantType } from 'notistack';

import { ProfilePatch } from '../../services/user/types';
import { useUser } from '../../services/user';
import { UserProfileForm } from '../user-profile-form';

type Props = {
  profile: ProfilePatch;
  isOpenModal: boolean;
  onClose: () => void;
};

export const ProfileDialog = ({ profile, isOpenModal, onClose }: Props) => {
  const { updateProfile, allUsers, removeById } = useUser();
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

    updateProfile(profileForm, onSuccessCallback, profile.id);
    onClose();
  };

  const handleRemove = () => {
    onClose();
    removeById(profileForm.id);
  };

  if (!profileForm) return null;

  return (
    <Dialog open={isOpenModal} onClose={onClose}>
      <DialogTitle>Редактирование</DialogTitle>
      <DialogContent>
        <UserProfileForm profile={profileForm} onChange={handleChangeProfile} />
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
        <Button onClick={handleRemove} variant="contained" color="error">
          Удалить
        </Button>
      </DialogActions>
    </Dialog>
  );
};
