import Title from "../Title/Title";
import AddTodo from "../AddTodo/AddTodo";
import TodoList from "../TodoList/TodoList";
import FilterToolBar from "../FilterToolBar/FilterToolBar";
import SortToolBar from "../SortToolBar/SortToolBar";
import WeatherWidget from "../WeatherWidget/WeatherWidget";
import DailyProgress from "../DailyProgress/DailyProgress";
import { useState, useEffect } from "react";

// ניהול Local Storage:
const saveTodosToLocalStorage = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const loadTodosFromLocalStorage = () => {
  const savedTodos = localStorage.getItem("todos");
  return savedTodos ? JSON.parse(savedTodos) : [];
};

const sortBy = {
  high: 1,
  medium: 0,
  low: -1,
};

function TodoApp() {
  // הגדרת הסטייטים
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState(loadTodosFromLocalStorage);
  const [filterSelection, setFilterSelection] = useState("open");
  const [sortSelection, setSortSelection] = useState("default");
  // ניהול קטגוריות וסינכרון עם שרת
  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem("categories");
    if (savedCategories) {
      try {
        return JSON.parse(savedCategories);
      } catch (error) {
        console.error("Error parsing categories from localStorage", error);
      }
    }
    return [
      { id: "general", title: "⚙️ General" },
      { id: "work", title: "💼 Work" },
      { id: "home", title: "🏡 Home" },
      { id: "health", title: "🩺 Health" },
      { id: "studies", title: "📖 Studies" },
    ];
  });

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);
  // פונקציות טיפול במשימות
  const handleClick = (newTodo) => {
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    saveTodosToLocalStorage(updatedTodos);
  };

  const removeTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    saveTodosToLocalStorage(updatedTodos);
  };

  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        let newStatus = "open";

        if (todo.status === "open") {
          newStatus = "in-progress";
        } else if (todo.status === "in-progress") {
          newStatus = "completed";
        } else {
          newStatus = "open";
        }
        return { ...todo, status: newStatus };
      }
      return todo;
    });
    setTodos(updatedTodos);
    saveTodosToLocalStorage(updatedTodos);
  };
  const editTodo = (id, updatedTodo) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, ...updatedTodo } : todo,
    );

    setTodos(updatedTodos);
    saveTodosToLocalStorage(updatedTodos);
  };
  // פונקציות סינון ומיון
  const filteredTodos = todos.filter((todo) => {
    if (filterSelection === "open") {
      return todo.status === "open";
    }
    if (filterSelection === "in-progress") {
      return todo.status === "in-progress";
    }
    if (filterSelection === "completed") {
      return todo.status === "completed";
    }
    return true;
  });

  let sortedTodos = [...filteredTodos];

  if (sortSelection === "priority") {
    sortedTodos.sort((a, b) => {
      const priorityA = sortBy[a.priority];
      const priorityB = sortBy[b.priority];

      return priorityB - priorityA;
    });
  }

  if (sortSelection === "dueDate") {
    sortedTodos.sort((a, b) => {
      if (!a.dueDate && !b.dueDate) {
        return 0;
      }
      if (!a.dueDate) {
        return 1;
      }
      if (!b.dueDate) {
        return -1;
      }
      return new Date(a.dueDate) - new Date(b.dueDate);
    });
  }
  // פונקציות ניהול (הוספת/הסרה) קטגוריות
  const addCategories = (name) => {
    if (!name.trim()) return;
    const newCategory = {
      id: Date.now().toString(),
      title: name.trim(),
    };
    setCategories([...categories, newCategory]);
  };

  const removeCategory = (idToRemove) => {
    if (idToRemove === "general") return;
    const categoryToRemove = categories.find((cat) => cat.id === idToRemove);
    if (!categoryToRemove) return;

    const updatedTodos = todos.map((todo) =>
      todo.category === categoryToRemove.id ||
      todo.category === categoryToRemove.title
        ? { ...todo, category: "⚙️ General" }
        : todo,
    );

    setTodos(updatedTodos);
    saveTodosToLocalStorage(updatedTodos);

    setCategories((prevCategories) =>
      prevCategories.filter((cat) => cat.id !== idToRemove),
    );
  };

  return (
    <div className="todo-app">
      <div className="todo-container">
        <header className="todo-header">
          <div className="header-top-row">
            <Title />
            <WeatherWidget />
          </div>
          <div className="progress-section">
            <DailyProgress todos={todos} />
          </div>
        </header>
        <section className="add-todo-section">
          <AddTodo
            task={task}
            setTask={setTask}
            handleClick={handleClick}
            categories={categories}
          />
        </section>
        <div className="todo-toolbar">
          <FilterToolBar
            setFilterSelection={setFilterSelection}
            filterSelection={filterSelection}
          />
          <SortToolBar
            sortSelection={sortSelection}
            setSortSelection={setSortSelection}
          />
        </div>
        <main className="todo-list-section">
          <TodoList
            categories={categories}
            addCategories={addCategories}
            removeCategory={removeCategory}
            todos={sortedTodos}
            removeTodo={removeTodo}
            toggleComplete={toggleComplete}
            editTodo={editTodo}
          />
        </main>
      </div>
    </div>
  );
}

export default TodoApp;
