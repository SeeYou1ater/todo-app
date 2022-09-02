import { Http2ServerRequest } from 'http2';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import InputField from './components/InputField';
import ToDoList from './components/ToDoList';
import { AppDispatchType, RootStateType } from './store';
import { addNewTodo, fetchTodos } from './store/toDoSlice';

export interface ITodo {
  id: string
  title: string
  completed: boolean
}

function App() {

  const dispatch: AppDispatchType = useDispatch()
  const { status, error } = useSelector( (state: RootStateType) => state.todos)
  const [title, setText] = useState('')

  useEffect( () => {
    dispatch(fetchTodos())
  }, [dispatch])

  const addTask = () => {
    dispatch(addNewTodo(title))
    setText('')
  }
  
  return (
    <div className="App">
      <InputField title={title} setText={setText} addTodo={addTask}/>
      { status === 'loading' && <h2>Loading...</h2> }
      { error && <h2>An error occured: {error}</h2> } 
      <ToDoList/>
    </div>
  );
}

export default App;
