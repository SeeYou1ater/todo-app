import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import InputField from './components/InputField';
import ToDoList from './components/ToDoList';
import { AppDispatchType } from './store';
import { addTodo } from './store/toDoSlice';

export interface ITodo {
  id: string
  text: string
  completed: boolean
}

function App() {

  const dispatch: AppDispatchType = useDispatch()
  const [text, setText] = useState('')

  const addTask = () => {
    dispatch(addTodo({text}))
    setText('')
  }
  
  return (
    <div className="App">
      <InputField text={text} setText={setText} addTodo={addTask}/>
      <ToDoList/>
    </div>
  );
}

export default App;
