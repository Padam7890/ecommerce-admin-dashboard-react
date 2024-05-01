import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { mixed, object, string } from "yup";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import {
  categoryIntialValue,
  createCategoryValidation,
  updateCategoryValidation,
} from "./Schema";
import saveCategory from "./Formdata";
import http from "../../Utils/http";
import { ClipLoader } from "react-spinners";

const EditCategory = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getCategories();
  }, []);

  const formik = useFormik({
    initialValues: categoryIntialValue,
    validationSchema: updateCategoryValidation,
    onSubmit: (values) => {
      console.log(values);
      const data = saveCategory(values);
      apisendata(data);
      console.log(data);
    },
  });

  async function apisendata(data) {
    try {
      setIsLoading(true);
      const res = await http.put(`/categories/${id}`, data);
      console.log(res);
      console.log(res.data.message);
      toast.success(res.data.message);
      nav("/categories");
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function getCategories() {
    try {
      setIsLoading(true);
      const res = await http.get(`/categories/${id}`);
      console.log(res.data);
      formik.setFieldValue("category_name", res.data.category.category_name);
      formik.setFieldValue("imageUrl", res.data.category.imageUrl);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    finally{
      setIsLoading(false);
    }
  }

  return (
    <>
      <ToastContainer />
      <div className=" relative h-full">
        {isLoading && (
          <div className="bg-slate-800 bg-opacity-40 w-full h-full absolute z-30 top-0 left-0 flex justify-center items-center">
            <ClipLoader color={"#008000"} size={120} />
          </div>
        )}
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

          {formik.values.imageUrl && (
            <img
              src={`${formik.values.imageUrl}`}
              alt="product image"
              className="w-full"
            />
          )}

          <Button
            type="submit"
            className=" mt-5 bg-green-700 hover:bg-green-900"
          >
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default EditCategory;
