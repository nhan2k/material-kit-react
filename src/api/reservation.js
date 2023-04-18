import { axiosInstance } from '../utils/axios';

export const getReservation = async () => {
  try {
    const response = await axiosInstance.get('/reservation/admin');

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
