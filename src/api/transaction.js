import { axiosInstance } from '../utils/axios';

export const getTransaction = async () => {
  try {
    const response = await axiosInstance.get('/transaction/admin');

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const refundTransaction = async (id) => {
  try {
    const response = await axiosInstance.post(`/transaction/refund/${id}`, {});

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
