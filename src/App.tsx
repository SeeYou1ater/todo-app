import { useState } from 'react';
import './App.css';

interface ITodo {
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
  
  return (
    <div className="App">
      <label>
        <input type="text" value={text} onChange={ (e) => { setText(e.currentTarget.value) }}/>
        <button onClick={addTodo}>Add todo</button>
      </label>
      <ul>
        {
          todos.map( todo => <li key={todo.id}>
            <input type="checkbox" />
            <span>{todo.text}</span>
            <span style={{color: 'red'}}>&times;</span>
            </li> )
        }
      </ul>
    </div>
  );
}

export default App;
