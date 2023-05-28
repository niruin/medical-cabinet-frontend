import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { Doctor } from '../../../services/api';

type Props = {
  list: Doctor[];
  person: Nullable<Doctor>;
  onChangePerson: (event: SelectChangeEvent) => void;
};
export const MultipleSelect = ({ list, person, onChangePerson }: Props) => {
  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Name</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={person?.id || ''}
          onChange={onChangePerson}
          input={<OutlinedInput label="Name" />}
        >
          {list.map(({ id, firstName, middleName, lastName }) => (
            <MenuItem key={id} value={id}>
              {`${lastName || ''} ${firstName || ''} ${middleName || ''}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
