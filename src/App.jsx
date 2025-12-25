import { useEffect, useState } from "react";
import "./App.css";
import AddEdit from "./components/AddEdit";
import Navbar from "./components/Navbar";
import TodoCard from "./components/TodoCard";
import getDispatch from "./hooks/getDispatch";
import { editId, initializeTodo } from "./slice/todoSlice";
import getTodos from "./hooks/getTodos";
import { useSelector } from "react-redux";
import { initializeTheme } from "./slice/themeSlice";

// Main App Component
function App() {
  const [showForm, setShowForm] = useState(false);
  const dispatch = getDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  useEffect(() => {
    dispatch(initializeTodo());
    dispatch(initializeTheme());
  }, [dispatch]);

  const todos = getTodos();
  const editIndex = useSelector((state) => state.todo.editIndex);

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900"
          : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
      }`}
    >
      <Navbar setShowForm={setShowForm} showForm={showForm} />
      {(todos.length === 0 || showForm || editIndex != null) && <AddEdit />}
      <TodoCard />
    </div>
  );
}

export default App;
