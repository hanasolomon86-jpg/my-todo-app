import "../SortToolBar/SortToolBar.css";

function SortToolBar({ sortSelection, setSortSelection }) {
  return (
    <div className="sort-toolbar">
      <label htmlFor="sort-select">Sort by</label>
      <select
        value={sortSelection}
        onChange={(e) => setSortSelection(e.target.value)}
      >
        <option value="default">Default</option>
        <option value="priority">Priority</option>
        <option value="dueDate">Due Date</option>
      </select>
    </div>
  );
}

export default SortToolBar;
