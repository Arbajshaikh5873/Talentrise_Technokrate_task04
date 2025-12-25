import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import getDispatch from "../hooks/getDispatch";
import { deleteTodo, editId } from "../slice/todoSlice.js";

function Todo({ todo, index }) {
  const dispatch = getDispatch();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            {todo.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
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
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
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
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                In Progress
              </span>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => dispatch(editId(index))}
            className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all shadow-md hover:shadow-lg transform hover:scale-110"
            aria-label="Edit todo"
          >
            <FaRegEdit size={20} />
          </button>
          <button
            onClick={() => dispatch(deleteTodo(todo))}
            className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all shadow-md hover:shadow-lg transform hover:scale-110"
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
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
          }`}
        >
          {todo.status ? "✓ Completed" : "◷ In Progress"}
        </span>
      </div>
    </div>
  );
}

export default Todo;
