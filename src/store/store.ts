import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./toDoSlice"

const store = configureStore({
  reducer: { 
    todos: todoReducer,
  }
})

export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch

export default store