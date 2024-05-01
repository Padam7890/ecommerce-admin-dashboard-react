import React, { useState } from "react";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { mixed, number, object, string } from "yup";
import { useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { updatesubcatvalidationScheme } from "./Schema";
import http from "../../Utils/http";
import { ClipLoader } from "react-spinners";

const Editsubcat = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const nav = useNavigate();

  const formik = useFormik({
    initialValues: {
      subcategory_name: "",
      category_id: "",
      image: "",
      imageUrl: "",
    },
    validationSchema: updatesubcatvalidationScheme,
    onSubmit: (values) => {
      console.log(values);
      const formData = new FormData();
      formData.append("subcategory_name", values.subcategory_name);
      formData.append("category_id", values.category_id);
      if (values.image) {
        formData.append("image", values.image);
      }
      formData.append("imageUrl", values.imageUrl);

      apiupdatedata(formData);
    },
  });

  async function apiupdatedata(values) {
    try {
      setIsLoading(true);
      const res = await http.put(`/subcategories/${id}`, values);
      console.log(res);
      console.log(res.data.message);
      nav("/categories");
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getsubcategrories();
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

  async function getsubcategrories() {
    try {
      setIsLoading(true);
      const res = await http.get(`/subcategories/${id}`);
      console.log(res.data.subcat);
      formik.setFieldValue(
        "subcategory_name",
        res.data.subcat.subcategory_name
      );
      formik.setFieldValue("category_id", res.data.subcat.category_id);
      formik.setFieldValue("imageUrl", res.data.subcat.imageUrl);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    finally{
      setIsLoading(false);
    }
  }

  const handleSearchChange = (event) => {
    const searchTermValue = event.target.value;
    setSearchTerm(searchTermValue);
  };

  const filteredCategories = categories.filter((category) =>
    category.category_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // console.log(s);
  return (
    <div className="relative h-full w-full">
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

        <img
          src={`${formik.values.imageUrl}`}
          alt="product image"
          className="w-full"
        />

        <Button type="submit" className=" mt-5 bg-green-700 hover:bg-green-900">
          {isLoading ? "Submitting... Wait" : "Submit"}
        </Button>
      </form>
    </div>
  );
};
export default Editsubcat;
