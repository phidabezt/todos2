import React from "react";
import classes from "./TodoFilter.module.scss";

function TodoFilter(props) {
  const { handleFilterStatus } = props;

  return (
    <nav className={`${classes.filter} filter d-flex justify-content-around`}>
      <button
        name="ALL"
        className={`${classes["filter__btn"]}`}
        onClick={(e) => {
          handleFilterStatus(e.target.name);
        }}
      >
        All
      </button>
      <button
        name="ACTIVE"
        className={`${classes["filter__btn"]}`}
        onClick={(e) => {
          handleFilterStatus(e.target.name);
        }}
      >
        Active
      </button>
      <button
        name="COMPLETED"
        className={`${classes["filter__btn"]}`}
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
