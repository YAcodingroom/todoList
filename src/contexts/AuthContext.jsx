import { checkPermission, login, register } from 'api/auth';
import { createContext, useContext, useEffect, useReducer } from 'react';
import * as jwt from 'jsonwebtoken';
import { useLocation } from 'react-router-dom';

const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  currentMember: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        isAuthenticated: true,
        currentMember: {
          id: action.payload.sub,
          name: action.payload.name,
        },
      };
    case 'logout':
      return { ...initialState };
    default:
      throw new Error('Unknow action');
  }
}

function AuthProvider({ children }) {
  const [{ isAuthenticated, currentMember }, dispatch] = useReducer(
    reducer,
    initialState,
  );
  const { pathname } = useLocation();

  async function handleRegister(data) {
    const { success, authToken } = await register({
      username: data.username,
      password: data.password,
      email: data.email,
    });
    const tempPayload = jwt.decode(authToken);
    if (tempPayload) {
      dispatch({ type: 'login', payload: tempPayload });
      localStorage.setItem('authToken', authToken);
    } else {
      dispatch({ type: 'logout' });
    }
    return success;
  }

  async function handleLogin(data) {
    const { success, authToken } = await login({
      username: data.username,
      password: data.password,
    });

    const tempPayload = jwt.decode(authToken);
    if (tempPayload) {
      dispatch({ type: 'login', payload: tempPayload });
      localStorage.setItem('authToken', authToken);
    } else {
      dispatch({ type: 'logout' });
    }
    return success;
  }

  function handleLogout() {
    localStorage.removeItem('authToken');
    dispatch({ type: 'logout' });
  }

  useEffect(
    function () {
      async function checkTokenIsValid() {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
          dispatch({ type: 'logout' });
          return;
        }

        const result = await checkPermission(authToken);

        if (result) {
          const tempPayload = jwt.decode(authToken);
          dispatch({ type: 'login', payload: tempPayload });
        } else {
          dispatch({ type: 'logout' });
        }
      }
      checkTokenIsValid();
    },
    [pathname],
  );

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentMember,
        register: handleRegister,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
