import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { enqueueSnackbar, VariantType } from 'notistack';

import { useUser } from '../../../services/user';
import { ProfilePatch } from '../../../services/user/types';
import { UserProfileForm } from '../../../components/user-profile-form';

const initProfileForm = (profile: Nullable<ProfilePatch>): Nullable<ProfilePatch> => {
  if (!profile) return null;

  return {
    email: profile.email,
    firstName: profile.firstName,
    middleName: profile.middleName,
    lastName: profile.lastName,
    birthDate: profile.birthDate,
    height: profile.height,
    weight: profile.weight,
    gender: profile.gender,
    role: profile.role,
  };
};

type Props = {
  isOpenModal: boolean;
  onClose: () => void;
};

export const ProfileDialog = ({ isOpenModal, onClose }: Props) => {
  const { profile, updateProfile, getProfile } = useUser();
  const [profileForm, setProfileForm] = useState<Nullable<ProfilePatch>>(() =>
    initProfileForm(profile),
  );

  useEffect(() => {
    setProfileForm(initProfileForm(profile));
  }, [profile]);

  const onSuccessCallback = (msg: string, status: VariantType) => {
    enqueueSnackbar(msg, { variant: status });
    getProfile();
  };

  const handleChangeProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!profileForm) return null;

    const name = e.target.name;
    const value = e.target.value;
    setProfileForm({
      ...profileForm,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if (!profileForm) return null;

    updateProfile(profileForm, onSuccessCallback);
    onClose();
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
      </DialogActions>
    </Dialog>
  );
};
