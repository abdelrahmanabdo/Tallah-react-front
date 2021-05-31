import axios from 'axios';

//Urls
const _DEV = 'http://10.0.2.2:8000/api/v1/';
const _LOCALHOST_DEV = 'http://localhost:8000/api/v1/';
const _PROD = 'https://dashboard.tallah.co/api/v1/';

const axiosApiInstance = axios.create({
   baseURL: _PROD,
});

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async config => {
    const token = await localStorage.getItem('token');
    config.headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}` 
    }
    return config;
  },
  error => {
    Promise.reject(error)
});

export default axiosApiInstance;