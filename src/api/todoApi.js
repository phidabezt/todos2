import axiosClient from './axiosClient'

const todoApi = {
  getAll: params => {
    const url = '/todos'
    return axiosClient.get(url, { params })
  },

  getById: id => {
    const url = `/todos/${id}`
    return axiosClient.get(url)
  },

  addTodo: todo => {
    const url = '/todos'
    return axiosClient.post(url, todo)
  },

  deleteTodo: id => {
    const url = `/todos/${id}`
    return axiosClient.delete(url)
  },

  updateTodo: (id, key, newValue) => {
    const url = `/todos/${id}`
    const newTodo = { [key]: newValue }
    return axiosClient.put(url, newTodo)
  },
}

export default todoApi
