import React from "react";
import Input from "../../Components/Input";
import { useFormik } from "formik";
import {
  bannerinitialValues,
  bannervalidation,
  createbannervalidation,
} from "./schema";
import bannerdata from "./formdata";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button";
import axios from "axios";
import http from "../../Utils/http";
import { useState } from "react";

const Create = () => {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: bannerinitialValues,
    validationSchema: createbannervalidation,
    onSubmit: (values) => {
      console.log(values);
      const data = bannerdata(values);
      apisendata(data);
    },
  });

  async function apisendata(data) {
    try {
      setIsLoading(true);
      const res = await http.post("/banner", data);
      // console.log(res);
      console.log("hey");
      //   toast.success(res.data.message);
      nav("/banner");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
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
          title="Banner Title"
          type="text"
          formik={formik}
          id="title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Banner Title"
        />

        <Input
          title="Banner Subtitle"
          type="text"
          formik={formik}
          id="subtitle"
          name="subtitle"
          value={formik.values.subtitle}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Banner Subtitle"
        />

        <Input
          title="Banner Url"
          type="text"
          formik={formik}
          id="url"
          name="url"
          value={formik.values.url}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Banner url"
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
        {isLoading ? 'Submitting... Wait' : 'Submit'} 
        </Button>
      </form>
    </>
  );
};

export default Create;
