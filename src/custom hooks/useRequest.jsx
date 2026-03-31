import axios from "axios"
import { useState } from "react"

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
})

export const useRequest = () => {

    const [title, setTitle] = useState('')
    const [todos, setTodos] = useState([])
    const [page, setPage] = useState(1)



    const getRequest = () => {
        instance.get(`/todos?_limit=20&_page=${page}`)
            .then((res) => setTodos(res.data))
    }

    
  const changeTitle = (e) => {
    setTitle(e.target.value)
  }

  const addTodo = () => {

    instance.post('/todos', {title, complated : false})
    .then((res) => setTodos([res.data, ...todos]))
  }

  const removeTodo = (id) => {
   instance.delete(`/todos/${id}`)
   .then((res) => {
    setTodos(todos.filter((todo) => todo.id !== id))
   })
  }

  const updateTodo = (id, completed) => {

    instance.patch(`/todos/${id}`, { completed: !completed })
    .then((res) => {
      setTodos(todos.map((todo) => {
        if(todo.id === id){
          return {...res.data}
        }else {
          return todo
        }
      }))
    })

  }

   const newPage = (p) => {
    setPage(p)
  }

    return {getRequest, changeTitle, addTodo, removeTodo, updateTodo, newPage, title, todos, page }
}