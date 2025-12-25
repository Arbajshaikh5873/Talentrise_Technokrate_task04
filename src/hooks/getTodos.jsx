import React, { useMemo } from "react";
import { useSelector } from "react-redux";


function getTodos() {
  const todos = useSelector((state) => state.todo.todos);
  if (todos) {
    console.log(todos);
    return todos;
  }
}
export default getTodos;
