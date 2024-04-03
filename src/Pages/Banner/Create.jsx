import React from "react";
import Input from "../../Components/Input";
import { useFormik } from "formik";
import { bannerinitialValues, bannervalidation } from "./schema";
import bannerdata from "./formdata";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button";

const Create = () => {
  const nav = useNavigate();

  const formik = useFormik({
    initialValues: bannerinitialValues,
    validationSchema: bannervalidation,
    onSubmit: (values) => {
      const data = bannerdata(values);
      //   apisendata(data);
    },
  });

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
          placeholder="Banner Title"
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
          placeholder="Banner Title"
        />

        <Input
          title="Image"
          type="file"
          formik={formik}
          id="imageUrl"
          name="imageUrl"
          onChange={(event) => {
            formik.setFieldValue("imageUrl", event.currentTarget.files[0]);
          }}
          accept="image/*"
        />

        <Button type="submit" className=" mt-5 bg-green-700 hover:bg-green-900">
          Submit
        </Button>
      </form>
    </>
  );
};

export default Create;
