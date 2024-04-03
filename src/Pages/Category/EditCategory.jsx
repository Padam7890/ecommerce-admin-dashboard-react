import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { mixed, object, string } from "yup";
import Input from "../../Components/Input";
import Button from "../../Components/Button";

const EditCategory = () => {
  const nav = useNavigate();
  const { id } = useParams();

  const validationScheme = object({
    category_name: string().required("Please enter valid Category name"),
    image:mixed().required("Please enter Image")
  });

  useEffect(() => {
    getCategories();
  }, []);

  const formik = useFormik({
    initialValues: {
      category_name: "",
      image:""
    },
    validationSchema: validationScheme,
    onSubmit: (values) => {
      console.log(values);
      const formData = new FormData();
       formData.append("category_name", values.category_name);
       formData.append("image", values.image);
      apisendata(formData);
    },
  });

  async function apisendata(formdata) {
    try {
      const res = await axios.put(`http://localhost:3000/categories/${id}`, formdata);
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
      const res = await axios.get(`http://localhost:3000/categories/${id}`);
      console.log(res.data);
      formik.setFieldValue("category_name", res.data.category.category_name);
      formik.setFieldValue("image", res.data.category.image.url);
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

         <img
            src={`http://localhost:3000${formik.values.image}`}
            alt="product image"
            className="w-full"
          />

        <Button type="submit" className=" mt-5 bg-green-700 hover:bg-green-900">
          Submit
        </Button>
      </form>
    </>
  );
};

export default EditCategory;
