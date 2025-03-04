import { useState } from 'react';
import axios from 'axios';

import { BASE_URL_MDRS } from '../services/BaseURL'

function Authentication({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const register = async () => {
    try {
      await axios.post(`${BASE_URL_MDRS}/users/register`, { username, password });
      alert('Registo bem-sucedido!');
    } catch (error) {
      alert('Erro ao registrar usuário');
    }
  };

  const login = async () => {
    if (!username || !password) {
      alert('Preencha todos os campos');
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL_MDRS}/users/login`, { username, password });
      
      localStorage.setItem('token', response.data.token); // Salva token no localStorage

      // Busca os dados do usuário autenticado
      const userResponse = await axios.get(`${BASE_URL_MDRS}/users/get`, {
        headers: { Authorization: `Bearer ${response.data.token}` },
      });

      setUser(userResponse.data); 

    } catch (error) {
      alert(error.response?.data?.message || 'Erro ao fazer login');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold font-serif text-center mb-4">Autenticação</h1>
      <input className="w-full p-2 font-mono border rounded mb-2" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Usuário" />
      <input className="w-full p-2 border font-mono rounded mb-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" />
      <button className="bg-grey-100/100 font-serif text-blue w-full p-2 rounded mb-2" onClick={register}>Registar</button>
      <button className="bg-grey-100 font-serif text-blue w-full p-2 rounded" onClick={login}>Login</button>
    </div>
  );
}

export default Authentication;
