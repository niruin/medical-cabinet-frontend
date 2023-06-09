import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DateRangeIcon from '@mui/icons-material/DateRange';
import PeopleIcon from '@mui/icons-material/People';

import { TabItem } from './types';
import { Roles } from '../../shared/utils/roles';

export const tabItems: TabItem[] = [
  {
    title: 'Профиль',
    link: '/profile',
    icon: AccountCircleIcon,
    permittedRoles: Object.values(Roles),
  },
  {
    title: 'Расписание врача',
    link: '/schedule',
    icon: DateRangeIcon,
    permittedRoles: [Roles.DOCTOR, Roles.USER, Roles.PATIENT, Roles.ADMIN],
  },
  {
    title: 'Пользователи',
    link: '/users',
    icon: PeopleIcon,
    permittedRoles: [Roles.ADMIN],
  },
];
