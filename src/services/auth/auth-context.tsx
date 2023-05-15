import React, { Context, createContext, useContext } from 'react';

import { useAuthService, AuthService } from './use-auth-service';

const AuthContext = createContext<AuthService | null>(null);

export const useAuth = (): AuthService => useContext(AuthContext as Context<AuthService>);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const authenticationService = useAuthService();

  return <AuthContext.Provider value={authenticationService}>{children}</AuthContext.Provider>;
};
