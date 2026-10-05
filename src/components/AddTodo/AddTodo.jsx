import { useState, useEffect, useRef } from "react";
import "../AddTodo/AddTodo.css";

const PRIORITIES = [
  { id: "low", label: "Low" },
  { id: "medium", label: "Medium" },
  { id: "high", label: "High" },
];
function AddTodo({ task, setTask, handleClick, categories }) {
  const [category, setCategory] = useState("⚙️ General");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current !== null && inputRef.current !== undefined) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (task.trim()) {
      const newTodo = {
        id: Date.now(),
        text: task,
        status: "open",
        date: new Date().toLocaleDateString("he-IL"),
        category: category,
        priority: priority,
        dueDate: dueDate,
      };
      handleClick(newTodo);
      setTask("");
      setCategory("⚙️ General");
      setPriority("medium");
      setDueDate("");
      setIsExpanded(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-container">
      <input
        className="add-todo-input"
        style={{ padding: "5px" }}
        placeholder="Enter a new todo..."
        type="text"
        value={task}
        ref={inputRef}
        onChange={(e) => {
          const val = e.target.value;
          setTask(val);
          setIsExpanded(val.trim().length > 0);
        }}
      />
      {isExpanded && (
        <div className="expanded-options">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories && categories.length > 0 ? (
              categories.map((cat) => (
                <option key={cat.id} value={cat.title}>
                  {cat.emoji ? `${cat.emoji} ${cat.title}` : cat.title}
                </option>
              ))
            ) : (
              <option disabled>No available categories</option>
            )}
          </select>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="" disabled>
              Select priority
            </option>
            {PRIORITIES && PRIORITIES.length > 0 ? (
              PRIORITIES.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))
            ) : (
              <option disabled>No categories available</option>
            )}
          </select>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <button type="submit" className="add-todo-button">
            {" "}
            +{" "}
          </button>
        </div>
      )}
    </form>
  );
}

export default AddTodo;
