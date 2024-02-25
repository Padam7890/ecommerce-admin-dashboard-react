import React from "react";

import { useFormik } from "formik";
import { number, object, mixed, string } from "yup";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Input from "../../Components/Input";
import Button from "../../Components/Button";
import Ckeditiors from "../../Components/Ckeditiors";


const CreateProduct = () => {
  const validationScheme = object({
    product_title: string().required("Please enter valid product name"),
    product_description: string().required(
      "Please enter valid product description"
    ),
    regular_price: number().required().positive().integer(),
    sale_price: number().required().positive().integer(),
    product_image: mixed().required("Please enter valid image"),
  });

  const formik = useFormik({
    initialValues: {
      product_title: "",
      product_description: "",
      regular_price: "",
      sale_price: "",
      product_image: "",
    },
    validationSchema: validationScheme,
    onSubmit: (values) => {
      console.log(values);
      const formData = new FormData();
      formData.append("product_title", values.product_title);
      formData.append("product_description", values.product_description);
      formData.append("regular_price", values.regular_price);
      formData.append("sale_price", values.sale_price);
      formData.append("product_image", values.product_image);
      apisendata(formData);
    },
  });

  
  async function apisendata(formdata){
    try {
      const res = await axios.post("http://localhost:3000/products", formdata);
      console.log(res.data.message);
      toast.success(res.data.message);
      
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  return (
    <>
      <form
        encType="multipart/form-data"
        class=" max-w-md mx-auto"
        onSubmit={formik.handleSubmit}
      >
         <ToastContainer />
        <Input
          type="text"
          formik={formik}
          id="product_title"
          name="product_title"
          value={formik.values.product_title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Product Title"
        />
        <div className="mb-5">
          <Ckeditiors
            formik={formik}
            name="product_description"
            className="h-[300px]"
            placeholder="Product Description"
          />
        </div>
        <div class="mb-5">
          <Input
            formik={formik}
            type="number"
            id="regular_price"
            name="regular_price"
            onChange={formik.handleChange}
            value={formik.values.regular_price}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Regular Price"
          />
        </div>

        <Input
          formik={formik}
          type="number"
          id="sale_price"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.sale_price}
          name="sale_price"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Regular Price"
        />

        <Input
          formik={formik}
          class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          aria-describedby="product_image"
          onChange={(event) => {
            formik.setFieldValue("product_image", event.currentTarget.files[0]);
          }}
          onBlur={formik.handleBlur}
          id="product_image"
          type="file"
          name="product_image"
          accept="image/*"
          required
        />

        <Button type="submit" className=" mt-5 bg-green-700 hover:bg-green-900">
          Submit
        </Button>
      </form>
    </>
  );
};

export default CreateProduct;
