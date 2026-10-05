import Button from "../Button/Button";
import "../FilterToolBar/FilterToolBar.css";

function FilterToolBar({ setFilterSelection, filterSelection }) {
  return (
    <div className="filter-toolbar">
      <Button
        text="All"
        className={`filter-btn1 ${filterSelection === "all" ? "active" : ""}`}
        onClick={() => setFilterSelection("all")}
      />
      <Button
        text="Open"
        className={`filter-btn2 ${filterSelection === "open" ? "active" : ""}`}
        onClick={() => setFilterSelection("open")}
      />
      <Button
        text="In Progress"
        className={`filter-btn3 ${filterSelection === "in-progress" ? "active" : ""}`}
        onClick={() => setFilterSelection("in-progress")}
      />
      <Button
        text="Completed"
        className={`filter-btn4 ${filterSelection === "completed" ? "active" : ""}`}
        onClick={() => setFilterSelection("completed")}
      />
    </div>
  );
}

export default FilterToolBar;
