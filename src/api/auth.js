import { axiosInstance } from '../utils/axios';

export const login = async (data) => {
  try {
    const response = await axiosInstance.post('/auth/login', data);

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
