import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TodoPage, LoginPage, SignUpPage, HomePage } from './pages';
import './App.scss';
import PageNotFound from 'pages/PageNotFound';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="todo" element={<TodoPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
