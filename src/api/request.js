import Axios from 'axios';
import store from '@/store';
import { getToken } from '@/utils/storage';

const service = Axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? '//dev.greenvalley.com'
      : 'http://localhost:8080',
  timeout: 5000,
});

service.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      config.headers['X-Token'] = getToken();
    }

    return config;
  },
  (error) => Promise.reject(error),
);

service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code !== 200) {
      return Promise.reject(new Error(res.info || 'Error'));
      // 弹出错误
    }
    return res;
  },
  (error) => Promise.reject(error),
);

export default service;
