import axios from 'axios';

const BASE_URL = "https://lms-system-backend-9sor.onrender.com/api/v1";

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})

