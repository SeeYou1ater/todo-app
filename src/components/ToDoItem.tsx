import { useDispatch } from "react-redux"
import { AppDispatchType } from "../store"
import { removeTodo, toggleTodoChecked } from "../store/toDoSlice"

export interface ITodoItemProps {
  id: string
  text: string
  completed: boolean
}

const ToDoItem: React.FC<ITodoItemProps> = ({id, text, completed}) => {

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
      <span>{text}</span>
      <span className='delete' onClick={removeTask}>&times;</span>
    </li>
  )
}

export default ToDoItem