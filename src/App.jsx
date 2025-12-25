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
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Navbar setShowForm={setShowForm} showForm={showForm} />
        {(todos.length === 0 || showForm || editIndex != null) && <AddEdit />}
        <TodoCard />
      </div>
    </div>
  );
}
export default App;
