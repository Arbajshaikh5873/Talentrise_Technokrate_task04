import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import { MdOutlineDownloadDone } from "react-icons/md";
import { MdOutlinePendingActions } from "react-icons/md";
import { MdAddchart } from "react-icons/md";

function AddEdit() {
  const formik = useFormik({
    initialValues: {
      titile: "",
      description: "",
      status: false,
    },
    validationSchema: yup.object({
      titile: yup
        .string()
        .required()
        .max(15, "title should be less than 15 characters"),
      description: yup
        .string()
        .max(100, "description should be less than 100 characters"),
    }),
    onSubmit: (values) => {
      "";
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label> enter name : </label>
          <input
            type="text"
            placeholder="enter title"
            onChange={formik.handleChange}
            value={formik.values.titile}
          />
          {formik.touched.titile && formik.errors.titile && (
            <p>{formik.errors.titile}</p>
          )}
        </div>
        <div>
          <label> enter description : </label>

          <textarea
            type="text"
            placeholder="enter description"
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
            {formik.status ? (
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
