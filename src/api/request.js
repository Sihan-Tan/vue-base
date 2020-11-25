import Axios from 'axios';
import store from '@/store';
import { getToken } from '@/utils/storage';

const service = Axios.create({
  baseURL: process.env.NODE_ENV === `prod` ? `` : `http://localhost:8080`,
  timeout: 5000,
});

service.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      config.headers['X-Token'] = getToken();
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code !== 200) {
      return Promise.reject(new Error(res.info || 'Error'));
      // 弹出错误
    } else {
      return res;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
