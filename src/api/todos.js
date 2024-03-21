import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

async function getTodos() {
  try {
    const res = await axios.get(`${BASE_URL}/todos`);
    return res.data;
  } catch (err) {
    console.error('[Get todos failed]: ', err);
  }
}

async function createTodo(payload) {
  const { title, isDone } = payload;

  try {
    const res = await axios.post(`${BASE_URL}/todos`, {
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
    const res = await axios.patch(`${BASE_URL}/todos/${id}`, {
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
    const res = await axios.delete(`${BASE_URL}/todos/${id}`);
    return res.data;
  } catch (err) {
    console.error('[Delete todo failed]: ', err);
  }
}

export { getTodos, createTodo, patchTodo, deleteTodo };
