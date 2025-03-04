import axios from 'axios';

import { BASE_URL_MDRS } from './BaseURL'

const loginUser = async (email, password) => {
  try {
    const response = await axios.post(BASE_URL_MDRS, { email, password });

    const { token, user } = response.data;
    
    // Armazena o token no localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    return { success: true, user };
  } catch (error) {
    return error;
  }
};

export default loginUser;
