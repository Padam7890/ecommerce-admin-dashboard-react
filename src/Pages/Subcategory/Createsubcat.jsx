import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { mixed, number, object, string } from "yup";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import { useEffect } from "react";
import axios from "axios";
import { createsubcatvalidationScheme } from "./Schema";
import http from "../../Utils/http";

const Createsubcat = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const nav = useNavigate();

  const formik = useFormik({
    initialValues: {
      subcategory_name: "",
      category_id: "",
      image: "",
    },
    validationSchema: createsubcatvalidationScheme,
    onSubmit: (values) => {
      console.log(values);
      const formData = new FormData();
      formData.append("subcategory_name", values.subcategory_name);
      formData.append("category_id", values.category_id);
      formData.append("image", values.image);
      apisendata(formData);
    },
  });

  async function apisendata(value) {
    try {
      const data = await http.post("/subcategories", value);
      console.log(data);
      console.log(data.data.message);
      nav("/");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  async function getCategories() {
    try {
      const res = await http.get("/categories");
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
    <div>
      <form
        encType="multipart/form-data"
        className=" max-w-md mx-auto"
        onSubmit={formik.handleSubmit}
      >
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
            <option value="" disabled>
              Select a category
            </option>
            {filteredCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category_name}
              </option>
            ))}
          </select>

          {formik.errors.category_id && formik.touched.category_id ? (
            <div className=" text-red-500">{formik.errors.category_id}</div>
          ) : null}
        </div>

        <Input
          title="Sub Category Name"
          type="text"
          formik={formik}
          id="subcategory_name"
          name="subcategory_name"
          value={formik.values.subcategory_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Sub Category Name"
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
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Createsubcat;
