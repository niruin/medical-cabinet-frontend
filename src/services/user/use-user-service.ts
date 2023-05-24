import { useState } from 'react';
import { VariantType } from 'notistack';

import { api } from '../api/api-adapter';
import { ChangeRoleUserDto, ProfileResponseData } from '../api';
import { ProfilePatch } from './types';

export type UserService = {
  getProfile: () => void;
  updateProfile: (
    data: ProfilePatch,
    onSuccess: (msg: string, status: VariantType) => void,
    userIdToEdit?: number,
  ) => void;
  changeRole: (
    data: ChangeRoleUserDto,
    onSuccess: (msg: string, status: VariantType) => void,
  ) => void;
  allUsers: () => void;
  profile: Nullable<ProfileResponseData>;
  isLoading: boolean;
  users: ProfileResponseData[];
};

export const useUserService = (): UserService => {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<null | ProfileResponseData>(null);
  const [users, setUsers] = useState<ProfileResponseData[]>([]);

  const getProfile = async () => {
    setIsLoading(true);

    const { data } = await api.user.usersControllerGetProfile({ withCredentials: true });
    setProfile(data.data);
    setIsLoading(false);
  };

  const updateProfile = async (
    payload: ProfilePatch,
    onSuccess: (msg: string, status: VariantType) => void,
    userIdToEdit?: number,
  ) => {
    setIsLoading(true);

    const { data } = await api.user.usersControllerUpdate(
      { userChangeRequest: payload, userIdToEdit: String(userIdToEdit) },
      { withCredentials: true },
    );
    setIsLoading(false);
    onSuccess('Профиль обновлен', 'success');
  };

  const allUsers = async () => {
    setIsLoading(true);
    const { data } = await api.user.usersControllerGetUsersAll({ withCredentials: true });
    setUsers(data.data);
    setIsLoading(false);
  };

  const changeRole = async (
    payload: ChangeRoleUserDto,
    onSuccess: (msg: string, status: VariantType) => void,
  ) => {
    setIsLoading(true);
    const { data } = await api.user.usersControllerChangeRole(
      { changeRoleUserDto: payload },
      { withCredentials: true },
    );
    setIsLoading(false);
    onSuccess('Профиль обновлен', 'success');
  };

  return {
    getProfile,
    updateProfile,
    changeRole,
    allUsers,
    isLoading,
    profile,
    users,
  };
};
