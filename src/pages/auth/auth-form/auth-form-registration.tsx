import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useSnackbar, VariantType } from 'notistack';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../../services/auth';
import { StyledBoxForm } from './ui';
import { FORMAT_DATA_INIT } from './constants';
import { FormDataType } from './types';

export const AuthFormRegistration = () => {
  const [formData, setFormData] = useState<FormDataType>(FORMAT_DATA_INIT);
  const [isErrorPass, setIsErrorPass] = useState(false);

  const { registration } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleResetError = () => {
    isErrorPass && setIsErrorPass(false);
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSuccessCallback = (msg: string, status: VariantType) => {
    enqueueSnackbar(msg, { variant: status });
    navigate('/login');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { confirmPassword, ...data } = formData;

    if (confirmPassword !== data.password) {
      setIsErrorPass(true);
      enqueueSnackbar('Данные не валидны', { variant: 'error' });
    } else {
      registration(data, onSuccessCallback);
    }
  };

  return (
    <StyledBoxForm component="form" onSubmit={handleSubmit}>
      <TextField
        required
        id="email"
        label="Email"
        name="email"
        defaultValue=""
        size="small"
        onChange={handleChangeInput}
      />
      <TextField
        required
        id="first-name"
        name="firstName"
        label="First name"
        defaultValue=""
        size="small"
        onChange={handleChangeInput}
      />
      <TextField
        required
        id="middle-name"
        name="middleName"
        label="Middle name"
        defaultValue=""
        size="small"
        onChange={handleChangeInput}
      />
      <TextField
        required
        id="last-name"
        name="lastName"
        label="Last name"
        defaultValue=""
        size="small"
        onChange={handleChangeInput}
      />
      <TextField
        required
        id="password"
        label="Password"
        name="password"
        defaultValue=""
        size="small"
        type="password"
        autoComplete="off"
        error={isErrorPass}
        onChange={handleChangeInput}
        onClick={handleResetError}
      />
      <TextField
        required
        id="confirm-password"
        name="confirmPassword"
        label="Confirm Password"
        defaultValue=""
        size="small"
        type="password"
        autoComplete="off"
        error={isErrorPass}
        onChange={handleChangeInput}
        onClick={handleResetError}
      />
      <Button variant="contained" sx={{ p: 2 }} type="submit">
        Зарегистрироваться
      </Button>
    </StyledBoxForm>
  );
};
