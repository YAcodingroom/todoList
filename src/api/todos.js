import axios from 'axios';

const BASE_URL = 'http://localhost/3001';

async function getTodos() {
  try {
    const res = await axios.get(`${BASE_URL}/todos`);
    return res.data;
  } catch (err) {
    console.error('[Get todos failed: ]', err);
  }
}

async function createTodo(payload) {
  try {
    const { title, isDone } = payload;
    const res = await axios.post(`${BASE_URL}/todos`, {
      title,
      isDone,
    });
    return res.data;
  } catch (err) {
    console.error('[Create todos failed: ]', err);
  }
}

function patchTodo() {}

function deleteTodo() {}
