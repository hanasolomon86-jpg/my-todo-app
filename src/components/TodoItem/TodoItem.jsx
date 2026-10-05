import { useState } from "react";
import "../TodoItem/TodoItem.css";
import DeleteWithConfirm from "../DeleteWithConfirm/DeleteWithConfirm";
import EditTodoForm from "../EditTodoForm/EditTodoForm";

const getDueDateStatus = (dueDate, status) => {
  if (!dueDate || status === "completed") return "";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);

  if (due < today) {
    return "overdue";
  } else if (due.getTime() === today.getTime()) {
    return "due-today";
  }
  return "";
};

function TodoItem({ todo, removeTodo, toggleComplete, editTodo }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const modalMessage = "האם אתה בטוח שברצונך למחוק משימה זו?";
  const title = "מחק משימה";

  const statusLabels = {
    open: "Open",
    "in-progress": "In Progress",
    completed: "Completed",
  };

  const dueDateStatus = getDueDateStatus(todo.dueDate, todo.status);

  return (
    <li
      className={`todo-item priority-${todo.priority ? todo.priority.toLowerCase() : "low"} ${dueDateStatus}`}
      onClick={toggleOpen}
    >
      <div className="todo-left-section">
        <label
          onClick={(e) => e.stopPropagation()}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            checked={todo.status === "completed"}
            onChange={() => toggleComplete(todo.id)}
            style={{ marginRight: "20px" }}
          />
          <span
            style={{
              textDecoration:
                todo.status === "completed" ? "line-through" : "none",
            }}
          >
            {todo.text || todo.task}
          </span>
        </label>
      </div>

      <div className="todo-right-section" onClick={(e) => e.stopPropagation()}>
        {dueDateStatus === "overdue" && (
          <span style={{ marginLeft: "8px" }}>🚨</span>
        )}
        {dueDateStatus === "due-today" && (
          <span style={{ marginLeft: "8px" }}>⚠️</span>
        )}

        <div className="todo-details">
          {todo.category && (
            <span className="todo-tag category-tag">{todo.category}</span>
          )}
          {todo.priority && (
            <span className={`todo-tag priority-tag ${todo.priority}`}>
              {todo.priority}
            </span>
          )}
          {todo.dueDate && (
            <span
              className={`todo-tag date-tag ${getDueDateStatus(todo.dueDate, todo.status)}`}
            >
              📅 {todo.dueDate}
            </span>
          )}
        </div>

        <span className="todo-date">{todo.date || todo.createdAt}</span>

        <span
          className={`todo-tag status-tag ${todo.status}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleComplete(todo.id);
          }}
          style={{ cursor: "pointer", fontWeight: "bold" }}
        >
          {statusLabels[todo.status] || todo.status}
        </span>
        <EditTodoForm todo={todo} onEdit={editTodo} />
        <DeleteWithConfirm
          onDelete={() => removeTodo(todo.id)}
          modalMessage={modalMessage}
          title={title}
        />
      </div>
    </li>
  );
}

export default TodoItem;
