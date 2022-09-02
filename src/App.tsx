import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import InputField from './components/InputField';
import ToDoList from './components/ToDoList';
import { AppDispatchType } from './store';
import { addTodo, fetchTodos } from './store/toDoSlice';

export interface ITodo {
  id: string
  title: string
  completed: boolean
}

function App() {

  const dispatch: AppDispatchType = useDispatch()
  const [title, setText] = useState('')

  useEffect( () => {
    dispatch(fetchTodos())
  }, [dispatch])

  const addTask = () => {
    dispatch(addTodo({title}))
    setText('')
  }
  
  return (
    <div className="App">
      <InputField title={title} setText={setText} addTodo={addTask}/>
      <ToDoList/>
    </div>
  );
}

export default App;
