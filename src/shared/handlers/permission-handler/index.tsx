import { Roles } from '../../utils/roles';

const checkRolePermission = (userRole: string, ...roles: Roles[]) => {
  return roles.some((name) => name === userRole);
};

export const isPermitted = (userRoles?: string, permittedRoles: Roles[] = []) => {
  if (!userRoles) return false;

  return checkRolePermission(userRoles, ...permittedRoles);
};
