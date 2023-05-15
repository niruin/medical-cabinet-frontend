import React from 'react';

import { Roles } from '../../shared/utils/roles';

export type TabItem = {
  title: string;
  link: string;
  icon: React.ElementType;
  permittedRoles: Roles[];
};
