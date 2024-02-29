import React, { useEffect } from "react";

import { useFormik } from "formik";
import { number, object, mixed, string } from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useNavigate } from "react-router-dom";

import Input from "../../Components/Input";
import Button from "../../Components/Button";
import Ckeditiors from "../../Components/Ckeditiors";
import { useState } from "react";

const EditProduct = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getCategories();
  }, []);

  const validationScheme = object({
    product_title: string().required("Please enter valid product name"),
    product_description: string().required(
      "Please enter valid product description"
    ),
    regular_price: number().required().positive().integer(),
    sale_price: number().positive().integer(),
    product_image: mixed(),
    category_id: number().required("Please Enter Category Name"),
  });

  const formik = useFormik({
    initialValues: {
      product_title: "",
      product_description: "",
      regular_price: "",
      sale_price: "",
      product_image: "",
      product_image_old: "",
      category_id: "",
    },
    validationSchema: validationScheme,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const formData = new FormData();
        formData.append("product_title", values.product_title);
        formData.append("product_description", values.product_description);
        formData.append("regular_price", values.regular_price);
        formData.append("sale_price", values.sale_price);
        formData.append("category_id", values.category_id);

        //problem in image uploading default here
        if (values.product_image) {
          formData.append("product_image", values.product_image);
        } else {
          formData.append("product_image", values.product_image_old);
        }
        await apisendata(formData);
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.error || "An error occurred");
      }
    },
  });

  async function apisendata(formdata) {
    try {
      const res = await axios.put(
        `http://localhost:3000/products/${id}`,
        formdata
      );
      console.log(res.data.message);
      toast.success(res.data.message);
      nav("/products");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  }

  useEffect(() => {
    getProduct();
  }, []);


  async function getProduct() {
    try {
      const res = await axios.get(`http://localhost:3000/products/${id}`);
      console.log(res.data.message);
      formik.setFieldValue("product_title", res.data.product.product_title);
      formik.setFieldValue(
        "product_description",
        res.data.product.product_description
      );
      formik.setFieldValue("regular_price", res.data.product.regular_price);
      formik.setFieldValue("sale_price", res.data.product.sale_price);
      // formik.setFieldValue("product_image", res.data.product.product_image);
      formik.setFieldValue("product_image_old", res.data.product.product_image);
      formik.setFieldValue(
        "category_id",
        res.data.product.category.category_id
      );
   
      // Set the old image URL
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

  const filteredCategories = categories.filter((category) =>
    category.category_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log(categories);

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
        <div className=" my-5">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
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

            {/* problem in selected category  */}
            <option value="" disabled>
              Select a category
            </option>

            {filteredCategories.map((category) => (
              <option
                key={category.id}
                value={category.id}
                selected={category.id === formik.values.category_id}
              >
                {category.category_name}
              </option>
            ))}
          </select>
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
        />

        <Input
          title="Product Image Old"
          value={formik.values.product_image_old}
          formik={formik}
          onChange={formik.handleChange}
          class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          aria-describedby="product_image_old"
          onBlur={formik.handleBlur}
          id="product_image_old"
          type="text"
          name="product_image_old"
          readonly
        />

        <div className="image">
          <img
            src={`http://localhost:3000${formik.values.product_image_old.replace(
              "./storage/",
              "/storage/"
            )}`}
            alt="product image"
            className="w-full"
          />
        </div>

        <Button type="submit" className=" mt-5 bg-green-700 hover:bg-green-900">
          Submit
        </Button>
      </form>
    </>
  );
};

export default EditProduct;