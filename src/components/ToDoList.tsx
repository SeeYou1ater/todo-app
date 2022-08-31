import { ITodo } from "../App"
import ToDoItem from "./ToDoItem"

interface IProps {
  todos: Array<ITodo>
  toggleTodoChecked: (todoId: string) => void
  removeTodo: (todoId: string) => void
}

const ToDoList:React.FC<IProps> = ({todos, toggleTodoChecked, removeTodo}) => {
  return (
    <ul>
      { todos.map( (todo: ITodo) => <ToDoItem removeTodo={removeTodo} toggleTodoChecked={toggleTodoChecked} id={todo.id} text={todo.text} completed={todo.completed}/>) }
    </ul>
  )
}

export default ToDoList