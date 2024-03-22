import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
} from 'components/common/auth.styled';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ACLogoIcon } from 'assets/images';
import { AuthInput } from 'components';
import { register } from 'api/auth';
import Swal from 'sweetalert2';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  async function handleClick() {
    if (username.length === 0 || password.length === 0 || email.length === 0)
      return;

    const { success, authToken } = await register({
      username,
      password,
      email,
    });

    if (success) {
      localStorage.setItem('authToken', authToken);

      Swal.fire({
        title: '註冊成功',
        icon: 'success',
        showConfirmButton: false,
        timer: 1200,
        position: 'top',
      });
      return;
    }

    Swal.fire({
      title: '帳號或 email 已存在',
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
      <h1>建立您的帳號</h1>

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
          label="Email"
          placeholder="請輸入 email"
          value={email}
          onChange={(emailValue) => setEmail(emailValue)}
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
      <AuthButton onClick={handleClick}>註冊</AuthButton>
      <Link to="/login">
        <AuthLinkText>取消</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default SignUpPage;
