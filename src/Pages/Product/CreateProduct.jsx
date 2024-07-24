import React, { useState } from "react";

import { useFormik } from "formik";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate, useNavigate } from "react-router-dom";

import Input from "../../Components/Input";
import Button from "../../Components/Button";
import Ckeditiors from "../../Components/Ckeditiors";

import { initialValues, validationScheme } from "./schema";
import Select from "react-select";
import formdata from "./formdata";
import useCategories from "../../CustomHook/categoryList";
import useSubcategories from "../../CustomHook/subcategory";
import http from "../../Utils/http";
import { ClipLoader } from "react-spinners";

const CreateProduct = () => {
  const { categories } = useCategories();
  const { subcategory } = useSubcategories();
  const [isLoading, setIsLoading] = useState(false); 

  const nav = useNavigate();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationScheme,
    onSubmit: (values) => {
      console.log(values)
      const data = formdata(values);
      // apisendata(data);
    },
  });

  async function apisendata(data) {
    try {
      setIsLoading(true)
      console.log(data);
      const res = await http.post("/products", data);
      console.log(res);
      toast.success(res.data.message);
      nav("/products");
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
    finally {
      setIsLoading(false);
    }

  }

  console.log(categories);

  const categoryoption = categories.map((category) => ({
    value: category.id,
    label: category.category_name,
  }));

  const subcategoryoption = subcategory
    .filter((subcat) => subcat.category_id === formik.values.category_id)
    .map((subcat) => ({
      value: subcat.id,
      label: subcat.subcategory_name,
    }));

  const stockoptions = [
    {
      value: "In Stock",
      label: "In Stock",
    },
    {
      value: "Out of Stock",
      label: "Out of Stock",
    },
  ];

  console.log(subcategoryoption);

  return (
    <div className=" relative h-full w-full">
      <ToastContainer />
      {isLoading && (
          <div className="w-screen h-screen absolute z-30 top-0 left-0 flex justify-center items-center">
            <ClipLoader  color={"#008000"} size={120} />
          </div>
        )}
      <form
        encType="multipart/form-data"
        class=" max-w-2xl mx-auto w-full "
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
        <div className="mb-5 w-full">
          <Ckeditiors
            title="Product Details"
            formik={formik}
            name="product_description"
            className="h-[300px]"
            placeholder="Product Description"
            
          />
        </div>
        <div class="mb-5 flex gap-4">
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
        </div>

        <div className=" my-5">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Select Category:
          </label>
          <Select
            id="category_id"
            name="category_id"
            options={categoryoption}
            onChange={(selectedOption) =>
              formik.setFieldValue(
                "category_id",
                selectedOption ? selectedOption.value : ""
              )
            }
            value={categoryoption.find(
              (option) => option.value === formik.values.category_id
            )}
            onBlur={formik.handleBlur}
            className="mt-2"
          ></Select>
        </div>

        {subcategory.some(
          (subcat) => subcat.category_id === formik.values.category_id
        ) && (
          <div className=" my-5">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Select Subcategories:
            </label>

            <Select
              id="subcategory_id"
              name="subcategory_id"
              options={subcategoryoption}
              onChange={(selectedOption) =>
                formik.setFieldValue(
                  "subcategory_id",
                  selectedOption ? selectedOption.value : ""
                )
              }
              value={subcategoryoption.find(
                (option) => option.value === formik.values.subcategory_id
              )}
              className="mt-2"
            ></Select>
          </div>
        )}
        <div className="mb-4">
          <Input
            title="Product SKU"
            formik={formik}
            type="number"
            id="product_sku"
            name="product_sku"
            onChange={formik.handleChange}
            value={formik.values.product_sku}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="stock_type"
            className="block text-sm font-medium text-gray-700"
          >
            Stock Type
          </label>
          <Select
            name="stock_type"
            id="stock_type"
            options={stockoptions}
            onChange={(stockoptions) => {
              formik.setFieldValue("stock_type", stockoptions.value);
            }}
            value={stockoptions.find(
              (option) => option.value === formik.values.stock_type
            )}
            className="mt-2"
          >
            <option value="" disabled>
              Select a stock type
            </option>

            {["In Stock", "Out of Stock"].map((stock) => (
              <option key={stock} value={stock}>
                {stock}
              </option>
            ))}
          </Select>
        </div>
        <div className="my-5">
          <Input
            title="Product Tags"
            formik={formik}
            type="text"
            id="product_tags"
            name="product_tags"
            onChange={formik.handleChange}
            value={formik.values.product_tags}
            onBlur={formik.handleBlur}
          />
        </div>

        <Input
          title="Product Image"
          formik={formik}
          multiple
          hidden
          class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          aria-describedby="product_image"
          onChange={(event) => {
            formik.setFieldValue(
              "product_image",
              Array.from(event.target.files)
            );
          }}
          onBlur={formik.handleBlur}
          id="product_image"
          type="file"
          name="product_image"
          accept="image/*"
          required
        />

        <div className="my-5 flex gap-4">
          <Input
            title="Product Quantity"
            formik={formik}
            type="number"
            id="product_quantity"
            name="product_quantity"
            onChange={formik.handleChange}
            value={formik.values.product_quantity}
            onBlur={formik.handleBlur}
          />

          <Input
            title="Product Weight"
            formik={formik}
            type="number"
            id="product_weight"
            name="product_weight"
            onChange={formik.handleChange}
            value={formik.values.product_weight}
            onBlur={formik.handleBlur}
          />
        </div>

        <div className="my-5 flex gap-4"></div>

        <div className="my-5 flex gap-4">
          <Input
            title="Product Color"
            formik={formik}
            type="text"
            id="product_color"
            name="product_color"
            onChange={formik.handleChange}
            value={formik.values.product_color}
            onBlur={formik.handleBlur}
          />

          <Input
            title="Product Size"
            formik={formik}
            type="number"
            id="product_size"
            name="product_size"
            onChange={formik.handleChange}
            value={formik.values.product_size}
            onBlur={formik.handleBlur}
          />
        </div>

        <div className="my-5 flex gap-4  ">
          <Input
            title="Featured ?"
            formik={formik}
            type="checkbox"
            id="is_featured"
            name="is_featured"
            onChange={formik.handleChange}
            value={formik.values.is_featured}
            onBlur={formik.handleBlur}
            className="items-start"
          />
          <Input title="Hot Sale ?" 
          formik={formik}
          type="checkbox"
          id="product_hot"
          name="product_hot"
          onChange={formik.handleChange}
          value={formik.values.product_hot}
          onBlur={formik.handleBlur}
          className="items-start"
           />
        </div>

        <Button type="submit"  className="mt-5 bg-green-700  hover:bg-green-900">
          {isLoading ? 'Submitting... Wait' : 'Submit'} 
        </Button>

      </form>
    </div>
  );
};

export default CreateProduct;
