import React from "react";
import styles from "./TodoList.module.scss";
import TodoItem from "../TodoItem";

function TodoList(props) {
  const { todos, removeTodo, completeTodo, toggleEditTodo } = props;

  return (
    <div className={styles["todo__container"]}>
      {todos.map((todo) => (
        <TodoItem
          todo={todo}
          key={todo.id}
          completeTodo={completeTodo}
          removeTodo={removeTodo}
          toggleEditTodo={toggleEditTodo}
        />
      ))}
    </div>
  );
}

export default TodoList;
