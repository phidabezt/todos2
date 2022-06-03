import React from "react";
import classes from "./TodoItem.module.scss";

function TodoItem(props) {
  const { todo, completeTodo, toggleEditTodo, removeTodo } = props;

  return (
    <div
      className={
        todo.isCompleted
          ? `${classes.todo__item} ${classes.completed}`
          : `${classes.todo__item}`
      }
    >
      <div
        className={`${classes["todo__item-content"]} d-flex justify-content-between`}
      >
        <div className={`${classes["todo__item-left"]} d-flex`}>
          <i
            className={`${
              classes[`todo__item-check`]
            } fa fa-check d-flex justify-content-around`}
            onClick={() => {
              completeTodo(todo.id);
            }}
          ></i>
          <p className={`${classes["todo__item-text"]}`}>{todo.name}</p>
        </div>
        <div className={`${classes["todo__item-right"]}`}>
          <i
            className="fa fa-edit"
            onClick={() => {
              toggleEditTodo(todo);
            }}
          ></i>
          <i
            className="fa fa-trash-alt"
            onClick={() => {
              removeTodo(todo.id);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
