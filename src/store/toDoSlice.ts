import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  todos: Array<IAddTodo>
  status: string | null
  error: string | null
}

interface IAddTodo {
  id: string
  title: string
  completed: boolean
}

export const fetchTodos = createAsyncThunk('todos/fetchTodos', 
  async function(_, {rejectWithValue}) {
    try { 
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
        if (response.ok) {
          const data = await response.json()
          return data
        } else { throw new Error('Something error!') }
    } catch (error) {
      //@ts-ignore
      return rejectWithValue(error.message)
    }  
})

export const deleteTodo = createAsyncThunk('todos/deleteTodos', 
  async function (id: string, {rejectWithValue, dispatch}) {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        dispatch(removeTodo({id}))
      } else { throw new Error('Cant\'t delete task!') }
    } catch (error) {
      //@ts-ignore
      return rejectWithValue(error.message)
    }
})

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    todos: [],
    status: null,
    error: null
  } as IInitialState,
  reducers: {
    addTodo(state: IInitialState, action: any) {
      state.todos.push({
        id: new Date().toISOString(),
        title: action.payload.title,
        completed: false
      })
    },
    removeTodo(state: IInitialState, action: any) {
      state.todos = state.todos.filter(todo => action.payload.id !== todo.id)
    },
    toggleTodoChecked(state: IInitialState, action: any) {
      state.todos = state.todos.map( todo => { 
        if ( action.payload.id === todo.id) { 
          return {...todo, completed: !todo.completed}
        } else return todo
      })
    }
  },
  extraReducers: {
    //@ts-ignore
    [fetchTodos.pending]: (state: IInitialState) => {
      state.status = 'loading'
      state.error = null     
    },
    //@ts-ignore
    [fetchTodos.fulfilled]: (state: IInitialState, action: any) => {
      state.status = 'resolved'
      state.todos = action.payload
    },
    //@ts-ignore
    [fetchTodos.rejected]: (state: IInitialState, action: any) => {
      state.status = 'rejected'
      state.error = action.payload
    },
  }
})

export const { addTodo, removeTodo, toggleTodoChecked } = todoSlice.actions

export default todoSlice.reducer