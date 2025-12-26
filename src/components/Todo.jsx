import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import getDispatch from "../hooks/getDispatch";
import { deleteTodo, editId } from "../slice/todoSlice.js";
import { useSelector } from "react-redux";

// Todo Component
function Todo({ todo, index }) {
  const dispatch = getDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div
      className={`rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 p-6 border transform hover:-translate-y-1 ${
        darkMode ? "bg-gray-800 border-gray-700 hover:border-purple-500" : ""
        // bg-white border-gray-200 hover:border-blue-400
      }`}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <h3
            className={`text-xl font-bold mb-2 ${
              darkMode ? "text-purple-300" : "text-gray-800"
            }`}
          >
            {todo.title}
          </h3>
          <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            {todo.description || "No description provided"}
          </p>

          {/* Status Radio Buttons */}
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={todo.status}
                readOnly
                className="w-4 h-4 text-green-600 focus:ring-green-500"
              />
              <span
                className={`text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Complete
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={!todo.status}
                readOnly
                className="w-4 h-4 text-yellow-600 focus:ring-yellow-500"
              />
              <span
                className={`text-sm font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                In Progress
              </span>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => dispatch(editId(index))}
            className={`p-3 rounded-lg transition-all shadow-md hover:shadow-lg transform hover:scale-110 ${
              darkMode
                ? "bg-blue-600 hover:bg-blue-500 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
            aria-label="Edit todo"
          >
            <FaRegEdit size={20} />
          </button>
          <button
            onClick={() => dispatch(deleteTodo(todo))}
            className={`p-3 rounded-lg transition-all shadow-md hover:shadow-lg transform hover:scale-110 ${
              darkMode
                ? "bg-red-600 hover:bg-red-500 text-white"
                : "bg-red-500 hover:bg-red-600 text-white"
            }`}
            aria-label="Delete todo"
          >
            <MdDeleteForever size={20} />
          </button>
        </div>
      </div>

      {/* Status Badge */}
      <div className="mt-4">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            todo.status
              ? darkMode
                ? "bg-green-900/50 text-green-300 border border-green-500/50"
                : "bg-green-100 text-green-800"
              : darkMode
              ? "bg-yellow-900/50 text-yellow-300 border border-yellow-500/50"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {todo.status ? "✓ Completed" : "◷ In Progress"}
        </span>
      </div>
    </div>
  );
}

export default Todo;
