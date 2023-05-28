import { useState } from 'react';
import { TextField, Button, DialogActions, Box } from '@mui/material';
import type { ProcessedEvent, SchedulerHelpers } from '@aldabil/react-scheduler/types';
import { format } from 'date-fns';
import { enqueueSnackbar } from 'notistack';

import { CreateScheduleDto, Doctor } from '../../../services/api';
import { useScheduleService } from '../../../services/schedule';
import { useUser } from '../../../services/user';
import { Roles } from '../../../shared/utils/roles';

interface CustomEditorProps {
  scheduler: SchedulerHelpers;
  doctor: Doctor;
}
export const CustomEditor = ({ scheduler, doctor }: CustomEditorProps) => {
  const eventMain = scheduler.edited;
  const { start, end } = scheduler.state;
  const { createEvent } = useScheduleService();
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
    title: eventMain?.title || `${profile.firstName} ${profile.lastName}`,
    description: eventMain?.description || '',
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

      const added_updated_event = (await new Promise((res) => {
        if (eventMain) {
          /** edit */
        } else if (!eventMain) {
          const payload: CreateScheduleDto = {
            userId: profile?.id,
            startDate: start.value,
            endDate: end.value,
            doctorId: Number(doctor.id),
          };
          createEvent(payload)
            .then((resp) => {
              console.log(resp);
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
            .catch(() => {
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

  const isExtraFields = profile.role === Roles.DOCTOR || profile.role === Roles.ADMIN;

  return (
    <div>
      <Box sx={{ padding: 3, display: 'flex', gap: 2, flexDirection: 'column' }}>
        <h2>Новая заявка</h2>
        <TextField
          label="Patient"
          value={state.title}
          onChange={(e) => handleChange(e.target.value, 'patient')}
          disabled={true}
          fullWidth
        />
        <TextField
          label="Doctor"
          value={state.doctor}
          onChange={(e) => handleChange(e.target.value, 'doctor')}
          disabled={true}
          fullWidth
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            label="Start"
            value={format(state.start.value, 'yyyy-MM-dd HH:mm')}
            onChange={(e) => handleChange(e.target.value, 'startDate')}
            disabled={true}
            fullWidth
          />
          <TextField
            label="End"
            value={format(state.end.value, 'yyyy-MM-dd HH:mm')}
            onChange={(e) => handleChange(e.target.value, 'endDate')}
            disabled={true}
            fullWidth
          />
        </Box>
        {isExtraFields && (
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
        )}
      </Box>
      <DialogActions>
        <Button onClick={scheduler.close}>Cancel</Button>
        <Button onClick={handleSubmit}>Confirm</Button>
      </DialogActions>
    </div>
  );
};
