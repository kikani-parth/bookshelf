import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_API_URL = 'https://6c84-62-248-208-88.ngrok-free.app/api';

// Create Axios instance with base URL
const api = axios.create({
  baseURL: BASE_API_URL,
});

// Add an interceptor to attach token to every request
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
