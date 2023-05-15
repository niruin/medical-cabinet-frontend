import React, { Context, createContext, useContext } from 'react';

import { useUserService, UserService } from './use-user-service';

const UserContext = createContext<UserService | null>(null);

export const useUser = (): UserService => useContext(UserContext as Context<UserService>);

type UserProviderProps = {
  children: React.ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const userService = useUserService();

  return <UserContext.Provider value={userService}>{children}</UserContext.Provider>;
};
