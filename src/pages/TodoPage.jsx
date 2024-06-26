import { useEffect, useState } from 'react';
import { Footer, Header, TodoCollection, TodoInput } from 'components';
import { createTodo, deleteTodo, getTodos, patchTodo } from '../api/todos';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';

const TodoPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();
  const { isAuthenticated, currentMember } = useAuth();

  function handleChange(value) {
    setInputValue(value);
  }

  async function handleAddTodo() {
    if (inputValue.length === 0) return;

    try {
      const data = await createTodo({
        title: inputValue,
        isDone: false,
      });

      setTodos((prevTodos) => [
        ...prevTodos,
        {
          id: data.id,
          title: data.title,
          isDone: data.isDone,
          isEdit: false,
        },
      ]);
      setInputValue('');
    } catch (err) {
      console.error(err);
    }
  }

  async function handleKeyDown() {
    if (inputValue.length === 0) return;

    try {
      const data = await createTodo({
        title: inputValue,
        isDone: false,
      });

      setTodos((prevTodos) => [
        ...prevTodos,
        {
          id: data.id,
          title: data.title,
          isDone: data.isDone,
          isEdit: false,
        },
      ]);
      setInputValue('');
    } catch (err) {
      console.error(err);
    }
  }

  async function handleToggleDone(id) {
    const currentTodo = todos.find((todo) => todo.id === id);
    try {
      await patchTodo({
        id,
        isDone: !currentTodo.isDone,
      });

      setTodos((prevTodos) =>
        prevTodos.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              isDone: !todo.isDone,
            };
          }
          return todo;
        }),
      );
    } catch (err) {
      console.error(err);
    }
  }

  function handleEdit({ id, isEdit }) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isEdit,
          };
        }
        return { ...todo, isEdit: false };
      }),
    );
  }

  // 將觸發 delete 事件的項目 id 與 todos 中的 id 比對 並進行刪除
  async function handleDelete(id) {
    try {
      await deleteTodo(id);

      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSave({ id, title }) {
    try {
      await patchTodo({
        id,
        title,
      });

      setTodos((prevTodos) =>
        prevTodos.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              title,
              isEdit: false,
            };
          }
          return todo;
        }),
      );
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(function () {
    async function getTodosAsync() {
      try {
        const todos = await getTodos();
        setTodos(
          todos.map((todo) => {
            return {
              ...todo,
              isEdit: false,
            };
          }),
        );
      } catch (err) {
        console.error(err);
      }
    }
    getTodosAsync();
  }, []);

  useEffect(
    function () {
      if (!isAuthenticated) navigate('/login');
    },
    [navigate, isAuthenticated],
  );

  return (
    <div>
      <Header userName={currentMember?.name} />
      <TodoInput
        inputValue={inputValue}
        onChange={handleChange}
        onAddTodo={handleAddTodo}
        onKeyDown={handleKeyDown}
      />
      <TodoCollection
        todos={todos}
        onToggleDone={handleToggleDone}
        onEdit={handleEdit}
        onSave={handleSave}
        onDelete={handleDelete}
      />
      <Footer todos={todos} />
    </div>
  );
};

export default TodoPage;
