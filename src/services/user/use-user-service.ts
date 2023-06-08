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

    await api.user
      .usersControllerGetProfile()
      .then(({ data }) => {
        setProfile(data.data);
      })
      .catch((e) => {
        console.log('error', e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const updateProfile = async (
    payload: ProfilePatch,
    onSuccess: (msg: string, status: VariantType) => void,
  ) => {
    setIsLoading(true);

    await api.user
      .usersControllerUpdate({
        userChangeRequest: payload,
      })
      .then(() => {
        onSuccess('Профиль обновлен', 'success');
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const allUsers = async () => {
    setIsLoading(true);
    await api.user
      .usersControllerGetUsersAll()
      .then(({ data }) => {
        setUsers(
          data.data.sort(function (a, b) {
            return a.id - b.id;
          }),
        );
      })
      .catch((e) => {
        console.log('error', e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const removeById = async (id: number) => {
    setIsLoading(true);

    await api.user
      .usersControllerRemove({ deleteUserDto: { id } })
      .then(() => {
        if (profile?.id === id) {
          logout();
          location.href = '/login';
        } else {
          allUsers();
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const changeRole = async (
    payload: ChangeRoleUserDto,
    onSuccess: (msg: string, status: VariantType) => void,
  ) => {
    setIsLoading(true);
    await api.user
      .usersControllerChangeRole({ changeRoleUserDto: payload })
      .then(() => {
        onSuccess('Профиль обновлен', 'success');
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
