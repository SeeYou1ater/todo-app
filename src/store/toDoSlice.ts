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

export const toggleChecked = createAsyncThunk('todos/toggleChecked', 
  async function (id: string, {rejectWithValue, dispatch, getState}: any) {
    const todo = getState().todos.todos.find ( (todo: any) => todo.id === id)
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          completed: !todo.completed
        })
      })
      if (response.ok) {
        dispatch(toggleTodoChecked({id}))
      } else { throw new Error('Cant\'t change checked task!') }
    } catch (error) {
      //@ts-ignore
      return rejectWithValue(error.message)
    }
})

export const addNewTodo = createAsyncThunk('todos/addNewTodo', 
  async function (text: string, {rejectWithValue, dispatch}) {
    try {
      const todo = {
        title: text,
        userId: 1,
        completed: false
      }
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
      })
      if (response.ok) {
        const data = await response.json()
        dispatch(addTodo(data))
      } else { throw new Error('Cant\'t delete task!') }
    } catch (error) {
      //@ts-ignore
      return rejectWithValue(error.message)
    }
})

const setError = (state: IInitialState, action: any) => {
  state.status = 'rejected'
  state.error = action.payload
}

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    todos: [],
    status: null,
    error: null
  } as IInitialState,
  reducers: {
    addTodo(state: IInitialState, action: any) {
      state.todos.push(action.payload)
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
    [fetchTodos.rejected]: setError,
    //@ts-ignore
    [deleteTodo.rejected]: setError,
    //@ts-ignore
    [toggleChecked.rejected]: setError,
  }
})

const { addTodo, removeTodo, toggleTodoChecked } = todoSlice.actions

export default todoSlice.reducer