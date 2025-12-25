import { useEffect, useState } from "react";
import "./App.css";
import AddEdit from "./components/AddEdit";
import Navbar from "./components/Navbar";
import TodoCard from "./components/TodoCard";
import getDispatch from "./hooks/getDispatch";
import { editId, initializeTodo } from "./slice/todoSlice";
import getTodos from "./hooks/getTodos";
import { useSelector } from "react-redux";

function App() {
  const [showForm, setShowForm] = useState(false);
  const dispatch = getDispatch();
  useEffect(() => {
    dispatch(initializeTodo());
  }, []);

  const todos = getTodos();
  const editId = useSelector((state) => state.todo.editIndex);

  return (
    <>
      <Navbar setShowForm={setShowForm} showForm={showForm} />
      {(!todos || showForm || editId != null) && <AddEdit />}
      <TodoCard />
    </>
  );
}

export default App;
