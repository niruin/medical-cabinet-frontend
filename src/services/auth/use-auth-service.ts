import { useState } from 'react';
import { VariantType } from 'notistack';

import { api } from '../api/api-adapter';
import { CreateUserDto, LoginUserRequest } from '../api';
import { getCookieValueByName } from './cookie';

export type AuthService = {
  authorization: (
    data: LoginUserRequest,
    onSuccess: (msg: string, status: VariantType) => void,
  ) => void;
  registration: (
    data: CreateUserDto,
    onSuccess: (msg: string, status: VariantType) => void,
  ) => void;
  isLoading: boolean;
  isLoggedIn: boolean;
  logout: (onSuccess?: (msg: string, status: VariantType) => void) => void;
};

export const useAuthService = () => {
  const authorizedValue = getCookieValueByName('authorized');
  const authorizedStatus = Boolean(JSON.parse(authorizedValue));
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(authorizedStatus);
  const [isLoading, setIsLoading] = useState(false);

  const authorization = async (
    payload: LoginUserRequest,
    onSuccess: (msg: string, status: VariantType) => void,
  ) => {
    setIsLoading(true);

    await api.user
      .usersControllerLogin({ loginUserRequest: payload })
      .then(({ data }) => {
        if (data?.data?.userId) {
          setIsLoggedIn(true);
          onSuccess('Вы успешно авторизовались', 'success');
        } else {
          onSuccess('Не удалось авторизоваться', 'error');
        }
      })
      .catch((e) => e)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const registration = async (
    payload: CreateUserDto,
    onSuccess: (msg: string, status: VariantType) => void,
  ) => {
    setIsLoading(true);

    await api.user
      .usersControllerCreateUser({ createUserDto: { ...payload } })
      .then(({ data }) => {
        if (data?.data?.userId) {
          onSuccess('Вы успешно зарегистрированы', 'success');
        } else {
          onSuccess('Не удалось зарегистрироваться', 'error');
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const logout = async (onSuccess?: (msg: string, status: VariantType) => void) => {
    await api.user
      .usersControllerLogout()
      .then(() => {
        if (onSuccess) {
          setIsLoggedIn(false);
          onSuccess('Вы вышли из системы', 'success');
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return {
    authorization,
    registration,
    isLoading,
    isLoggedIn,
    logout,
  };
};
