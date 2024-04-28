import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { mixed, object, string } from "yup";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import { categoryIntialValue, createCategoryValidation, updateCategoryValidation } from "./Schema";
import saveCategory from "./Formdata";
import http from "../../Utils/http";

const EditCategory = () => {
  const nav = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getCategories();
  }, []);

  const formik = useFormik({
    initialValues: categoryIntialValue,
    validationSchema: updateCategoryValidation,
    onSubmit: (values) => {
       console.log(values);
     const data =  saveCategory(values)
      apisendata(data);
      console.log(data);
    },
  });

  async function apisendata(data) {
    try {
      const res = await http.put(`/categories/${id}`, data);
      console.log(res);
      console.log(res.data.message);
      toast.success(res.data.message);
      nav("/categories");
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  }

  async function getCategories() {
    try {
      const res = await http.get(`/categories/${id}`);
      console.log(res.data);
      formik.setFieldValue("category_name", res.data.category.category_name);
      formik.setFieldValue("imageUrl", res.data.category.imageUrl);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
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

          <Input
        title="Image"
        type="file"
        formik={formik}
        id="image"
        name="image"
        onChange={(event) => {
          formik.setFieldValue("image" , event.currentTarget.files[0]);
        }}       
         accept="image/*"/>
         
         {
          formik.values.imageUrl  &&
          <img
          src={`${formik.values.imageUrl}`}
          alt="product image"
          className="w-full"
        />
         }
       

        <Button type="submit" className=" mt-5 bg-green-700 hover:bg-green-900">
          Submit
        </Button>
      </form>
    </>
  );
};

export default EditCategory;
