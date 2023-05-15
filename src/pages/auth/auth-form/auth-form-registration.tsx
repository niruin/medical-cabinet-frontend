import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useSnackbar, VariantType } from 'notistack';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../../services/auth';
import { StyledBoxForm } from './ui';

export const AuthFormRegistration = () => {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [passwordConfirmValue, setPasswordConfirmValue] = useState('');

  const [firstNameValue, setFirstNameValue] = useState('');
  const [middleNameValue, setMiddleNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');

  const { registration } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleChangeEmail = (value: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(value.target.value);
  };

  const handleChangePassword = (value: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(value.target.value);
  };

  const handleChangePasswordConfirm = (value: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirmValue(value.target.value);
  };

  const handleChangeFirstName = (value: React.ChangeEvent<HTMLInputElement>) => {
    setFirstNameValue(value.target.value);
  };

  const handleChangeMiddleName = (value: React.ChangeEvent<HTMLInputElement>) => {
    setMiddleNameValue(value.target.value);
  };

  const handleChangeLastName = (value: React.ChangeEvent<HTMLInputElement>) => {
    setLastNameValue(value.target.value);
  };

  const onSuccessCallback = (msg: string, status: VariantType) => {
    enqueueSnackbar(msg, { variant: status });
    navigate('/login');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordValue !== passwordConfirmValue) {
      console.log('no match');
    } else {
      const data = {
        email: emailValue,
        password: passwordValue,
        firstName: firstNameValue,
        middleName: middleNameValue,
        lastName: lastNameValue,
      };

      registration(data, onSuccessCallback);
    }
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
        id="confirm-password"
        label="First name"
        defaultValue=""
        size="small"
        onChange={handleChangeFirstName}
      />
      <TextField
        required
        id="confirm-password"
        label="Middle name"
        defaultValue=""
        size="small"
        onChange={handleChangeMiddleName}
      />
      <TextField
        required
        id="confirm-password"
        label="Last name"
        defaultValue=""
        size="small"
        onChange={handleChangeLastName}
      />
      <TextField
        required
        id="password"
        label="Password"
        defaultValue=""
        size="small"
        onChange={handleChangePassword}
      />
      <TextField
        required
        id="confirm-password"
        label="Confirm Password"
        defaultValue=""
        size="small"
        onChange={handleChangePasswordConfirm}
      />
      <Button variant="contained" sx={{ p: 2 }} onClick={handleSubmit}>
        Зарегистрироваться
      </Button>
    </StyledBoxForm>
  );
};
