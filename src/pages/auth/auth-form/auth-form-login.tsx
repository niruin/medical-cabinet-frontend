import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { enqueueSnackbar, VariantType } from 'notistack';

import { useAuth } from '../../../services/auth';
import { StyledBoxForm } from './ui';

export const AuthFormLogin = () => {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const { authorization } = useAuth();

  const handleChangeEmail = (value: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(value.target.value);
  };

  const handleChangePassword = (value: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(value.target.value);
  };

  const onSuccessCallback = (msg: string, status: VariantType) => {
    enqueueSnackbar(msg, { variant: status });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      email: emailValue,
      password: passwordValue,
    };
    authorization(data, onSuccessCallback);
  };

  return (
    <StyledBoxForm component="form">
      <TextField
        required
        id="email"
        label="Email"
        defaultValue=""
        size="small"
        onChange={handleChangeEmail}
      />
      <TextField
        required
        id="password"
        label="Password"
        defaultValue=""
        size="small"
        onChange={handleChangePassword}
      />
      <Button variant="contained" sx={{ p: 2 }} onClick={handleSubmit}>
        Войти
      </Button>
    </StyledBoxForm>
  );
};
