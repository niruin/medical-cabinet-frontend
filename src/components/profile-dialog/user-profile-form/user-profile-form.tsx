import { InputLabel, MenuItem, TextField } from '@mui/material';
import React from 'react';
import { Dayjs } from 'dayjs';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

import { UserProfileProps } from './types';
import { StyledBoxForm } from './ui';
import { BirthDatePicker } from './datepicker';

export const UserProfileForm = ({ profile, onChange }: UserProfileProps) => {
  const disabled = !onChange;

  const { email, firstName, middleName, lastName, birthDate, height, weight, gender } = profile;

  const handleChangeDate = (e: Dayjs | null) => {
    const name = 'birthDate';
    if (onChange) onChange(name, e?.toISOString());
  };

  const handleSelect = (e: SelectChangeEvent) => {
    const name = 'gender';
    if (onChange) onChange(name, e.target.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        value={email || ''}
        sx={{ color: 'red!important' }}
      />
      <TextField
        id="firstName"
        label="Имя"
        size="small"
        disabled={disabled}
        onChange={handleChange}
        name="firstName"
        value={firstName || ''}
      />
      <TextField
        id="middleName"
        label="Отчество"
        size="small"
        disabled={disabled}
        onChange={handleChange}
        name="middleName"
        value={middleName || ''}
      />
      <TextField
        id="lastName"
        label="Фамилия"
        size="small"
        disabled={disabled}
        onChange={handleChange}
        name="lastName"
        value={lastName || ''}
      />
      <BirthDatePicker
        birthDate={birthDate}
        disabled={disabled}
        handleChangeDate={handleChangeDate}
      />
      <FormControl fullWidth>
        <InputLabel id="gender" size="small">
          Пол
        </InputLabel>
        <Select
          labelId="gender"
          id="gender"
          name="gender"
          value={gender || ''}
          label="gender"
          size="small"
          onChange={handleSelect}
          disabled={disabled}
        >
          <MenuItem value="Мужской">Мужской</MenuItem>
          <MenuItem value="Женский">Женский</MenuItem>
        </Select>
      </FormControl>
      <TextField
        id="height"
        label="Рост"
        size="small"
        disabled={disabled}
        onChange={handleChange}
        name="height"
        value={height || ''}
        type="number"
      />
      <TextField
        id="weight"
        label="Вес"
        size="small"
        disabled={disabled}
        onChange={handleChange}
        name="weight"
        value={weight || ''}
        type="number"
      />
    </StyledBoxForm>
  );
};
