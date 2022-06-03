import React, { useState, useCallback } from "react";
import "./index.scss";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TodoList from "./components/TodoList";
import Modal from "../components/Modal";
import TodoSearch from "./components/TodoSearch";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoSelected, setTodoSelected] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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
    setIsModalOpen(true);
    setTodoSelected(todo);
  };

  const editTodo = (newValue) => {
    setTodos((prevTodos) => {
      const newTodos = [...prevTodos];
      const index = newTodos.findIndex((item) => item.id === todoSelected.id);

      if (index < 0) return prevTodos;
      if (newTodos[index].name !== newValue) {
        newTodos[index].name = newValue;
      }
      return newTodos;
    });
    setIsModalOpen(false);
    setTodoSelected();
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

  const handleSearchTerm = () => {
    return searchTerm
      ? todos.filter((todo) => todo.name.includes(searchTerm))
      : todos;
  };

  return (
    <div className="todo-app">
      <Header />
      {isModalOpen && (
        <Modal
          addTodo={addTodo}
          todoSelected={todoSelected}
          editTodo={editTodo}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      <TodoSearch setSearchTerm={setSearchTerm} />
      <TodoList
        todos={handleSearchTerm()}
        removeTodo={removeTodo}
        completeTodo={completeTodo}
        toggleEditTodo={toggleEditTodo}
      />
      <button
        className="btn btn-plus "
        onClick={() => {
          setIsModalOpen(true);
          setTodoSelected({});
        }}
      >
        <span>+</span>
      </button>
      <Footer number={todos.length} />
    </div>
  );
}

export default App;
