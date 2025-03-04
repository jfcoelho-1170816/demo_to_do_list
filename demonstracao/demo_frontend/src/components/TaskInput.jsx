import { useState } from 'react';
import axios from 'axios';

import { BASE_URL_MDRS } from '../services/BaseURL'

function TaskInput({ setTasks }) {
  const [newTask, setNewTask] = useState('');

  const addTask = async () => {
    if (!newTask) return;
  
    try {
      const response = await axios.post(`${BASE_URL_MDRS}/tasks`, { title: newTask });
  
      setTasks(prevTasks => [...prevTasks, response.data]);
      setNewTask('');
      alert("Foi adicionada uma nova tarefa");
    } catch (error) {
      alert("Já existe uma tarefa com o mesmo título")
      return error;
    }
  };

  return (
    <div className="flex mb-4">
      <input className="flex-grow font-mono p-2 border rounded-l" type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Nova tarefa" />
      <button className="bg-grey-100 font-serif text-blue p-2 rounded-r" onClick={addTask}>Adicionar</button>
    </div>
  );
}

export default TaskInput;
