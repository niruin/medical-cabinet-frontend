import { SelectChangeEvent, TextField } from '@mui/material';
import React from 'react';

import { StyledBoxForm } from './ui';
import { UserProfileProps } from './types';

export const UserProfileForm = ({ profile, modeAdmin = false, onChange }: UserProfileProps) => {
  const disabled = !onChange;

  const { email, firstName, middleName, lastName, birthDate, height, weight, gender, role } =
    profile;

  console.log(profile);

  function getValue(value: any) {
    if (disabled) {
      return value || '-';
    }

    return value || '';
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    if (onChange) onChange(name, value);
  };

  const handleSelect = (e: SelectChangeEvent) => {
    const name = e.target.name;
    const value = e.target.value;
    if (onChange) onChange(name, value);
  };

  return (
    <StyledBoxForm>
      <TextField
        id="email"
        label="Email"
        size="small"
        disabled={disabled}
        onChange={handleChange}
        name="email"
        value={getValue(email)}
      />
      <TextField
        id="firstName"
        label="firstName"
        size="small"
        disabled={disabled}
        onChange={handleChange}
        name="firstName"
        value={getValue(firstName)}
      />
      <TextField
        id="middleName"
        label="middleName"
        size="small"
        disabled={disabled}
        onChange={handleChange}
        name="middleName"
        value={getValue(middleName)}
      />
      <TextField
        id="lastName"
        label="lastName"
        size="small"
        disabled={disabled}
        onChange={handleChange}
        name="lastName"
        value={getValue(lastName)}
      />
      <TextField
        id="birthDate"
        label="birthDate"
        size="small"
        disabled={disabled}
        onChange={handleChange}
        name="birthDate"
        value={getValue(birthDate)}
      />
      <TextField
        id="height"
        label="height"
        size="small"
        disabled={disabled}
        onChange={handleChange}
        name="height"
        value={getValue(height)}
      />
      <TextField
        id="weight"
        label="weight"
        size="small"
        disabled={disabled}
        onChange={handleChange}
        name="weight"
        value={getValue(weight)}
      />
      <TextField
        id="gender"
        label="gender"
        size="small"
        disabled={disabled}
        onChange={handleChange}
        name="gender"
        value={getValue(gender)}
      />
      {/*{modeAdmin && (*/}
      {/*  <FormControl fullWidth>*/}
      {/*    <InputLabel id="demo-simple-select-label">Age</InputLabel>*/}
      {/*    <Select*/}
      {/*      labelId="role"*/}
      {/*      id="role"*/}
      {/*      name="role"*/}
      {/*      value={getValue(role)}*/}
      {/*      label="Role"*/}
      {/*      size="small"*/}
      {/*      onChange={handleSelect}*/}
      {/*    >*/}
      {/*      <MenuItem value={Roles.USER}>{Roles.USER}</MenuItem>*/}
      {/*      <MenuItem value={Roles.PATIENT}>{Roles.PATIENT}</MenuItem>*/}
      {/*      <MenuItem value={Roles.DOCTOR}>{Roles.DOCTOR}</MenuItem>*/}
      {/*      <MenuItem value={Roles.ADMIN}>{Roles.ADMIN}</MenuItem>*/}
      {/*    </Select>*/}
      {/*  </FormControl>*/}
      {/*)}*/}
    </StyledBoxForm>
  );
};
