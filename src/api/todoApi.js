import axiosClient from './axiosClient'

const todoApi = {
  getAll: params => {
    const url = '/todos'
    return axiosClient.get(url, { params })
  },

  get: id => {
    const url = `/todos/${id}`
    return axiosClient.get(url)
  },

  post: todo => {
    const url = '/todos'
    return axiosClient.post(url, todo)
  },

  delete: id => {
    const url = `/todos/${id}`
    return axiosClient.delete(url)
  },

  put: (id, key, newValue) => {
    const url = `/todos/${id}`
    const newTodo = { [key]: newValue }
    return axiosClient.put(url, newTodo)
  },
}

export default todoApi
