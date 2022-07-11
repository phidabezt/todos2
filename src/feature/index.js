import React, { useState, useEffect, useContext } from 'react'
import './index.scss'
import Header from '../components/Header'
import Footer from '../components/Footer'
import TodoList from './components/TodoList'
import Modal from '../components/Modal'
import TodoSearch from './components/TodoSearch'
import TodoFilter from './components/TodoFilter'
import _ from 'lodash'
import todoApi from '../api/todoApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { ThemeContext } from '../theme'

function App() {
  const [todos, setTodos] = useState([])
  const [todoSelected, setTodoSelected] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('ALL')
  const [isLoading, setIsLoading] = useState(false)
  const { theme } = useContext(ThemeContext)

  useEffect(() => {
    const fetchTodoList = async () => {
      try {
        const data = await todoApi.getAll()
        setTodos(data || [])
      } catch (error) {
        console.log('Failed to fetch todo list: ', error)
      }
    }
    fetchTodoList()
  }, [filterStatus])

  const addTodo = async name => {
    const todoObj = {
      id: new Date().getTime(),
      name: name,
      completed: false,
    }

    try {
      await todoApi.addTodo(todoObj)
      const data = await todoApi.getAll()
      setTodos(data || [])
    } catch (error) {
      console.log('Failed to fetch todo list: ', error)
    }
  }

  const toggleEditTodo = todo => {
    setIsModalOpen(true)
    setTodoSelected(todo)
  }

  const editTodo = async newValue => {
    setIsModalOpen(false)
    setTodoSelected()

    try {
      await todoApi.updateTodo(todoSelected.id, 'name', newValue)
      const data = await todoApi.getAll()
      setTodos(data || [])
    } catch (error) {
      console.log('Failed to fetch todo list: ', error)
    }
  }

  const removeTodo = async id => {
    try {
      await todoApi.deleteTodo(id)
      const data = await todoApi.getAll()
      setTodos(data || [])
    } catch (error) {
      console.log('Failed to fetch todo list: ', error)
    }
  }

  const completeTodo = async todo => {
    try {
      setIsLoading(true)
      await todoApi.updateTodo(todo.id, 'completed', !todo.completed)
      const data = await todoApi.getAll()
      setTodos(data || [])
      setIsLoading(false)
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
    <div className={`todo-app ${theme}`}>
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
        loading={isLoading}
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
