import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api', // Your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
