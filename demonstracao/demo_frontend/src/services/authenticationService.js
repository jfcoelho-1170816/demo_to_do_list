import api from './api';

export const registerUser = async (username, password) => {
  return api.post('/users/register', { username, password });
};

export const loginUser = async (username, password) => {
  return api.post('/users/login', { username, password });
};

export const fetchUser = async () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const response = await api.get('/users/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem('token');
    }
    throw error;
  }
};

export const logoutUser = () => {
  try{
    localStorage.removeItem('token');
  }catch(error){
    alert('Erro ao fazer logout');
  }
};
