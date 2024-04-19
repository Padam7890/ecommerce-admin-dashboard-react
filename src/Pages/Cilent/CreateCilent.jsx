import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const CreateCilent = () => {
  const nav = useNavigate();

  const formik = useFormik({
    initialValues: "",
    validationSchema: "",
    onSubmit: (values) => {
      console.log(values);
      //    const data =  saveCilent(values)
      // apisendata(data);
      // console.log(data);
    },
  });
  return (
    <div>
      <ToastContainer />

      <form
        encType="multipart/form-data"
        className=" max-w-md mx-auto"
        onSubmit={formik.handleSubmit}
      ></form>
    </div>
  );
};

export default CreateCilent;
