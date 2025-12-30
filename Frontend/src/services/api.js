import axios from 'axios';
import config from './config';

const api = axios.create({
  baseURL: config.BASE_URL,
});

// Interceptor: Automatically add the Token to requests if we have one
api.interceptors.request.use(
  (req) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      req.headers['token'] = token; // Your backend expects 'token' in headers
    }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;