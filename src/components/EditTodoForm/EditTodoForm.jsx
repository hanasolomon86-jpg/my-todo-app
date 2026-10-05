import { useState } from "react";
import Button from "../Button/Button";
import "./EditTodoForm.css";

function EditTodoForm({ todo, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo ? todo.text : "");
  const [editedDate, setEditedDate] = useState(todo ? todo.dueDate : "");
  const [editedPriority, setEditedPriority] = useState(
    todo ? todo.priority : "",
  );

  const handleEdit = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.stopPropagation();

    if (!editedText.trim()) {
      return;
    }

    onEdit(todo.id, {
      text: editedText,
      dueDate: editedDate,
      priority: editedPriority,
    });
    setIsEditing(false);
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    setIsEditing(false);
  };

  return (
    <>
      <Button
        className="edit-icon-btn"
        text="✏️"
        onClick={handleEdit}
        title="ערוך משימה"
      />
      {isEditing && (
        <div className="edit-todo-form-container">
          <input
            type="text"
            placeholder="Edit Task"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <input
            type="date"
            placeholder="Edit date"
            value={editedDate}
            onChange={(e) => setEditedDate(e.target.value)}
          />
          <select
            value={editedPriority}
            onChange={(e) => setEditedPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <Button text="שמור" onClick={handleSave} />
          <Button text="ביטול" onClick={handleCancel} />
        </div>
      )}
    </>
  );
}

export default EditTodoForm;
