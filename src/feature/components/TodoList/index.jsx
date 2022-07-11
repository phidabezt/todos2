import React from 'react'
import styles from './TodoList.module.scss'
import TodoItem from '../TodoItem'

function TodoList(props) {
  const { todos, removeTodo, completeTodo, toggleEditTodo, loading } = props

  return (
    <div className={styles['todos']}>
      {loading ? (
        <div className={styles['loader']}></div>
      ) : (
        todos.map(todo => (
          <TodoItem
            todo={todo}
            key={todo.id}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
            toggleEditTodo={toggleEditTodo}
          />
        ))
      )}
      {/* <div className={styles['loader']}></div> */}
    </div>
  )
}

export default TodoList
