import React, { useState, useEffect } from 'react'
import './index.scss'
import Header from '../components/Header'
import Footer from '../components/Footer'
import TodoList from './components/TodoList'
import Modal from '../components/Modal'
import TodoSearch from './components/TodoSearch'
import TodoFilter from './components/TodoFilter'
import _ from 'lodash'
import todoApi from '../api/todoApi'

function App() {
  const [todos, setTodos] = useState([])
  const [todoSelected, setTodoSelected] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('ALL')

  const fetchTodoList = async () => {
    try {
      const response = await todoApi.getAll()
      setTodos(response)
    } catch (error) {
      console.log('Failed to fetch todo list: ', error)
    }
  }

  useEffect(() => {
    fetchTodoList()
  }, [filterStatus])

  const addTodo = async name => {
    const todoObj = {
      id: new Date().getTime(),
      name: name,
      completed: false,
    }

    const postApiMethod = async () => {
      try {
        const response = await todoApi.post(todoObj)
        fetchTodoList()
      } catch (error) {
        console.log('Failed to fetch todo list: ', error)
      }
    }
    postApiMethod()
  }

  const toggleEditTodo = todo => {
    setIsModalOpen(true)
    setTodoSelected(todo)
  }

  const editTodo = newValue => {
    setIsModalOpen(false)
    setTodoSelected()

    const putApiMethod = async () => {
      try {
        const response = await todoApi.put(todoSelected.id, 'name', newValue)
        fetchTodoList()
      } catch (error) {
        console.log('Failed to fetch todo list: ', error)
      }
    }
    putApiMethod()
  }

  const removeTodo = async id => {
    const deleteApiMethod = async () => {
      try {
        const response = await todoApi.delete(id)
        fetchTodoList()
      } catch (error) {
        console.log('Failed to fetch todo list: ', error)
      }
    }
    deleteApiMethod()
  }

  const completeTodo = async id => {
    try {
      const response = await todoApi.get(id)
      const updatedTodo = {
        ...response,
        completed: !response.completed,
      }
      const putApiMethod = async () => {
        try {
          const response = await todoApi.put(
            id,
            'completed',
            updatedTodo.completed
          )
          fetchTodoList()
        } catch (error) {
          console.log('Failed to fetch todo list: ', error)
        }
      }
      putApiMethod()
      fetchTodoList()
    } catch (error) {
      console.log('Failed to fetch todo list: ', error)
    }
  }

  const handleSearchTerm = () => {
    return searchTerm
      ? todos.filter(todo => todo.name.includes(searchTerm))
      : todos
  }

  const debouncedSetSearchTerm = _.debounce(
    nextValue => setSearchTerm(nextValue),
    450
  )

  const handleFilterStatus = status => {
    setFilterStatus(status)
  }

  const handleFilter = todos => {
    switch (filterStatus) {
      case 'ALL':
        return todos
      case 'ACTIVE':
        return todos.filter(todo => !todo.completed)
      case 'COMPLETED':
        return todos.filter(todo => todo.completed)
      default:
        return todos
    }
  }

  const handleRenderTodos = () => {
    const tempTodos = handleSearchTerm()
    return handleFilter(tempTodos)
  }

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
          setIsModalOpen(true)
          setTodoSelected({})
        }}
      >
        <span>+</span>
      </button>
      <Footer number={todos.length} />
    </div>
  )
}

export default App
