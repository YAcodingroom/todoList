import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
} from 'components/common/auth.styled';
import { ACLogoIcon } from 'assets/images';
import { AuthInput } from 'components';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from 'api/auth';
import Swal from 'sweetalert2';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleClick() {
    if (username.length === 0 || password.length === 0) return;

    const { success, authToken } = await login({
      username,
      password,
    });

    if (success) {
      localStorage.setItem('authToken', authToken);

      Swal.fire({
        title: `Hi, ${username}`,
        icon: 'success',
        showConfirmButton: false,
        timer: 1200,
        position: 'top',
      });
      return;
    }

    Swal.fire({
      title: '帳號或密碼錯誤..',
      icon: 'error',
      showConfirmButton: false,
      timer: 1200,
      position: 'top',
    });
  }

  return (
    <AuthContainer>
      <div>
        <ACLogoIcon />
      </div>
      <h1>登入 Todo</h1>

      <AuthInputContainer>
        <AuthInput
          label="帳號"
          placeholder="請輸入帳號"
          value={username}
          onChange={(accountValue) => setUsername(accountValue)}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          label="密碼"
          placeholder="請輸入密碼"
          type="password"
          value={password}
          onChange={(passwordValue) => setPassword(passwordValue)}
        />
      </AuthInputContainer>
      <AuthButton onClick={handleClick}>登入</AuthButton>
      <Link to="/signup">
        <AuthLinkText>註冊</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default LoginPage;
