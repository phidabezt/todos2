import React, { useState, useEffect } from "react";
import "./index.scss";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TodoList from "./components/TodoList";
import Modal from "../components/Modal";
import TodoSearch from "./components/TodoSearch";
import TodoFilter from "./components/TodoFilter";
import _ from "lodash";
import callApi from "../utils/callApi";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoSelected, setTodoSelected] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");

  useEffect(() => {
    callApi("todos", "GET", null).then((res) => {
      setTodos(res.data);
    });
  }, []);

  const addTodo = async (name) => {
    const todoObj = {
      id: new Date().getTime(),
      name: name,
      completed: false,
    };

    await callApi("todos", "POST", todoObj).then((res) => {
      console.log(res);
    });

    await callApi("todos", "GET", null).then((res) => {
      setTodos(res.data);
    });
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

  const removeTodo = async (id) => {
    const removedTodos = todos.filter((todo) => todo.id !== id);

    await callApi(`todos/${id}`, "DELETE", null).then((res) => {
      console.log(res);
    });

    await callApi("todos", "GET", null).then((res) => {
      setTodos(res.data);
    });

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

  const debouncedSetSearchTerm = _.debounce(
    (nextValue) => setSearchTerm(nextValue),
    300
  );

  const handleFilterStatus = (status) => {
    setFilterStatus(status);
  };

  const handleFilter = (todos) => {
    switch (filterStatus) {
      case "ALL":
        return todos;
      case "ACTIVE":
        return todos.filter((todo) => !todo.isCompleted);
      case "COMPLETED":
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
      <TodoSearch
        setSearchTerm={debouncedSetSearchTerm}
        searchTerm={searchTerm}
      />
      {searchTerm && handleSearchTerm().length === 0 && (
        <h2 className="search-error">No result was found :(</h2>
      )}
      <TodoFilter
        handleFilterStatus={handleFilterStatus}
        filterStatus={filterStatus}
      />

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
