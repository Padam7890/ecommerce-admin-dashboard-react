import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { object, string } from "yup";
import Input from "../../Components/Input";
import Button from "../../Components/Button";

const CreateCategory = () => {
  const nav = useNavigate();
  const validationScheme = object({
    category_name: string().required("Please enter valid Category name"),
  });

  const formik = useFormik({
    initialValues: {
      category_name: "",
    },
    validationSchema: validationScheme,
    onSubmit: (values) => {
      console.log(values);
      apisendata(values);
    },
  });

  async function apisendata(formdata) {
    try {
      const res = await axios.post(
        "http://localhost:3000/categories",
        formdata
      );
      console.log(res);
      console.log(res.data.message);
      toast.success(res.data.message);
      nav("/categories");
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  }

  return (
    <>
      <ToastContainer />

      <form
        encType="multipart/form-data"
        className=" max-w-md mx-auto"
        onSubmit={formik.handleSubmit}
      >
        <Input
          title="Category Name"
          type="text"
          formik={formik}
          id="category_name"
          name="category_name"
          value={formik.values.category_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Category Name"
        />

        <Button type="submit" className=" mt-5 bg-green-700 hover:bg-green-900">
          Submit
        </Button>
      </form>
    </>
  );
};

export default CreateCategory;
