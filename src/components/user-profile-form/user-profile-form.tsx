import { TextField } from '@mui/material';
import React from 'react';

import { StyledBoxForm } from './ui';
import { UserProfileProps } from './types';

export const UserProfileForm = ({ profile, onChange }: UserProfileProps) => {
  const disabled = !onChange;

  const { email, firstName, middleName, lastName, birthDate, height, weight, gender } = profile;

  function getValue(value: any) {
    if (disabled) {
      return value || '-';
    }

    return value || '';
  }

  return (
    <StyledBoxForm>
      <TextField
        id="email"
        label="Email"
        size="small"
        disabled={disabled}
        onChange={onChange}
        name="email"
        value={getValue(email)}
      />
      <TextField
        id="firstName"
        label="firstName"
        size="small"
        disabled={disabled}
        onChange={onChange}
        name="firstName"
        value={getValue(firstName)}
      />
      <TextField
        id="middleName"
        label="middleName"
        size="small"
        disabled={disabled}
        onChange={onChange}
        name="middleName"
        value={getValue(middleName)}
      />
      <TextField
        id="lastName"
        label="lastName"
        size="small"
        disabled={disabled}
        onChange={onChange}
        name="lastName"
        value={getValue(lastName)}
      />
      <TextField
        id="birthDate"
        label="birthDate"
        size="small"
        disabled={disabled}
        onChange={onChange}
        name="birthDate"
        value={getValue(birthDate)}
      />
      <TextField
        id="height"
        label="height"
        size="small"
        disabled={disabled}
        onChange={onChange}
        name="height"
        value={getValue(height)}
      />
      <TextField
        id="weight"
        label="weight"
        size="small"
        disabled={disabled}
        onChange={onChange}
        name="weight"
        value={getValue(weight)}
      />
      <TextField
        id="gender"
        label="gender"
        size="small"
        disabled={disabled}
        onChange={onChange}
        name="gender"
        value={getValue(gender)}
      />
    </StyledBoxForm>
  );
};
