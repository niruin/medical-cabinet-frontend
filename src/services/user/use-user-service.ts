import { useState } from 'react';
import { VariantType } from 'notistack';

import { api } from '../api/api-adapter';
import { ProfileResponseData } from '../api';
import { ProfilePatch } from './types';

export type UserService = {
  getProfile: () => void;
  updateProfile: (
    data: ProfilePatch,
    onSuccess: (msg: string, status: VariantType) => void,
  ) => void;
  allUsers: () => void;
  profile: Nullable<ProfileResponseData>;
  isLoading: boolean;
  users: ProfileResponseData[];
};

export const useUserService = () => {
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
  ) => {
    setIsLoading(true);

    const { data } = await api.user.usersControllerUpdate(
      { userChangeRequest: payload },
      { withCredentials: true },
    );
    setIsLoading(false);
    onSuccess('Профиль обновлен', 'success');
  };

  const allUsers = async () => {
    setIsLoading(true);
    const { data } = await api.user.usersControllerGetUsersAll({ withCredentials: true });
    // @ts-ignore
    setUsers(data.data);
    setIsLoading(false);
  };

  return {
    getProfile,
    updateProfile,
    allUsers,
    isLoading,
    profile,
    users,
  };
};
