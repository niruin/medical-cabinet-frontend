import { api } from '../api/api-adapter';

const getDoctorList = async () => {
  const { data } = await api.doctors.doctorsControllerDoctorList();

  return data;
};

const getPatientList = async () => {
  const { data } = await api.patients.patientsControllerList();

  return data;
};

export const useUserApi = () => ({
  getDoctorList,
  getPatientList,
});
