import { useEffect} from 'react'
import { useRequest} from './custom hooks/useRequest'



export function App() {

  const {getRequest, todos, page, title, addTodo, updateTodo, removeTodo, changeTitle, newPage} = useRequest()


  useEffect(() => {
    getRequest()
  }, [page])


  const datatLength = 200
  let pageCount = Math.ceil(datatLength / 20)
  let arr = []

  for (let i = 1; i <= pageCount; i++) {
    arr.push(i)
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
                <input type={"checkbox"} checked={todo.completed} onChange={() => updateTodo(todo.id, todo.completed)} />
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