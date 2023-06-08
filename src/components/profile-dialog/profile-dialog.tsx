import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { VariantType } from 'notistack';

import { ProfilePatch } from '../../services/user/types';
import { useUser } from '../../services/user';
import { UserProfileForm } from './user-profile-form';
import { initProfileForm } from './consts';

type Props = {
  isOpenModal: boolean;
  onClose: () => void;
  onSuccess: (msg: string, status: VariantType) => void;
  selectedProfile?: ProfilePatch;
};

export const ProfileDialog = ({ isOpenModal, onClose, onSuccess, selectedProfile }: Props) => {
  const { updateProfile, removeById, profile } = useUser();
  const [profileForm, setProfileForm] = useState<Nullable<ProfilePatch>>(
    initProfileForm(selectedProfile || profile),
  );

  useEffect(() => {
    setProfileForm(selectedProfile || profile);
  }, [selectedProfile, profile]);

  if (!profileForm) return null;

  const handleChangeProfile = (name?: string, value?: string) => {
    if (!profileForm || !name) return null;

    setProfileForm({
      ...profileForm,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if (!profileForm) return null;

    updateProfile(profileForm, onSuccess);
    handleCloseModal();
  };

  const handleRemove = () => {
    removeById(profileForm.id);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    // setProfileForm(selectedProfile || profile);
    onClose();
  };

  return (
    <Dialog open={isOpenModal} onClose={handleCloseModal}>
      <DialogTitle>Редактирование</DialogTitle>
      <DialogContent>
        <UserProfileForm profile={profileForm} onChange={handleChangeProfile} />
      </DialogContent>
      <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          gap: 1,
          padding: '12px 30px 28px',
        }}
      >
        <Button onClick={handleSubmit} variant="contained" color="success">
          Сохранить
        </Button>
        <Button onClick={handleCloseModal} variant="outlined">
          Отмена
        </Button>
        {selectedProfile && (
          <Button onClick={handleRemove} variant="outlined" color="error">
            Удалить
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
