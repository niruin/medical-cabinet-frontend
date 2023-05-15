import { Roles } from '../../utils/roles';

export type AdditionalConditions = {
  [conditionName: string]: boolean;
};

export type WithPermissionsProps = {
  conditions?: AdditionalConditions;
  permittedRoles?: Roles[];
};
