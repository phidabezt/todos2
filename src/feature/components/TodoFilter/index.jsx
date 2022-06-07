import React from "react";
import classes from "./TodoFilter.module.scss";

function TodoFilter(props) {
  const { handleFilterStatus, filterStatus } = props;

  return (
    <nav className={`${classes.filter} d-flex justify-content-between`}>
      <button
        name="ALL"
        className={`${classes["filter__btn"]} ${
          filterStatus === "ALL" ? classes["active"] : ""
        }`}
        onClick={(e) => {
          handleFilterStatus(e.target.name);
        }}
      >
        All
      </button>
      <button
        name="ACTIVE"
        className={`${classes["filter__btn"]} ${
          filterStatus === "ACTIVE" ? classes["active"] : ""
        }`}
        onClick={(e) => {
          handleFilterStatus(e.target.name);
        }}
      >
        Active
      </button>
      <button
        name="COMPLETED"
        className={`${classes["filter__btn"]} ${
          filterStatus === "COMPLETED" ? classes["active"] : ""
        }`}
        onClick={(e) => {
          handleFilterStatus(e.target.name);
        }}
      >
        Completed
      </button>
    </nav>
  );
}

export default TodoFilter;
