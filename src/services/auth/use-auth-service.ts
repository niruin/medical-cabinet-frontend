import { useState } from 'react';
import { VariantType } from 'notistack';

import { api } from '../api/api-adapter';
import { CreateUserDto, LoginUserRequest } from '../api';

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
  logout: (onSuccess: (msg: string, status: VariantType) => void) => void;
};

export const useAuthService = () => {
  const cookie = getCookie('med-cabinet');
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(cookie));
  const [isLoading, setIsLoading] = useState(false);

  const authorization = async (
    payload: LoginUserRequest,
    onSuccess: (msg: string, status: VariantType) => void,
  ) => {
    setIsLoading(true);

    const { data } = await api.user.usersControllerLogin(
      { loginUserRequest: payload },
      { withCredentials: true },
    );

    if (data?.data?.userId) {
      setIsLoggedIn(true);
      onSuccess('Вы успешно авторизовались', 'success');
    } else {
      onSuccess('Не удалось авторизоваться', 'error');
    }

    setIsLoading(false);
  };

  const registration = async (
    payload: CreateUserDto,
    onSuccess: (msg: string, status: VariantType) => void,
  ) => {
    setIsLoading(true);

    const { data } = await api.user.usersControllerCreateUser(
      { createUserDto: { ...payload } },
      { withCredentials: true },
    );

    if (data?.data?.userId) {
      onSuccess('Вы успешно зарегистрированы', 'success');
    } else {
      onSuccess('Не удалось зарегистрироваться', 'error');
    }

    setIsLoading(false);
  };

  const logout = async (onSuccess: (msg: string, status: VariantType) => void) => {
    const { data } = await api.user.usersControllerLogout();
    setIsLoggedIn(false);
    deleteCookie();
    onSuccess('Вы вышли из системы', 'success');
  };

  return {
    authorization,
    registration,
    isLoading,
    isLoggedIn,
    logout,
  };
};

function getCookie(name: string) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];

  return undefined;
}

const deleteCookie = () => {
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
};
