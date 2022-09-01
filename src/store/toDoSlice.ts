import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  todos: Array<IAddTodo>
}

interface IAddTodo {
  id: string
  text: string
  completed: boolean
}

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    todos: []
  } as IInitialState,
  reducers: {
    addTodo(state, action) {
      state.todos.push({
        id: new Date().toISOString(),
        text: action.payload.text,
        completed: false
      })
    },
    removeTodo(state, action) {
      state.todos = state.todos.filter(todo => action.payload.id !== todo.id)
    },
    toggleTodoChecked(state, action) {
      state.todos = state.todos.map( todo => { 
        if ( action.payload.id === todo.id) { 
          return {...todo, completed: !todo.completed}
        } else return todo
      })
    }
  }
})

export const { addTodo, removeTodo, toggleTodoChecked } = todoSlice.actions

export default todoSlice.reducer