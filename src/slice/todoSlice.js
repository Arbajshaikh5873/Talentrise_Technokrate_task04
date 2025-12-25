import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

// Todo Slice
const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
    editIndex: null,
  },
  reducers: {
    initializeTodo: (state) => {
      const data = localStorage.getItem("todos");
      state.todos = data ? JSON.parse(data) : [];
    },
    addTodo: (state, action) => {
      state.todos.push(action.payload);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    editTodo: (state, action) => {
      const todoList = state.todos.map((todo) => {
        if (todo._id == action.payload._id) {
          return action.payload;
        }
        return todo;
      });
      state.todos = todoList;
    },
    deleteTodo: (state, action) => {
      const todoList = state.todos.filter(
        (todo) => todo._id != action.payload._id
      );
      state.todos = todoList;
      localStorage.setItem("todos", JSON.stringify(todoList));
    },
    updateTodo: (state, action) => {
      state.todos = state.todos.map((todo) => {
        if (todo._id == action.payload._id) {
          return action.payload;
        } else {
          return todo;
        }
      });
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    editId: (state, action) => {
      state.editIndex = action.payload;
    },
  },
});

export const {
  addTodo,
  editTodo,
  deleteTodo,
  updateTodo,
  editId,
  initializeTodo,
} = todoSlice.actions;

export default todoSlice.reducer;
