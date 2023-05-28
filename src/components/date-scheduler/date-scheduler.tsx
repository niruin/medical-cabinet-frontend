import { Scheduler } from '@aldabil/react-scheduler';
import { ProcessedEvent, ViewEvent } from '@aldabil/react-scheduler/types';
import { WeekProps } from '@aldabil/react-scheduler/views/Week';
import { ru } from 'date-fns/locale';

import { useScheduleService } from '../../services/schedule';
import { Doctor } from '../../services/api';
import { CustomEditor } from './custom-editor';

type Props = {
  doctor: Doctor;
};

export const DateScheduler = ({ doctor }: Props) => {
  const { getEvents } = useScheduleService();
  if (!doctor?.id) {
    return <div>Доктор не выбран</div>;
  }

  const fetchRemote = async (query: ViewEvent): Promise<ProcessedEvent[]> => {
    return new Promise((res) => {
      getEvents(doctor.id).then((data) => res(data));
    });
  };

  const handleDelete = async (deletedId: string): Promise<string> => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(deletedId);
      }, 300);
    });
  };

  const week: WeekProps = {
    weekDays: [0, 1, 2, 3, 4, 5, 6],
    weekStartOn: 1,
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
      onDelete={handleDelete}
      editable={true}
      week={week}
      day={null}
      month={null}
      hourFormat="24"
      locale={ru}
      customEditor={(scheduler) => <CustomEditor scheduler={scheduler} doctor={doctor} />}
      draggable={false}
    />
  );
};
