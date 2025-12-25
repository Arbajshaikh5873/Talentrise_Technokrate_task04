import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import getDispatch from "../hooks/getDispatch";
import { deleteTodo, editId } from "../slice/todoSlice.js";

function Todo({ todo, index }) {
  const dispatch = getDispatch();
  return (
    <div>
      <div>{todo.title}</div>
      <div>{todo.description}</div>

      <div>
        {/* <button onClick={() => {}}>
          {" "}
          {todo.status ? "done" : "in progress"}{" "}
        </button> */}
        <label> Complete</label>
        <input type="radio" checked={todo.status} name="status" />

        <label> In Progress </label>
        <input type="radio" checked={!todo.status} name="status" />
      </div>

      <div>
        <button
          onClick={() => {
            dispatch(editId(index));
          }}
        >
          <FaRegEdit />
        </button>
        <button onClick={() => dispatch(deleteTodo(todo))}>
          <MdDeleteForever />
        </button>
      </div>
    </div>
  );
}

export default Todo;
