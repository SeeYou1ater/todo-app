import { useSelector } from "react-redux"
import { ITodo } from "../App"
import { RootStateType } from "../store"
import ToDoItem from "./ToDoItem"

const ToDoList: React.FC = () => {

  const todos = useSelector( (state: RootStateType) => state.todos.todos )

  return (
    <ul>
      { todos.map( (todo: ITodo) => <ToDoItem id={todo.id} text={todo.text} completed={todo.completed}/>) }
    </ul>
  )
}

export default ToDoList