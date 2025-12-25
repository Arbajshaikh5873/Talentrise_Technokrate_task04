import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    // Add
    addTodo: (state, action) => {
      state.todos.push(action.payload);
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
        (todo) => todo._id == action.payload._id
      );
      state.todos = todoList;
    },

    // update status
    updateTodo: (state, action) => {},
  },
});

export const { addTodo, editTodo, deleteTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
