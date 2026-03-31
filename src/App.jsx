import { useState, useEffect } from 'react'
import axios from 'axios'

const instance = axios.create({
  baseURL : 'https://jsonplaceholder.typicode.com'
})

export function App() {

  const [title, setTitle] = useState('')
  const [todos, setTodos] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {

    instance.get(`/todos?_limit=20&_page=${page}`)
    .then((res) => setTodos(res.data))
   
  }, [page])

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

  const datatLength = 200
  let pageCount = Math.ceil(datatLength / 20)
  let arr = []

  for (let i = 1; i <= pageCount; i++) {
    arr.push(i)
  }


  const newPage = (p) => {
    setPage(p)
  }

  return (
    <>
      <input value={title} onChange={changeTitle} />
      <button onClick={addTodo}>Add</button>
      {
        arr.map((el) => {
          return <button onClick={() => newPage(el)}
            key={el}>{el}</button>
        })
      }
      <ul>
        {
          todos.map((todo) => {
            return (
              <li key={todo.id}>
                <b>{todo.id}</b>
                <input type={"checkbox"} checked={todo.completed} onChange={() => updateTodo(todo.id, todo.completed)}/>
                <span>{todo.title}</span>
                <button onClick={() => removeTodo(todo.id)}>X</button>
              </li>
            )
          })
        }
      </ul>

    </>
  )
}