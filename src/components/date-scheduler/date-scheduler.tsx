import { Scheduler } from '@aldabil/react-scheduler';
import { EventActions, ProcessedEvent, ViewEvent } from '@aldabil/react-scheduler/types';
import { WeekProps } from '@aldabil/react-scheduler/views/Week';
import { ru } from 'date-fns/locale';

import { useScheduleService } from '../../services/schedule';

type Props = {
  doctorId: Nullable<string>;
};
export const DateScheduler = ({ doctorId }: Props) => {
  const { getDoctorEvents } = useScheduleService();
  const fetchRemote = async (query: ViewEvent): Promise<ProcessedEvent[]> => {
    return new Promise((res) => {
      getDoctorEvents().then((data) => {
        const result: ProcessedEvent[] = data.map((item) => ({
          event_id: Number(item.event_id),
          //@ts-ignore
          title: String(item.patient.lastName),
          start: new Date(new Date(new Date().setHours(9)).setMinutes(0)),
          end: new Date(),
        }));
        res(result);
      });
    });
  };

  const handleConfirm = async (
    event: ProcessedEvent,
    action: EventActions,
  ): Promise<ProcessedEvent> => {
    console.log('handleConfirm =', action, event.title);

    return new Promise((res, rej) => {
      if (action === 'edit') {
        /** PUT event to remote DB */
      } else if (action === 'create') {
        /**POST event to remote DB */
      }

      const isFail = Math.random() > 0.6;
      // Make it slow just for testing
      setTimeout(() => {
        if (isFail) {
          rej('Ops... Faild');
        } else {
          res({
            ...event,
            event_id: event.event_id || Math.random(),
          });
        }
      }, 300);
    });
  };

  const handleDelete = async (deletedId: string): Promise<string> => {
    // Simulate http request: return the deleted id
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(deletedId);
      }, 300);
    });
  };

  const week: WeekProps = {
    weekDays: [2, 3, 4, 5, 6],
    weekStartOn: 6,
    startHour: 9,
    endHour: 17,
    step: 60,
    navigation: true,
    disableGoToDay: false,
  };

  return (
    <Scheduler
      view="week"
      height={50}
      getRemoteEvents={fetchRemote}
      onConfirm={handleConfirm}
      onDelete={handleDelete}
      week={week}
      day={null}
      month={null}
      hourFormat="24"
      locale={ru}
    />
  );
};
