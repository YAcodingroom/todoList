import TodoItem from './TodoItem';

const TodoCollection = ({ todos, onToggleDone, onSave, onDelete, onEdit }) => {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleDone={(id) => onToggleDone?.(id)}
        />
      ))}
    </div>
  );
};

export default TodoCollection;
