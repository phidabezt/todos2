import React, { useState } from "react";
import "./index.scss";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TodoList from "./components/TodoList";
import Modal from "../components/Modal";
import TodoSearch from "./components/TodoSearch";
import TodoFilter from "./components/TodoFilter";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoSelected, setTodoSelected] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

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

  const handleFilterStatus = (status) => {
    setFilterStatus(status);
  };

  const handleFilter = (todos) => {
    switch (filterStatus) {
      case "ALL":
        console.log("ALL");
        return todos;
      case "ACTIVE":
        console.log("ACTIVE");
        return todos.filter((todo) => !todo.isCompleted);
      case "COMPLETED":
        console.log("COMPLETED");
        return todos.filter((todo) => todo.isCompleted);
      default:
        return todos;
    }
  };

  const handleRenderTodos = () => {
    const tempTodos = handleSearchTerm();
    return handleFilter(tempTodos);
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
      <TodoFilter handleFilterStatus={handleFilterStatus} />
      <TodoSearch setSearchTerm={setSearchTerm} />
      {searchTerm && handleSearchTerm().length === 0 && (
        <h2 className="search-error">No result was found :(</h2>
      )}

      <TodoList
        todos={handleRenderTodos()}
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
