import { api } from '../api/api-adapter';

const getDoctorList = async () => {
  const { data } = await api.doctors.doctorsControllerDoctorList({ withCredentials: true });

  return data;
};

const getPatientList = async () => {
  const { data } = await api.patients.patientsControllerList({ withCredentials: true });

  return data;
};

export const useUserApi = () => ({
  getDoctorList,
  getPatientList,
});
