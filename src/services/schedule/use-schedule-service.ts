import { useState } from 'react';

import { api } from '../api/api-adapter';
import { Schedule } from '../api';

type ScheduleService = {
  events: Schedule[];
  getDoctorEvents: () => Promise<Schedule[]>;
};

export const useScheduleService = (): ScheduleService => {
  const [events, setEvents] = useState<Schedule[]>([]);

  const getDoctorEvents = () => {
    return api.schedule
      .scheduleControllerDoctorList({ withCredentials: true })
      .then((resp) => resp.data.data);
  };

  return {
    events,
    getDoctorEvents,
  };
};
