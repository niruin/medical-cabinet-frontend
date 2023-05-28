import { ProcessedEvent } from '@aldabil/react-scheduler/types';

import { api } from '../api/api-adapter';
import { CreateScheduleDto } from '../api';

type ScheduleService = {
  getEvents: (id: string) => Promise<ProcessedEvent[]>;
  createEvent: (payload: CreateScheduleDto) => Promise<any>;
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
        start: new Date(item.startDate),
        end: new Date(item.endDate),
        patient: item.patient,
        doctor: item.doctor,
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

  return {
    getEvents,
    createEvent,
  };
};
