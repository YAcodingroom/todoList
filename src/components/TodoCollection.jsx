import TodoItem from './TodoItem';

const TodoCollection = ({ todos, onToggleDone, onSave, onDelete, onEdit }) => {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onSave={({ id, title }) => onSave({ id, title })}
          onToggleDone={(id) => onToggleDone?.(id)}
          onEdit={({ id, isEdit }) => onEdit({ id, isEdit })}
          onDelete={(id) => onDelete(id)}
        />
      ))}
    </div>
  );
};

export default TodoCollection;
