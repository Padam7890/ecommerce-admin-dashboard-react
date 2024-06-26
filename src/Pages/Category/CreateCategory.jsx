import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { mixed, object, string } from "yup";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import { categoryIntialValue, createCategoryValidation } from "./Schema";
import saveCategory from "./Formdata";
import http from "../../Utils/http";
import { ClipLoader } from "react-spinners";

const CreateCategory = () => {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false); 

  const formik = useFormik({
    initialValues: categoryIntialValue,
    validationSchema: createCategoryValidation,
    onSubmit: (values) => {
      console.log(values);
      const data = saveCategory(values);
      apisendata(data);
      console.log(data);
    },
  });

  async function apisendata(formData) {
    try {
      setIsLoading(true);
      const res = await http.post("/categories", formData);
      console.log(res);
      console.log(res.data.message);
      toast.success(res.data.message);
      nav("/categories");
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
    finally{
      setIsLoading(false);
    }
  }

  return (
    <div className=" relative w-full  h-full ">
      <ToastContainer />
      {isLoading && (
          <div className="bg-slate-800 bg-opacity-40 w-full h-full absolute z-30 top-0 left-0 flex justify-center items-center">
            <ClipLoader color={"#008000"} size={120} />
          </div>
        )}


      <form
        encType="multipart/form-data"
        className=" max-w-2xl mx-auto w-full "
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
        <Input
          title="Image"
          type="file"
          formik={formik}
          id="image"
          name="image"
          onChange={(event) => {
            formik.setFieldValue("image", event.currentTarget.files[0]);
          }}
          accept="image/*"
        />

        <Button type="submit" className=" mt-5 bg-green-700 hover:bg-green-900">
        {isLoading ? 'Submitting... Wait' : 'Submit'} 
        </Button>
      </form>
    </div>
  );
};

export default CreateCategory;
