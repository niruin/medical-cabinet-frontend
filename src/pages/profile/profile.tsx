import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React, { useState } from 'react';
import { enqueueSnackbar, VariantType } from 'notistack';

import { useUser } from '../../services/user';
import { ProfileReview } from './profile-review';
import { ProfileModalType } from './types';
import { ProfileDialog } from '../../components/profile-dialog';

export const Profile = () => {
  const { profile, removeById, getProfile } = useUser();
  const [isOpenModal, setIsOpenModal] = useState<ProfileModalType>(null);

  const handleOpenModal = (nameModal: ProfileModalType) => {
    setIsOpenModal(nameModal);
  };

  const handleCloseModal = () => {
    setIsOpenModal(null);
  };

  if (!profile) return null;

  const handleRemove = () => {
    removeById(profile.id);
    setIsOpenModal(null);
  };

  const onSuccessCallback = (msg: string, status: VariantType) => {
    enqueueSnackbar(msg, { variant: status });
    getProfile();
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
        <Button
          onClick={() => handleOpenModal('edit-profile')}
          variant="contained"
          sx={{ textTransform: 'none' }}
        >
          Редактировать
        </Button>
        <Button
          onClick={() => handleOpenModal('remove-acc')}
          variant="outlined"
          color="error"
          sx={{ textTransform: 'none' }}
        >
          Удалить учетную запись
        </Button>
      </Box>
      <ProfileDialog
        isOpenModal={isOpenModal === 'edit-profile'}
        onClose={handleCloseModal}
        onSuccess={onSuccessCallback}
      />
      <Dialog
        open={isOpenModal === 'remove-acc'}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ fontSize: 22, fontWeight: 'bold' }}>
          Удаление учетной записи
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Вы действительно хотите удалить свою учетную запись? <br />
            <strong>Ваши данные будут безвозвратно утеряны.</strong>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: '10px 24px 24px' }}>
          <Button onClick={handleRemove} variant="contained" color="error">
            Удалить
          </Button>
          <Button onClick={handleCloseModal} variant="outlined">
            Отмена
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
