import { Scheduler } from '@aldabil/react-scheduler';
import { ProcessedEvent, ViewEvent } from '@aldabil/react-scheduler/types';
import { WeekProps } from '@aldabil/react-scheduler/views/Week';
import { ru } from 'date-fns/locale';
import { enqueueSnackbar } from 'notistack';

import { useScheduleService } from '../../services/schedule';
import { Doctor } from '../../services/api';
import { CustomEditor } from './custom-editor';

type Props = {
  doctor?: Doctor;
  reRender: (value: boolean) => void;
};

export const DateScheduler = ({ doctor, reRender }: Props) => {
  const { getEvents, deleteEvent } = useScheduleService();

  const fetchRemote = async (query: ViewEvent): Promise<ProcessedEvent[]> => {
    if (!doctor?.id) return [];

    return new Promise((res) => {
      getEvents(doctor.id).then((data) => {
        return res(data);
      });
    });
  };

  const handleDelete = async (deletedId: string): Promise<string> => {
    return new Promise((res, rej) => {
      deleteEvent(deletedId)
        .then((data) => {
          res(deletedId);
        })
        .catch((error) => {
          rej(error);
          enqueueSnackbar('Не удалось создать заявку', { variant: 'error' });
        });
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
      customEditor={(scheduler) => {
        if (!doctor?.id) return <div />;

        return <CustomEditor scheduler={scheduler} doctor={doctor} reRender={reRender} />;
      }}
      draggable={false}
    />
  );
};
