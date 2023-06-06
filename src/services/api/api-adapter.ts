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
    // location.reload();
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
        const refresh = localStorage.getItem('refresh');
        const originalRequest = error.config;
        if (
          refresh &&
          error?.response?.status === 403 &&
          error?.response?.data.code === 'token_not_valid'
        ) {
          originalRequest._isRetry = true;

          try {
            return globalAxios.request(originalRequest);
          } catch (e) {
            this.logout();
          }
        }
        if (!refresh && error.response?.status === 401) {
          this.logout();
        }

        throw error;
      },
    );
  };
}

export const api = new Api();
