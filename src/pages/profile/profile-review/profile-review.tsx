import { Box } from '@mui/material';
import React from 'react';
import dayjs from 'dayjs';

import { ProfileResponseData } from '../../../services/api';
import { StyledWrapper } from './ui';

type Props = {
  profile: Nullable<ProfileResponseData>;
};
export const ProfileReview = ({ profile }: Props) => {
  if (!profile) {
    return <div>профиль не загружен</div>;
  }

  const { email, firstName, middleName, lastName, birthDate, gender, weight, height } = profile;

  const cls = (value: string | number) => {
    const className = 'box-item__value';

    return value ? className : `${className}--light`;
  };

  return (
    <StyledWrapper>
      <Box className="title">Персональные данные</Box>
      <Box className="box-item">
        <Box>ФИО</Box>
        <Box className="box-item__value">
          {firstName} {middleName} {lastName}
        </Box>
      </Box>
      <Box className="box-item">
        <Box>Email</Box>
        <Box className="box-item__value">{email}</Box>
      </Box>
      <Box className="box-item">
        <Box>Дата рождения</Box>
        <Box className={cls(birthDate)}>
          {birthDate ? dayjs(birthDate).format('DD/MM/YYYY') : 'Не указано'}
        </Box>
      </Box>
      <Box className="box-item">
        <Box>Пол</Box>
        <Box className={cls(gender)}>{gender || 'Не указано'}</Box>
      </Box>
      <Box className="box-item">
        <Box>Рост</Box>
        <Box className={cls(height)}>{height || 'Не указано'}</Box>
      </Box>
      <Box className="box-item">
        <Box>Вес</Box>
        <Box className={cls(weight)}>{weight || 'Не указано'}</Box>
      </Box>
    </StyledWrapper>
  );
};
