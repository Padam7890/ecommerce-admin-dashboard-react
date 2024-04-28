import React, { useEffect } from "react";

import { useFormik } from "formik";
import { number, object, mixed, string } from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useNavigate } from "react-router-dom";
import Select from "react-select";

import Input from "../../Components/Input";
import Button from "../../Components/Button";
import Ckeditiors from "../../Components/Ckeditiors";
import { useState } from "react";
import Image from "../../Components/Image";
import useCategories from "../../CustomHook/categoryList";
import useSubcategories from "../../CustomHook/subcategory";
import { initialValues, validationScheme } from "./schema";
import formdata from "./formdata";
import http from "../../Utils/http";

const EditProduct = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const { categories } = useCategories();
  const { subcategory } = useSubcategories();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getProduct();
  }, []);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationScheme,
    onSubmit: async (values) => {
      console.log(values);
      const data = formdata(values);
      await apisendata(data);
    },
  });

  async function apisendata(data) {
    try {
      const res = await http.put(`/products/${id}`, data);
      console.log(res);
      toast.success(res.data.message);
      nav("/products");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  }

  async function getProduct() {
    try {
      const res = await http.get(`/products/${id}`);
      const productdet = res.data.product;
      console.log(res.data.product, "valuueee");
      formik.setFieldValue("product_title", productdet.product_title);
      formik.setFieldValue(
        "product_description",
        productdet.product_description
      );
      formik.setFieldValue("regular_price", productdet.regular_price);
      formik.setFieldValue("sale_price", productdet.sale_price);
      formik.setFieldValue("category_id", productdet.category_id);
      formik.setFieldValue("subcategory_id", productdet.subcategory_id);
      formik.setFieldValue("product_tags", productdet.product_tags);
      formik.setFieldValue("is_featured", productdet.is_featured);
      formik.setFieldValue("product_hot", productdet.product_hot);
      formik.setFieldValue("product_sku", productdet.product_sku);
      formik.setFieldValue("product_quantity", productdet.product_quantity);
      formik.setFieldValue("product_weight", productdet.product_weight);
      formik.setFieldValue("product_size", productdet.product_size);
      formik.setFieldValue("product_color", productdet.product_color);
      formik.setFieldValue("stock_type", productdet.stock_type);

      // Set product images
      // Set product images
      if (productdet.images && productdet.images.length > 0) {
        const images = productdet.images.map((image) => ({
          id: image.id,
          url: image.imageUrl,
        }));
        formik.setFieldValue("product_image", images);
      }
      if (productdet.ProductTag && productdet.ProductTag.length > 0) {
        const product_tags = productdet.ProductTag.map((tag) => tag.tags.name);
        formik.setFieldValue("product_tags", product_tags.toString());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  console.log(formik.values.product_tags);

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

  console.log(formik.values);

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

        <div className="my-5 flex justify-between ">
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
            checked={formik.values.is_featured}
          />
          <Input
            title="Hot Sale ?"
            formik={formik}
            type="checkbox"
            id="product_hot"
            name="product_hot"
            onChange={formik.handleChange}
            value={formik.values.product_hot}
            onBlur={formik.handleBlur}
            className="items-start"
            checked={formik.values.product_hot}
          />
        </div>

        <Input
          title="Product Image"
          formik={formik}
          multiple
          class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          aria-describedby="product_image"
          onChange={(event) => {
            formik.setFieldValue(
              "product_image",
              Array.from(event.target.files)
            );
          }}
          onBlur={formik.handleBlur}
          // value={formik.values.product_image}
          id="product_image"
          type="file"
          name="product_image"
          accept="image/*"
        />
        <Image imageList={formik.values.product_image} formik={formik} />

        <Button type="submit" className=" mt-5 bg-green-700 hover:bg-green-900">
          Submit
        </Button>
      </form>
    </>
  );
};

export default EditProduct;
