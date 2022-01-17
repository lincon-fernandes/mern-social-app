import { axiosInstance } from './config';

export const loginCall = async (userCredentials, dispath) => {
  dispath({ type: 'LOGIN_START' });
  try {
    const res = await axiosInstance.post('/auth/login', userCredentials);
    dispath({ type: 'LOGIN_SUCCESS', payload: res.data });
  } catch (err) {
    dispath({ type: 'LOGIN_FAILURE', payload: err });
  }
};
