import React from "react";

import { useFormik } from "formik";
import { number, object, mixed, string } from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate, useNavigate } from "react-router-dom";

import Input from "../../Components/Input";
import Button from "../../Components/Button";
import Ckeditiors from "../../Components/Ckeditiors";
import { useState } from "react";
import { useEffect } from "react";

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');



  useEffect(() => {
    getCategories();
  }, []);

  const nav = useNavigate();
  const validationScheme = object({
    product_title: string().required("Please enter valid product name"),
    product_description: string().required(
      "Please enter valid product description"
    ),
    regular_price: number().required().positive().integer(),
    sale_price: number().positive().integer(),
    product_image: mixed().required("Please enter valid image"),
    category_id: number().required(),
  });

  const formik = useFormik({
    initialValues: {
      product_title: "",
      product_description: "",
      regular_price: "",
      sale_price: "",
      product_image: "",
      category_id: "",
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
      formData.append("category_id", values.category_id);

       apisendata(formData);
    },
  });

  async function apisendata(formdata) {
    try {
      const res = await axios.post("http://localhost:3000/products", formdata);
      console.log(res.data.message);
      toast.success(res.data.message);
      nav("/products");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  async function getCategories() {
    try {
      const res = await axios.get("http://localhost:3000/categories");
      const categoriesData = res.data.categories;
      setCategories(categoriesData);
    } catch (error) {
      console.log(error);
    }
  }
  const handleSearchChange = (event) => {
    const searchTermValue = event.target.value;
    setSearchTerm(searchTermValue);
  };

  const filteredCategories = categories.filter(category =>
    category.category_name.toLowerCase().includes(searchTerm.toLowerCase())
  );



  return (
    <>
      <ToastContainer />

      <form
        encType="multipart/form-data"
        class=" max-w-md mx-auto"
        onSubmit={formik.handleSubmit}
      >
        <Input
          title="Product Name"
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
            title="Product Details"
            formik={formik}
            name="product_description"
            className="h-[300px]"
            placeholder="Product Description"
          />
        </div>
        <div class="mb-5">
          <Input
            title="Regular Price"
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
        <div className=" my-5">
      <label htmlFor="category" className="block text-sm font-medium text-gray-700">
        Select Category:
      </label>
      <input
        type="text"
        placeholder="Search categories..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
      />
      <select
        id="category_id"
        name="category_id"
        onChange={(e) => {
          formik.handleChange(e);
          formik.setFieldValue("category_id", parseInt(e.target.value, 10));
        }}
        value={formik.values.category_id}
        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
      >
        <option value="" disabled>Select a category</option>
        {filteredCategories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.category_name}
          </option>
        ))}
      </select>
    </div>

        <Input
          title="Sale Price"
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
          title="Product Image"
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
