import { useDispatch } from "react-redux"
import { AppDispatchType } from "../store/store"
import { deleteTodo, toggleChecked } from "../store/toDoSlice"

export interface ITodoItemProps {
  id: string
  title: string
  completed: boolean
}

const ToDoItem: React.FC<ITodoItemProps> = ({id, title, completed}) => {

  const dispatch: AppDispatchType = useDispatch()

  return (
    <li key={id}>
      <input type="checkbox" checked={completed} onChange={() => dispatch(toggleChecked(id))}/>
      <span>{title}</span>
      <span className='delete' onClick={() => { dispatch(deleteTodo(id)) }}>&times;</span>
    </li>
  )
}

export default ToDoItem