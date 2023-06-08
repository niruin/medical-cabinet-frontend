import globalAxios from 'axios';

import { RolesApi, ScheduleApi, UsersApi, DoctorsApi, PatientsApi } from './api';

class Api {
  role: RolesApi = new RolesApi();
  user: UsersApi = new UsersApi();
  doctors: DoctorsApi = new DoctorsApi();
  patients: PatientsApi = new PatientsApi();
  schedule: ScheduleApi = new ScheduleApi();

  constructor() {
    this.setDefault();
  }

  private logout = () => {
    if (window.location.pathname !== '/login') {
      this.user.usersControllerLogout();
      window.location.href = '/login';
    }
  };

  private setDefault = () => {
    globalAxios.interceptors.request.use((config) => {
      return { ...config, withCredentials: true };
    });

    globalAxios.interceptors.response.use(
      (config) => {
        return config;
      },
      async (error) => {
        if (error.response?.status === 401) {
          this.logout();
        }

        throw error;
      },
    );
  };
}

export const api = new Api();
