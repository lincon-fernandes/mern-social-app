import axios from 'axios';
export const axiosInstance = axios.create({
  baseURL: 'https://lincon-social.herokuapp.com/api',
});
