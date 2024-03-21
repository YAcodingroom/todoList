import { useEffect, useState } from 'react';
import { Footer, Header, TodoCollection, TodoInput } from 'components';
import { createTodo, getTodos } from '../api/todos';

const TodoPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([]);

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

  function handleToggleDone(id) {
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
  function handleDelete(id) {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }

  function handleSave({ id, title }) {
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

  return (
    <div>
      <Header userName="" />
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
