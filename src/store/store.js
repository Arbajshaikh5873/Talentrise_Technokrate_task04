import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../slice/todoSlice.js";
import themeReducer from "../slice/themeSlice.js";
export const store = configureStore({
  reducer: {
    todo: todoReducer,
    theme: themeReducer,
  },
});
