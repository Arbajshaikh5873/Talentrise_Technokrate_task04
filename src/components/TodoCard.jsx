import React from "react";
import { useSelector } from "react-redux";
import Todo from "./Todo";
import getTodos from "../hooks/getTodos";

// // TodoCard Component
// function TodoCard() {
//   const todos = getTodos();

//   if (todos.length === 0) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 mt-12">
//         <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-md">
//           <div className="text-6xl mb-4">📝</div>
//           <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
//             No Todos Yet
//           </h3>
//           <p className="text-gray-600 dark:text-gray-300">
//             Click "Add New Todo" to create your first task
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
//         Your Todos ({todos.length})
//       </h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {todos.map((todo, index) => (
//           <Todo key={todo._id} todo={todo} index={index} />
//         ))}
//       </div>
//     </div>
//   );
// }

// TodoCard Component
function TodoCard() {
  const todos = getTodos();
  const darkMode = useSelector((state) => state.theme.darkMode);

  if (todos.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 mt-12">
        <div
          className={`text-center py-16 rounded-xl shadow-md ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="text-6xl mb-4">📝</div>
          <h3
            className={`text-2xl font-bold mb-2 ${
              darkMode ? "text-purple-300" : "text-gray-800"
            }`}
          >
            No Todos Yet
          </h3>
          <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
            Click "Add New Todo" to create your first task
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2
        className={`text-3xl font-bold mb-6 ${
          darkMode ? "text-purple-300" : "text-gray-800"
        }`}
      >
        Your Todos ({todos.length})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {todos.map((todo, index) => (
          <Todo key={todo._id} todo={todo} index={index} />
        ))}
      </div>
    </div>
  );
}

export default TodoCard;
