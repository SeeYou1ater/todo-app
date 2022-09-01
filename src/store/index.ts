import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./toDoSlice"

const store = configureStore({
  reducer: { 
    todos: todoReducer,
  }
})

export default store