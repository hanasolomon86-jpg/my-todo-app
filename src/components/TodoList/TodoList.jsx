import { useState } from "react";
import TodoItem from "../TodoItem/TodoItem";
import DeleteWithConfirm from "../DeleteWithConfirm/DeleteWithConfirm";
import "./TodoList.css";
import EmojiPicker from "emoji-picker-react";

function TodoList({
  todos,
  removeTodo,
  toggleComplete,
  categories,
  addCategories,
  removeCategory,
  editTodo,
}) {
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    categories[0]?.id || "general",
  );
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleCreateCategory = (e) => {
    e.preventDefault();
    if (newTitle.trim()) {
      addCategories(newTitle);
      setNewTitle("");
      setIsAdding(false);
      setShowEmojiPicker(false);
    }
  };

  const handleEmojiClick = (emojiData, event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (emojiData && emojiData.emoji) {
      setNewTitle((prev) => emojiData.emoji + " " + prev);
    }
    setShowEmojiPicker(false);
  };

  const currentCategory =
    categories.find((cat) => cat.id === selectedCategoryId) || categories[0];
  const currentTodos = todos.filter(
    (todo) =>
      todo.category === currentCategory?.id ||
      todo.category === currentCategory?.title,
  );
  const getCategoryCount = (cat) => {
    const sourceList = todos;
    return sourceList.filter(
      (todo) => todo.category === cat.id || todo.category === cat.title,
    ).length;
  };

  const modalMessage = "האם אתה בטוח שברצונך למחוק רשימה זו?";
  const title = "מחק רשימה";

  return (
    <div className="tab-container">
      <div className="tab-content">
        {currentCategory && (
          <div
            className="category-header"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {currentCategory.id !== "general" && (
              <DeleteWithConfirm
                onDelete={() => {
                  removeCategory(currentCategory.id);
                  setSelectedCategoryId("general");
                }}
                modalMessage={modalMessage}
                title={title}
              />
            )}
          </div>
        )}
        <ul className="styled-list">
          {currentTodos.length > 0 ? (
            currentTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                removeTodo={removeTodo}
                toggleComplete={toggleComplete}
                editTodo={editTodo}
              />
            ))
          ) : (
            <p className="empty-message">No Tasks</p>
          )}
        </ul>
      </div>
      <div className="tabs-sidebar">
        {categories.map((cat) => {
          const count = getCategoryCount(cat);
          return (
            <button
              key={cat.id}
              className={`tab-btn ${selectedCategoryId === cat.id ? "active" : ""}`}
              onClick={() => setSelectedCategoryId(cat.id)}
            >
              <span>{cat.title}</span>
              {count > 0 && <span className="category-badge">{count}</span>}
            </button>
          );
        })}
        <div className="add-tab-wrapper">
          {!isAdding ? (
            <button
              className="add-category-btn"
              onClick={() => setIsAdding(true)}
            >
              <span className="plus-icon">+</span>
              <span className="add-text">Add New List</span>
            </button>
          ) : (
            <form className="add-category-form" onSubmit={handleCreateCategory}>
              <h4>New List</h4>
              <div className="input-with-emoji">
                <input
                  type="text"
                  placeholder="List Title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  autoFocus
                />
                <button
                  className="emoji-toggle-btn"
                  type="button"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                  😊
                </button>
                {showEmojiPicker && (
                  <div
                    className="emoji-picker-popover"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <EmojiPicker
                      onEmojiClick={handleEmojiClick}
                      width={350}
                      height={450}
                      skinTonesDisabled
                      previewConfig={{
                        showPreview: false,
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-save">
                  Create
                </button>
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => {
                    setIsAdding(false);
                    setShowEmojiPicker(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoList;
