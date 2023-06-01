import React, { useState } from 'react';
import { TextField, Button, DialogActions, Box } from '@mui/material';
import type { ProcessedEvent, SchedulerHelpers } from '@aldabil/react-scheduler/types';
import { enqueueSnackbar } from 'notistack';
import dayjs from 'dayjs';

import { ChangeScheduleDto, CreateScheduleDto, Doctor } from '../../../services/api';
import { useScheduleService } from '../../../services/schedule';
import { useUser } from '../../../services/user';
import { Roles } from '../../../shared/utils/roles';
import { StyledWrapper } from './ui';

interface CustomEditorProps {
  scheduler: SchedulerHelpers;
  doctor: Doctor;
}
export const CustomEditor = ({ scheduler, doctor }: CustomEditorProps) => {
  const eventMain = scheduler.edited;
  const { start, end } = scheduler.state;
  const { createEvent, updateEvent } = useScheduleService();
  const { profile } = useUser();

  if (!profile?.id) {
    return null;
  }

  if (!eventMain) {
    if (profile.role === Roles.DOCTOR || profile.role === Roles.ADMIN) {
      return (
        <Box sx={{ padding: 3, display: 'flex', gap: 2, flexDirection: 'column' }}>
          <p>Создать заявку на прием может только пациент</p>
          <DialogActions>
            <Button onClick={scheduler.close}>Cancel</Button>
          </DialogActions>
        </Box>
      );
    }
  }

  const [state, setState] = useState({
    event_id: eventMain?.event_id || null,
    title: eventMain?.title || `${profile.firstName} ${profile.lastName}`,
    doctor: eventMain?.doctor.lastName || `${doctor.firstName} ${doctor.lastName}`,
    comments: eventMain?.comments || '',
    diagnosis: eventMain?.diagnosis || '',
    start: start,
    end: end,
  });

  const handleChange = (value: string, name: string) => {
    setState((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = async () => {
    try {
      scheduler.loading(true);

      const added_updated_event = (await new Promise((res, rej) => {
        if (eventMain) {
          const payload: ChangeScheduleDto = {
            id: Number(state.event_id),
            userId: profile?.id,
            startDate: start.value,
            endDate: end.value,
            doctorId: Number(doctor.id),
            diagnosis: state.diagnosis,
            comments: state.comments,
          };
          updateEvent(payload)
            .then((resp) => {
              const {
                comments,
                diagnosis,
                doctor: doctorObj,
                endDate,
                patient,
                event_id,
                startDate,
                title,
              } = resp.data;
              res({
                event_id,
                title,
                start: new Date(startDate),
                end: new Date(endDate),
                patient: patient,
                doctor: doctorObj,
                comments,
                diagnosis,
              });
            })
            .catch((error) => {
              rej(error);
              enqueueSnackbar('Не удалось создать заявку', { variant: 'error' });
            });
        } else if (!eventMain) {
          const payload: CreateScheduleDto = {
            userId: profile?.id,
            startDate: start.value,
            endDate: end.value,
            doctorId: Number(doctor.id),
          };
          createEvent(payload)
            .then((resp) => {
              const {
                comments,
                diagnosis,
                doctor: doctorObj,
                endDate,
                patient,
                event_id,
                startDate,
                title,
              } = resp.data;
              res({
                event_id,
                title,
                start: new Date(startDate),
                end: new Date(endDate),
                patient: patient,
                doctor: doctorObj,
                comments,
                diagnosis,
              });
            })
            .catch((error) => {
              rej(error);
              enqueueSnackbar('Не удалось создать заявку', { variant: 'error' });
            });
        }
      })) as ProcessedEvent;

      scheduler.onConfirm(added_updated_event, eventMain ? 'edit' : 'create');
      scheduler.close();
    } finally {
      scheduler.loading(false);
    }
  };

  const isNotPatient = profile.role === Roles.DOCTOR || profile.role === Roles.ADMIN;

  return (
    <div>
      <StyledWrapper>
        <Box className="title">{state.event_id ? 'Карточка приема' : 'Новая карточка'}</Box>
        <Box className="box-item">
          <Box>Пациент</Box>
          <Box className="box-item__value">{state.title}</Box>
        </Box>

        <Box className="box-item">
          <Box>Доктор</Box>
          <Box className="box-item__value">{state.doctor}</Box>
        </Box>
        <Box className="box-item">
          <Box>Прием</Box>
          <Box>
            <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <span className="text-sm">От:</span>
              <span className="text-me">{dayjs(state.start.value).format('M/D/YYYY')}</span>
              <span className="text-bold">{dayjs(state.start.value).format('HH:MM')}</span>
            </Box>
            <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <span className="text-sm">От:</span>
              <span className="text-me">{dayjs(state.end.value).format('M/D/YYYY')}</span>
              <span className="text-bold">{dayjs(state.end.value).format('HH:MM')}</span>
            </Box>
          </Box>
        </Box>
        {isNotPatient ? (
          <>
            <TextField
              label="Diagnosis"
              value={state.diagnosis}
              onChange={(e) => handleChange(e.target.value, 'diagnosis')}
              fullWidth
            />
            <TextField
              label="Comments"
              value={state.comments}
              onChange={(e) => handleChange(e.target.value, 'comments')}
              fullWidth
            />
          </>
        ) : (
          <>
            {state.diagnosis && (
              <Box className="box-item">
                <Box>Диагноз</Box>
                <Box className="box-item__value">{state.diagnosis}</Box>
              </Box>
            )}

            {state.comments && (
              <Box className="box-item">
                <Box>Комментарий</Box>
                <Box className="box-item__value">{state.comments}</Box>
              </Box>
            )}
          </>
        )}
      </StyledWrapper>
      <DialogActions sx={{ p: '12px 22px' }}>
        <Button onClick={scheduler.close} variant="outlined">
          {state.event_id ? 'Закрыть' : 'Отмена'}
        </Button>
        {!state.event_id && (
          <Button onClick={handleSubmit} variant="contained" color="success">
            {isNotPatient ? 'Сохранить' : 'Создать'}
          </Button>
        )}
        {state.event_id && isNotPatient && (
          <Button onClick={handleSubmit} variant="contained" color="success">
            Сохранить
          </Button>
        )}
      </DialogActions>
    </div>
  );
};
