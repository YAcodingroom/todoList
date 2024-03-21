import axios from 'axios';

const AUTH_URL = 'https://todo-list.alphacamp.io/api/auth';

async function login({ username, password }) {
  try {
    const { data } = await axios.post(`${AUTH_URL}/login`, {
      username,
      password,
    });
    const { authToken } = data;

    if (authToken) {
      return { success: true, ...data };
    }
    return data;
  } catch (err) {
    console.error('[Login failed]: ', err);
  }
}

function signup() {}

export { login };
