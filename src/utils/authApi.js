import axios from 'axios';

export const authApi = axios.create({
  baseURL: 'http://localhost:8001/api'
});

authApi.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

authApi.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    //console.log('Interceptor - Status:', error.response?.status);
    //console.log('Interceptor - Error:', error.response?.data?.error);
    //console.log('Interceptor - Retry:', originalRequest._retry);

    if (error.response?.status === 401 &&
        error.response?.data?.error === 'Token Expired' &&
        !originalRequest._retry) {
      originalRequest._retry = true;

      console.log('Attempting refresh...');

      try {
        const res = await axios.post('http://localhost:8001/api/auth/refresh', {}, { withCredentials: true });
        localStorage.setItem('access_token', res.data.access_token);
       // console.log('Token refreshed:', res.data.access_token);
        
        originalRequest.headers.Authorization = `Bearer ${res.data.access_token}`;
        return authApi(originalRequest);
      } catch (refreshError) {
        console.error('Refresh failed:', refreshError);
        localStorage.removeItem('access_token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    if (originalRequest._retry) {
     // console.log('Refresh failed, logging out...');
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);