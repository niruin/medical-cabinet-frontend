import { ProfilePatch } from '../../services/user/types';

export const initProfileForm = (profile?: Nullable<ProfilePatch>): Nullable<ProfilePatch> => {
  if (!profile) return null;

  return {
    id: profile.id,
    email: profile.email,
    firstName: profile.firstName,
    middleName: profile.middleName,
    lastName: profile.lastName,
    birthDate: profile.birthDate,
    height: profile.height,
    weight: profile.weight,
    gender: profile.gender,
    role: profile.role,
  };
};
