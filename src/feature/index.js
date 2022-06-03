import React, { useState } from "react";
import "./index.scss";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TodoList from "./components/TodoList";
import Modal from "../components/Modal";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoEdit, setTodoEdit] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addTodo = (name) => {
    const todoObj = {
      id: new Date().getTime(),
      name: name,
      isCompleted: false,
    };

    const newTodos = [...todos, todoObj];
    setTodos(newTodos);
  };

  const toggleEditTodo = (todo) => {
    setIsModalOpen((prev) => (prev = !prev));
    setTodoEdit(todo);
  };

  const editTodo = (newValue) => {
    setTodos((prevTodos) => {
      const newTodos = [...prevTodos];
      const index = newTodos.findIndex((item) => item.id === todoEdit.id);

      if (index < 0) return prevTodos;
      if (newTodos[index].name !== newValue) {
        newTodos[index].name = newValue;
      }
      return newTodos;
    });
    setIsModalOpen((prev) => (prev = !prev));
    setTodoEdit({});
  };

  const removeTodo = (id) => {
    const removedTodos = todos.filter((todo) => todo.id !== id);

    setTodos(removedTodos);
  };

  const completeTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      return {
        ...todo,
        isCompleted: todo.id === id ? !todo.isCompleted : todo.isCompleted,
      };
    });

    setTodos(updatedTodos);
  };

  return (
    <div className="todo-app">
      <Header />
      {isModalOpen && (
        <Modal
          addTodo={addTodo}
          todoEdit={todoEdit}
          editTodo={editTodo}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      <TodoList
        todos={todos}
        removeTodo={removeTodo}
        completeTodo={completeTodo}
        toggleEditTodo={toggleEditTodo}
      />
      <button
        className="btn btn-plus "
        onClick={() => {
          setIsModalOpen((prev) => (prev = !prev));
          setTodoEdit({});
        }}
      >
        <span>+</span>
      </button>

      <Footer todosLength={todos.length} />
    </div>
  );
}

export default App;
// lalala
