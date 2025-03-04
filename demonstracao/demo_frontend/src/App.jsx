import { useState, useEffect } from 'react';
import { fetchUser, logoutUser } from './services/authenticationService';
import { fetchTasks } from './services/taskService';
import Authentication from './components/Authentication';
import TaskList from './components/TaskList';
import TaskInput from './components/TaskInput';

import axios from 'axios';

import { BASE_URL_MDRS } from './services/BaseURL'


function App() {
    const [user, setUser] = useState(null);

    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
          fetchUser();
        }
      }, []);
    
      const fetchUser = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;
        
        try {
          const response = await axios.get(`${BASE_URL_MDRS}/users/get`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
        } catch (error) {
          localStorage.removeItem('token');
          setUser(null);
          return error;

        }
      };
    
      const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
      };

    return (
        <div className="min-h-screen min-w-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        {!user ? (
          <Authentication setUser={setUser} />
        ) : (
          <TaskList user={user} logout={logout} />
        )}
      </div>
    </div>
  );
}

export default App;
