import { createSlice } from "@reduxjs/toolkit";

// Theme Slice
const themeSlice = createSlice({
  name: "theme",
  initialState: {
    darkMode: false,
  },
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
    },
    initializeTheme: (state) => {
      const savedTheme = localStorage.getItem("theme");
      state.darkMode = savedTheme === "dark";
    },
  },
});

export const { toggleTheme, initializeTheme } = themeSlice.actions;
export default themeSlice.reducer;
