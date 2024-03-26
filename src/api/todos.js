import axios from 'axios';

const BASE_URL = 'https://todo-list.alphacamp.io/api';
const axiosInstance = axios.create({
  BASE_URL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (err) => console.error(err),
);

async function getTodos() {
  try {
    const res = await axiosInstance.get(`${BASE_URL}/todos`);
    return res.data.data;
  } catch (err) {
    console.error('[Get todos failed]: ', err);
  }
}

async function createTodo(payload) {
  const { title, isDone } = payload;

  try {
    const res = await axiosInstance.post(`${BASE_URL}/todos`, {
      title,
      isDone,
    });
    return res.data;
  } catch (err) {
    console.error('[Create todo failed]: ', err);
  }
}

async function patchTodo(payload) {
  const { id, title, isDone } = payload;

  try {
    const res = await axiosInstance.patch(`${BASE_URL}/todos/${id}`, {
      title,
      isDone,
    });
    return res.data;
  } catch (err) {
    console.error('[Patch todo failed]: ', err);
  }
}

async function deleteTodo(id) {
  try {
    const res = await axiosInstance.delete(`${BASE_URL}/todos/${id}`);
    return res.data;
  } catch (err) {
    console.error('[Delete todo failed]: ', err);
  }
}

export { getTodos, createTodo, patchTodo, deleteTodo };
