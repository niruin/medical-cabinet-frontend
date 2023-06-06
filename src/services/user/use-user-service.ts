import { useState } from 'react';
import { VariantType } from 'notistack';

import { api } from '../api/api-adapter';
import { ChangeRoleUserDto, ProfileResponseData } from '../api';
import { ProfilePatch } from './types';
import { useAuthService } from '../auth/use-auth-service';

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
  removeById: (id: number) => void;
  allUsers: () => void;
  profile: Nullable<ProfileResponseData>;
  isLoading: boolean;
  users: ProfileResponseData[];
};

export const useUserService = (): UserService => {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<null | ProfileResponseData>(null);
  const [users, setUsers] = useState<ProfileResponseData[]>([]);
  const { logout } = useAuthService();

  const getProfile = async () => {
    setIsLoading(true);

    const { data } = await api.user.usersControllerGetProfile();
    setProfile(data.data);
    setIsLoading(false);
  };

  const updateProfile = async (
    payload: ProfilePatch,
    onSuccess: (msg: string, status: VariantType) => void,
    userIdToEdit?: number,
  ) => {
    setIsLoading(true);

    const { data } = await api.user.usersControllerUpdate({
      userChangeRequest: payload,
      userIdToEdit: String(userIdToEdit),
    });
    setIsLoading(false);
    onSuccess('Профиль обновлен', 'success');
  };

  const allUsers = async () => {
    setIsLoading(true);
    const { data } = await api.user.usersControllerGetUsersAll();
    setUsers(data.data);
    setIsLoading(false);
  };

  const removeById = async (id: number) => {
    setIsLoading(true);

    const { data } = await api.user.usersControllerRemove({ deleteUserDto: { id } });
    setIsLoading(false);

    if (profile?.id === id) {
      logout();
    } else {
      allUsers();
    }
  };

  const changeRole = async (
    payload: ChangeRoleUserDto,
    onSuccess: (msg: string, status: VariantType) => void,
  ) => {
    setIsLoading(true);
    const { data } = await api.user.usersControllerChangeRole({ changeRoleUserDto: payload });
    setIsLoading(false);
    onSuccess('Профиль обновлен', 'success');
  };

  return {
    getProfile,
    updateProfile,
    removeById,
    changeRole,
    allUsers,
    isLoading,
    profile,
    users,
  };
};
