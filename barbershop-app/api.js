import Constants from 'expo-constants';
import axios from 'axios';

const getBaseUrl = () => {
  const debuggerHost = Constants.expoConfig?.hostUri || 'localhost:8081';
  const ip = debuggerHost.split(':')[0];
  console.log(`Using API base URL: http://${ip}:5000/api`);
  return `http://${ip}:5000/api`;
};

const api = axios.create({
  baseURL: getBaseUrl(),
});

export default api;