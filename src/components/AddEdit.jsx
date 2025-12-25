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
  const editableTodo = editIndex+1 ? todos[editIndex] : null;

  const initialValues = editableTodo
    ? {
        title: editableTodo.title,
        description: editableTodo.description,
        status: editableTodo.status,
      }
    : {
        title: "",
        description: "",
        status: false,
      };

  const formik = useFormik({
    initialValues,
    validationSchema: yup.object({
      title: yup
        .string()
        .required()
        .max(15, "title should be less than 15 characters"),
      description: yup
        .string()
        .max(100, "description should be less than 100 characters"),
    }),
    onSubmit: (values) => {
      if (editId) {
        dispatch(updateTodo({ ...values }));
        dispatch(editId(null));
      } else {
        dispatch(addTodo({ ...values, _id: Date.now().toString() }));
      }
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        {/* title */}
        <div>
          <label> enter title : </label>
          <input
            type="text"
            name="title"
            placeholder="enter title"
            onChange={formik.handleChange}
            value={formik.values.title}
            onBlur={formik.handleBlur}
          />
          {formik.touched.title && formik.errors.title && (
            <p>{formik.errors.title}</p>
          )}
        </div>

        {/* description  */}
        <div>
          <label> enter description : </label>

          <textarea
            type="text"
            name="description"
            placeholder="enter description"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.description}
          ></textarea>
          {formik.touched.description && formik.errors.description && (
            <p>{formik.errors.description}</p>
          )}
        </div>

        <div>
          {" "}
          <button>
            {formik.values.status ? (
              <MdOutlineDownloadDone />
            ) : (
              <MdOutlinePendingActions />
            )}
          </button>{" "}
        </div>
        <div>
          <button type="submit">
            <MdAddchart />
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEdit;
