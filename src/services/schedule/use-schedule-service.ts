import { ProcessedEvent } from '@aldabil/react-scheduler/types';

import { api } from '../api/api-adapter';
import { ChangeScheduleDto, CreateScheduleDto } from '../api';

type ScheduleService = {
  getEvents: (id: string) => Promise<ProcessedEvent[]>;
  createEvent: (payload: CreateScheduleDto) => Promise<any>;
  updateEvent: (payload: ChangeScheduleDto) => Promise<any>;
  deleteEvent: (id: string) => Promise<any>;
};

export const useScheduleService = (): ScheduleService => {
  const getEvents = async (id: string) => {
    const data = await api.schedule.scheduleControllerList(
      { doctorId: id },
      { withCredentials: true },
    );

    return data.data.data.map((item) => {
      const event: ProcessedEvent = {
        title: item.title,
        event_id: item.event_id,
        comments: item.comments,
        diagnosis: item.diagnosis,
        start: new Date(item.startDate),
        end: new Date(item.endDate),
        patient: item.patient,
        doctor: item.doctor,
        editable: item.editable,
        disabled: item.disabled,
      };

      return event;
    });
  };

  const createEvent = async (payload: CreateScheduleDto) => {
    const { data } = await api.schedule.scheduleControllerCreate(
      { createScheduleDto: payload },
      { withCredentials: true },
    );

    return data;
  };

  const updateEvent = async (payload: ChangeScheduleDto) => {
    const { data } = await api.schedule.scheduleControllerUpdate(
      { changeScheduleDto: payload },
      { withCredentials: true },
    );

    return data;
  };

  const deleteEvent = async (id: string) => {
    const { data } = await api.schedule.scheduleControllerRemove(
      { scheduleRemoveOneRequest: { id } },
      { withCredentials: true },
    );

    return data;
  };

  return {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
  };
};
