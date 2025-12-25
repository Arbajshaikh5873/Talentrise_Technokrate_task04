import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import { MdOutlineDownloadDone } from "react-icons/md";
import { MdOutlinePendingActions } from "react-icons/md";
import { MdAddchart } from "react-icons/md";
import getTodos from "../hooks/getTodos";
import getDispatch from "../hooks/getDispatch";
import { addTodo, editId, updateTodo } from "../slice/todoSlice";
import { useSelector } from "react-redux";

// AddEdit Component
function AddEdit() {
  const dispatch = getDispatch();
  const editIndex = useSelector((state) => state.todo.editIndex);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const todos = getTodos();
  const editableTodo = editIndex != null ? todos[editIndex] : null;

  const initialValues = editableTodo
    ? {
        title: editableTodo.title,
        description: editableTodo.description,
        status: editableTodo.status,
        _id: editableTodo._id,
      }
    : {
        title: "",
        description: "",
        status: false,
      };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: yup.object({
      title: yup
        .string()
        .required("Title is required")
        .max(15, "Title should be less than 15 characters"),
      description: yup
        .string()
        .max(100, "Description should be less than 100 characters"),
    }),
    onSubmit: (values, { resetForm }) => {
      if (editIndex != null) {
        dispatch(updateTodo({ ...values }));
        dispatch(editId(null));
      } else {
        dispatch(addTodo({ ...values, _id: Date.now().toString() }));
      }
      resetForm();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    formik.handleSubmit(e);
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 px-4 animate-fadeIn">
      <div
        className={`rounded-xl shadow-2xl p-8 border transition-all duration-300 ${
          darkMode
            ? "bg-gray-800 border-purple-500/50 shadow-purple-500/20"
            : "bg-white border-blue-200 shadow-blue-500/20"
        }`}
      >
        <h2
          className={`text-2xl font-bold mb-6 ${
            darkMode ? "text-purple-300" : "text-gray-800"
          }`}
        >
          {editIndex != null ? "✏️ Edit Todo" : "✨ Create New Todo"}
        </h2>

        <div className="space-y-6">
          {/* Title */}
          <div>
            <label
              className={`block text-sm font-semibold mb-2 ${
                darkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter todo title"
              onChange={formik.handleChange}
              value={formik.values.title}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all duration-200 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
              }`}
            />
            {formik.touched.title && formik.errors.title && (
              <p className="mt-1 text-sm text-red-400 animate-shake">
                {formik.errors.title}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              className={`block text-sm font-semibold mb-2 ${
                darkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Description
            </label>
            <textarea
              name="description"
              placeholder="Enter todo description"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.description}
              rows="4"
              className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-all duration-200 resize-none ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
              }`}
            ></textarea>
            {formik.touched.description && formik.errors.description && (
              <p className="mt-1 text-sm text-red-400 animate-shake">
                {formik.errors.description}
              </p>
            )}
          </div>

          {/* Status Toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() =>
                formik.setFieldValue("status", !formik.values.status)
              }
              className={`flex items-center gap-2 px-5 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                formik.values.status
                  ? darkMode
                    ? "bg-green-600 text-white hover:bg-green-500 shadow-lg shadow-green-500/50"
                    : "bg-green-500 text-white hover:bg-green-600 shadow-lg shadow-green-500/30"
                  : darkMode
                  ? "bg-yellow-600 text-white hover:bg-yellow-500 shadow-lg shadow-yellow-500/50"
                  : "bg-yellow-500 text-white hover:bg-yellow-600 shadow-lg shadow-yellow-500/30"
              }`}
            >
              {formik.values.status ? (
                <>
                  <MdOutlineDownloadDone size={22} />
                  <span>Completed</span>
                </>
              ) : (
                <>
                  <MdOutlinePendingActions size={22} />
                  <span>In Progress</span>
                </>
              )}
            </button>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all shadow-lg transform hover:scale-105 ${
                darkMode
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500 shadow-purple-500/50"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-blue-500/30"
              }`}
            >
              <MdAddchart size={24} />
              <span>{editIndex != null ? "Update Todo" : "Add Todo"}</span>
            </button>

            {editIndex != null && (
              <button
                type="button"
                onClick={() => {
                  dispatch(editId(null));
                  formik.resetForm();
                }}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  darkMode
                    ? "bg-gray-600 text-white hover:bg-gray-500"
                    : "bg-gray-500 text-white hover:bg-gray-600"
                }`}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEdit;
