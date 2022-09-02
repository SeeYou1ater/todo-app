import { useDispatch } from "react-redux"
import { AppDispatchType } from "../store"
import { removeTodo, toggleTodoChecked } from "../store/toDoSlice"

export interface ITodoItemProps {
  id: string
  title: string
  completed: boolean
}

const ToDoItem: React.FC<ITodoItemProps> = ({id, title, completed}) => {

  const dispatch: AppDispatchType = useDispatch()

  const toggleTodo = () => {
    dispatch(toggleTodoChecked({id}))
  }

  const removeTask = () => {
    dispatch(removeTodo({id}))
  }

  return (
    <li key={id}>
      <input type="checkbox" checked={completed} onChange={toggleTodo}/>
      <span>{title}</span>
      <span className='delete' onClick={removeTask}>&times;</span>
    </li>
  )
}

export default ToDoItem