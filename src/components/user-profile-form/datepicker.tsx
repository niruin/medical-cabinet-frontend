import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';

type Props = {
  birthDate: string;
  disabled: boolean;
  handleChangeDate: (e: Dayjs | null) => void;
};

export const BirthDatePicker = ({ birthDate, disabled, handleChangeDate }: Props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Дата рождения"
        format="YYYY/MM/DD"
        defaultValue={dayjs(birthDate) || ''}
        disabled={disabled}
        onChange={handleChangeDate}
        slotProps={{ textField: { size: 'small', error: false } }}
      />
    </LocalizationProvider>
  );
};
