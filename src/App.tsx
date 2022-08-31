import { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import ToDoList from './components/ToDoList';

export interface ITodo {
  id: string
  text: string
  completed: boolean
}

function App() {

  const [todos, setTodos] = useState<ITodo[]>([])
  const [text, setText] = useState('')

  const addTodo = () => {
    if (text.trim().length) {
      setTodos([
        ...todos, 
        {
        id: new Date().toISOString(),
        text,
        completed: false
        }
      ])
      setText('')
    }
  }

  const removeTodo = (todoId: string) => {
    setTodos(todos.filter( todo => todoId !== todo.id))
  }

  const toggleTodoChecked = (todoId: string) => {
    setTodos(
      todos.map( 
        todo => {
          if (todoId !== todo.id) return todo; 
          return {...todo, completed: !todo.completed} 
        } 
      )
    )
  }
  
  return (
    <div className="App">
      <InputField text={text} setText={setText} addTodo={addTodo}/>
      <ToDoList todos={todos} toggleTodoChecked={toggleTodoChecked} removeTodo={removeTodo}/>
    </div>
  );
}

export default App;
