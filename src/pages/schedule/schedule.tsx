import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import * as React from 'react';
import { SelectChangeEvent } from '@mui/material/Select';

import { DateScheduler } from '../../components/date-scheduler';
import { MultipleSelect } from './select';
import { useUserApi } from '../../services/user';
import { Doctor } from '../../services/api';

export const Schedule = () => {
  const [doctorList, setDoctorList] = useState<Doctor[]>([]);
  const [person, setPerson] = React.useState<Nullable<Doctor>>(null);
  const { getDoctorList } = useUserApi();

  useEffect(() => {
    getDoctorList().then((data) => {
      const list = data?.data || [];
      setDoctorList(list);
    });
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;
    const doctor = doctorList.find((item) => item.id === value) || null;
    setPerson(doctor);
  };

  return (
    <Container>
      <MultipleSelect list={doctorList} person={person} onChangePerson={handleChange} />
      <DateScheduler doctorId={person?.id || null} />
    </Container>
  );
};
