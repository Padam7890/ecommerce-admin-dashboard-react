import { useFormik } from "formik";
import React from "react";
import Input from "../../Components/Input";
import Ckeditiors from "../../Components/Ckeditiors";
import Button from "../../Components/Button";
import { createadvalidation, initialadvalue } from "./schema";
import addata from "./adformdata";
import { ToastContainer, toast } from "react-toastify";
import http from "../../Utils/http";
import { useNavigate } from "react-router-dom";

const AdCreate = () => {
    const nav = useNavigate();
  const formik = useFormik({
    initialValues: initialadvalue,
    validationSchema: createadvalidation,
    onSubmit: (values) => {
      console.log(values);
      const data = addata(values);
      apisenddata(data);
    },
  });

  const apisenddata = async (data) => {
    try {
      const res = await http.post(
        "/advertisement",
        data
      );
      console.log(res);
      nav("/advertisment");
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <>
      <ToastContainer />

      <form
        encType="multipart/form-data"
        className=" max-w-md mx-auto"
        onSubmit={formik.handleSubmit}
      >
        <Input
          title="Advertisment Title"
          type="text"
          formik={formik}
          id="Title"
          name="Title"
          value={formik.values.Title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Advertisment Title"
        />

        <Input
          title="Advertisment Subtitle"
          type="text"
          formik={formik}
          id="subtitle"
          name="subtitle"
          value={formik.values.subtitle}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Advertisment Subtitle"
        />

        <Input
          title="Advertisment StartFrom"
          type="datetime-local"
          formik={formik}
          id="startTime"
          name="startTime"
          value={formik.values.startTime}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <Input
          title="Advertisment EndTo"
          type="datetime-local"
          formik={formik}
          id="endTime"
          name="endTime"
          value={formik.values.endTime}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <Ckeditiors
          title="Advertisment Description"
          formik={formik}
          name="description"
          className="h-[300px]"
          placeholder="Advertisment Description"
        />
        <Input
          title="Advertisment Image"
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
    </>
  );
};

export default AdCreate;
