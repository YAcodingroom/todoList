import styled from 'styled-components';
import {
  CheckActiveIcon,
  CheckCircleIcon,
  CheckHoverIcon,
} from 'assets/images';
import clsx from 'clsx';
import { useRef, useState } from 'react';

const StyledTaskItem = styled.div`
  min-height: 52px;
  display: flex;
  align-items: center;
  position: relative;
  word-wrap: break-word;
  word-break: break-word;
  padding: 0 12px;
  box-shadow: 0 17px 0 -16px #e5e5e5;
  flex-wrap: wrap;

  .task-item-body-input {
    user-select: none;
    display: none;
    flex: 1;
    padding: 8px 0px;
    border: 0;
    outline: 0;
    font-size: 1rem;

    &::placeholder {
      color: var(--gray);
      font-size: 13px;
    }
  }

  &:hover {
    background: #fff3eb;
    box-shadow: inset 0 0 0 1px #fff3eb;

    .task-item-action .btn-destroy {
      display: inline-flex;
    }
  }

  &.done {
    .task-item-body {
      color: var(--gray);
      text-decoration: line-through;
    }

    .icon-checked {
      background-image: url(${CheckActiveIcon});
    }
  }

  &.edit {
    .task-item-body-input {
      display: block;
    }
    .task-item-body-text {
      display: none;
    }
    .task-item-action {
      display: none;
    }
  }

  .task-item-checked {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .task-item-body {
    font-weight: 400;
    padding: 8px 12px;
    flex: 1;
    display: flex;
  }

  .task-item-action {
    .btn-destroy {
      display: none;
      font-size: 30px;
      transition: color 0.2s ease-out;
      font-weight: 300;
      &:after {
        content: '×';
      }
    }
  }

  .icon-checked {
    background-image: url(${CheckCircleIcon});
    background-position: center;
    background-repeat: no-repeat;

    &:hover {
      transition: background-image 0.5s;
      background-image: url(${CheckHoverIcon});
    }
  }
`;

const TodoItem = ({ todo, onToggleDone, onSave, onDelete, onEdit }) => {
  // 解決：使用者修改後按下 esc 退出編輯，如果再次點擊 input 會顯示上次修改的文字
  // 為了解決上述問題，建立一個編輯的狀態
  const [editInput, setEditInput] = useState(todo.title);
  const inputRef = useRef(null);

  // 使用 handleChange，讓使用者編輯時能及時看見修改的文字
  function handleChange(e) {
    setEditInput(e.target.value);
  }

  function handleKeyDown(e) {
    if (inputRef.current.value.length > 0 && e.key === 'Enter') {
      onSave?.({ id: todo.id, title: inputRef.current.value });
    }
    if (e.key === 'Escape') {
      // 當使用者修改後按下 esc，將 input 欄位設定為初始的 title，避免下次點擊時顯示上次修改的文字
      setEditInput(todo.title);
      onEdit?.({ id: todo.id, isEdit: false });
    }
  }

  return (
    // 使用 clsx 動態建立 className
    <StyledTaskItem className={clsx({ done: todo.isDone, edit: todo.isEdit })}>
      <div className="task-item-checked">
        <span
          className="icon icon-checked"
          onClick={() => onToggleDone?.(todo.id)}
        />
      </div>
      <div
        className="task-item-body"
        onDoubleClick={() => onEdit?.({ id: todo.id, isEdit: true })}
      >
        <span className="task-item-body-text">{todo.title}</span>
        <input
          className="task-item-body-input"
          // 將 defalutValue 改成 value 讓 input 成為可控的
          value={editInput}
          ref={inputRef}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="task-item-action ">
        <button className="btn-reset btn-destroy icon"></button>
      </div>
    </StyledTaskItem>
  );
};

export default TodoItem;
