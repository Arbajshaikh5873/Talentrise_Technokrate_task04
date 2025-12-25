import React from "react";
import { useSelector } from "react-redux";
import Todo from "./Todo";
import getTodos from "../hooks/getTodos";

function TodoCard() {
  const todos = getTodos();

  return (
    <div>
      {todos.map((todo, index) => (
        <Todo todo={todo} index={index} />
      ))}
    </div>
  );
}

export default TodoCard;
