import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskInput from './TaskInput';
import { BASE_URL_MDRS } from '../services/BaseURL'

function TaskList({ user, logout }) {
  const [tasks, setTasks] = useState([]);
  const [showTasks, setShowTasks] = useState(true);

  useEffect(() => {
    if (showTasks) {
      fetchTasks();
    }
  }, [showTasks]);

  const fetchTasks = async () => {
    const response = await axios.get(`${BASE_URL_MDRS}/tasks/get`);
    setTasks(response.data);
  };

  const toggleTasks = () => {
    if (showTasks) {
      setTasks([]); // Esconde a lista de tarefas
    } else {
      fetchTasks(); // Mostra as tarefas
    }
    setShowTasks(!showTasks);
  };

  const completeTask = async (id) => {
    try {
        const response = await axios.patch(`${BASE_URL_MDRS}/tasks/${id}`);
        setTasks(tasks.map(task => (task._id === id ? response.data : task)));
    }catch(error){
      return error;

    }
  };

  const deleteTask = async (id) => {
    await axios.delete(`${BASE_URL_MDRS}/tasks/${id}`);
    setTasks(tasks.filter(task => task._id !== id));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold font-serif text-center mb-4">Lista de Tarefas</h1>
      
    <div className="bg-white-200 p-3 rounded mb-4 text-right text-xs font-semibold">
          User ativo: {user.username}
    </div>
      
      <button className="bg-grey-100 font-serif text-blue w-full p-2 rounded mb-4" onClick={logout}>Logout</button>
      <TaskInput setTasks={setTasks} />
      <div className="flex mb-5">
        <button id='ListBtn' className="bg-grey-100 font-serif text-blue p-3 border rounded" onClick={toggleTasks}>
          {showTasks ? 'Esconder Lista' : 'Mostrar Lista'}
        </button>
      </div>
      <ul>
        {tasks.map(task => (
          <li key={task._id} className="flex justify-between items-center gap-6 p-3 border-b">
            <span className={task.completed ? "line-through" : ""}>{task.title}</span>
            <div>
              {!task.completed && (
                <button className="bg-green-500 text-green p-1 rounded mr-2" onClick={() => completeTask(task._id)}>✔</button>
              )}
              <button className="bg-red-500 text-red p-1 rounded" onClick={() => deleteTask(task._id)}>✖</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
