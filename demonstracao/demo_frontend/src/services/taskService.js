import api from './api';

export const fetchTasks = async () => {
  try {
    const response = await api.get('/tasks');
    return response.data;
  } catch (error) {
    return error;

  }
};

export const addTask = async (title) => {
  try {
    const response = await api.post('/tasks', { title });
    return response.data;
  } catch (error) {
    return error;

  }
};

export const completeTask = async (id) => {
  try {
    const response = await api.patch(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    return error;

  }
};

export const deleteTask = async (id) => {
  try {
    await api.delete(`/tasks/${id}`);
  } catch (error) {
    return error;
  }
};

