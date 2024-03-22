import { checkPermission, login, register } from 'api/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import * as jwt from 'jsonwebtoken';
import { useLocation } from 'react-router-dom';

const defaultAuthContext = {
  isAuthenticated: false,
  currentMember: null,
  register: null,
  login: null,
  logout: null,
};

const AuthContext = createContext(defaultAuthContext);

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [payload, setPayload] = useState(null);
  const { pathname } = useLocation();

  async function handleRegister(data) {
    const { success, authToken } = await register({
      username: data.username,
      password: data.password,
      email: data.email,
    });
    const tempPayload = jwt.decode(authToken);
    if (tempPayload) {
      setPayload(tempPayload);
      setIsAuthenticated(true);
      localStorage.setItem('authToken', authToken);
    } else {
      setPayload(null);
      setIsAuthenticated(false);
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
      setPayload(tempPayload);
      setIsAuthenticated(true);
      localStorage.setItem('authToken', authToken);
    } else {
      setPayload(null);
      setIsAuthenticated(false);
    }
    return success;
  }

  function handleLogout() {
    localStorage.removeItem('authToken');
    setPayload(null);
    setIsAuthenticated(false);
  }

  useEffect(
    function () {
      async function checkTokenIsValid() {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
          setIsAuthenticated(false);
          setPayload(null);
          return;
        }

        const result = await checkPermission(authToken);

        if (result) {
          setIsAuthenticated(true);
          const tempPayload = jwt.decode(authToken);
          setPayload(tempPayload);
        } else {
          setIsAuthenticated(false);
          setPayload(null);
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
        currentMember: payload && {
          id: payload.sub,
          name: payload.name,
        },
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
