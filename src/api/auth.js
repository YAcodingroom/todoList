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

async function register({ username, password, email }) {
  try {
    const { data } = await axios.post(`${AUTH_URL}/register`, {
      username,
      password,
      email,
    });
    const { authToken } = data;

    if (authToken) {
      return { success: true, ...data };
    }
    return data;
  } catch (err) {
    console.error('[Register failed]: ', err);
  }
}

async function checkPermission(authToken) {
  try {
    // 使用 test-token API
    const res = await axios.get(`${AUTH_URL}/test-token`, {
      headers: {
        Authorization: 'Bearer ' + authToken,
      },
    });

    return res.data.success;
  } catch (err) {
    console.error('[Check permission failed]: ', err);
  }
}

export { login, register, checkPermission };
