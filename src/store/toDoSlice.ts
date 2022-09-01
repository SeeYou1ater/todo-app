import { createSlice } from "@reduxjs/toolkit";

interface IAddTodoType {
  id: string
  text: string
  completed: boolean
}

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    todos: [] as Array<IAddTodoType>
  },
  reducers: {
    addTodo(state, action) {
      state.todos.push({
        id: new Date().toISOString(),
        text: action.payload.text,
        completed: false
      })
    },
    removeTodo(state, action) {},
    toggleTodoChecked(state, action) {}
  }
})

export const { addTodo, removeTodo, toggleTodoChecked } = todoSlice.actions

export default todoSlice.reducer