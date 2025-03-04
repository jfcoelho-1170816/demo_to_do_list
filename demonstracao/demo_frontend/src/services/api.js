import axios from 'axios';

import { BASE_URL_MDRS } from './BaseURL'


const api = axios.create({
    baseURL: BASE_URL_MDRS,
    headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
