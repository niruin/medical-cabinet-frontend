import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { enqueueSnackbar, VariantType } from 'notistack';

import { Roles } from '../../../shared/utils/roles';
import { useUser } from '../../../services/user';
import { ChangeRoleUserDto } from '../../../services/api';

type Props = {
  selectUserId: number;
  currentRole: string;
  email: string;
  isOpenModal: boolean;
  onClose: () => void;
};

export const RoleDialog = ({ selectUserId, currentRole, email, isOpenModal, onClose }: Props) => {
  const [formRole, setFormRole] = useState(currentRole);
  const { allUsers, changeRole } = useUser();

  useEffect(() => {
    setFormRole(currentRole);
  }, [selectUserId]);

  const onSuccessCallback = (msg: string, status: VariantType) => {
    enqueueSnackbar(msg, { variant: status });
    allUsers();
  };

  const handleSelect = (e: SelectChangeEvent) => {
    const value = e.target.value;
    setFormRole(value);
  };

  const handleSubmit = () => {
    const payload: ChangeRoleUserDto = {
      id: selectUserId,
      role: formRole,
    };
    changeRole(payload, onSuccessCallback);
    onClose();
  };

  return (
    <Dialog open={isOpenModal} onClose={onClose}>
      <DialogTitle>Сменить роль</DialogTitle>
      <Box sx={{ padding: '0px 24px' }}>
        <b>{email}</b>
      </Box>
      <DialogContent>
        <FormControl fullWidth sx={{ mt: 1 }}>
          <InputLabel id="demo-simple-select-label">Роль</InputLabel>
          <Select
            labelId="role"
            id="role"
            name="role"
            value={formRole}
            label="Role"
            size="small"
            onChange={handleSelect}
          >
            <MenuItem value={Roles.USER}>{Roles.USER}</MenuItem>
            <MenuItem value={Roles.PATIENT}>{Roles.PATIENT}</MenuItem>
            <MenuItem value={Roles.DOCTOR}>{Roles.DOCTOR}</MenuItem>
            <MenuItem value={Roles.ADMIN}>{Roles.ADMIN}</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          gap: 1,
          padding: '12px 22px 24px',
        }}
      >
        <Button onClick={handleSubmit} variant="contained" color="success">
          Сохранить
        </Button>
        <Button onClick={onClose} variant="outlined">
          Отмена
        </Button>
      </DialogActions>
    </Dialog>
  );
};
