import "./DailyProgress.css";

function DailyProgress({ todos }) {
  const completedTasks = todos.filter((todo) => todo.status === "completed");
  const completedCount = completedTasks.length;
  const totalTasks = todos.length;
  const progress =
    totalTasks === 0 ? 0 : Math.round((completedCount / totalTasks) * 100);

  return (
    <div className="daily-progress">
      <h3 className="progress-title">Overall Progress</h3>
      <span className="progress-count">
        {completedCount}/{totalTasks}
      </span>
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="progress-text">{progress}% completed</p>
    </div>
  );
}

export default DailyProgress;
