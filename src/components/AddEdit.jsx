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

function AddEdit() {
  const dispatch = getDispatch();
  const editIndex = useSelector((state) => state.todo.editIndex);
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
    <div className="max-w-2xl mx-auto mt-8 px-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          {editIndex != null ? "Edit Todo" : "Create New Todo"}
        </h2>

        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter todo title"
              onChange={formik.handleChange}
              value={formik.values.title}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent outline-none transition-all"
            />
            {formik.touched.title && formik.errors.title && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Enter todo description"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.description}
              rows="4"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent outline-none transition-all resize-none"
            ></textarea>
            {formik.touched.description && formik.errors.description && (
              <p className="mt-1 text-sm text-red-500">
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
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                formik.values.status
                  ? "bg-green-500 text-white"
                  : "bg-yellow-500 text-white"
              }`}
            >
              {formik.values.status ? (
                <>
                  <MdOutlineDownloadDone size={20} />
                  <span>Completed</span>
                </>
              ) : (
                <>
                  <MdOutlinePendingActions size={20} />
                  <span>In Progress</span>
                </>
              )}
            </button>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
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
                className="px-6 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all"
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
