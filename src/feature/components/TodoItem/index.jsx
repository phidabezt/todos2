import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faEdit,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import classes from "./TodoItem.module.scss";

function TodoItem(props) {
  const { todo, completeTodo, toggleEditTodo, removeTodo } = props;

  return (
    <div
      className={
        todo.completed
          ? `${classes.todo} ${classes.completed}`
          : `${classes.todo}`
      }
    >
      <div
        className={`${classes["todo__content"]} d-flex justify-content-between`}
      >
        <div className={`${classes["todo__left"]} d-flex`}>
          <FontAwesomeIcon
            icon={faCheckCircle}
            className={`${
              classes[`todo__check`]
            } fa fa-check d-flex justify-content-around`}
            onClick={() => {
              completeTodo(todo.id);
            }}
          />
          <p className={`${classes["todo__text"]}`}>{todo.name}</p>
        </div>
        <div className={`${classes["todo__right"]}`}>
          <FontAwesomeIcon
            icon={faEdit}
            className={`${classes["todo__edit"]}`}
            onClick={() => {
              toggleEditTodo(todo);
            }}
          />
          <FontAwesomeIcon
            icon={faTrashAlt}
            className={`${classes["todo__remove"]}`}
            onClick={() => {
              removeTodo(todo.id);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
