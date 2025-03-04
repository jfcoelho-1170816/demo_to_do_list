import axios from 'axios';

import { BASE_URL_MDRS } from './BaseURL'


const api = axios.create({
    baseURL: BASE_URL_MDRS,
    headers: { 'Content-Type': 'application/json' }
});

// Interceptor para incluir token em todas as requisições
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
