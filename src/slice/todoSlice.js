import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
  todos: [],
  editIndex: null,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    // Add
    initializeTodo: (state) => {
      const data = localStorage.getItem("todos");
      state.todos = data ? JSON.parse(data) : [];
    },
    addTodo: (state, action) => {
      state.todos.push(action.payload);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },

    // edit
    editTodo: (state, action) => {
      const todoList = state.todos.map((todo) => {
        if (todo._id == action.payload._id) {
          return action.payload;
        }
        return todo;
      });

      state.todos = todoList;
    },

    // delete
    deleteTodo: (state, action) => {
      const todoList = state.todos.filter(
        (todo) => todo._id != action.payload._id
      );
      state.todos = todoList;
    },

    // update status
    updateTodo: (state, action) => {
      state.todos = state.todos.map((todo) => {
        if (todo._id == action.payload._id) {
          return action.payload;
        } else {
          return todo;
        }
      });
    },
    // keep track of edit index
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
