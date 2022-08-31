
export interface ITodoItemProps {
  id: string
  text: string
  completed: boolean
  toggleTodoChecked: (todoId: string) => void
  removeTodo: (todoId: string) => void
}

const ToDoItem: React.FC<ITodoItemProps> = ({id, text, completed, toggleTodoChecked, removeTodo}) => {
  return (
    <li key={id}>
      <input type="checkbox" checked={completed} onChange={() => { toggleTodoChecked(id) } }/>
      <span>{text}</span>
      <span className='delete' onClick={ () => { removeTodo(id) } }>&times;</span>
    </li>
  )
}

export default ToDoItem