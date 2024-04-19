import React, { useEffect } from "react";
import { useFormik } from "formik";
import Input from "../../Components/Input";
import Ckeditiors from "../../Components/Ckeditiors";
import Button from "../../Components/Button";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { initialadvalue, updateadvalidation } from "./schema";
import http from "../../Utils/http";
import addata from "./adformdata";

const Adedit = () => {
  const { id } = useParams();
  const nav = useNavigate();

  const formik = useFormik({
    initialValues: initialadvalue,
    validationSchema: updateadvalidation,
    onSubmit: (values) => {
      console.log(values);
      //   const data = addata(values);
       //apisenddata(data);
    },
  });

  const apisenddata = async (data) => {
    try {
      const res = await http.put(`/advertisement/${id}`, data);
      console.log(res);
      nav("/advertisement");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAd();
  }, []);

  const getAd = async () => {
    try {
      const res = await http.get(`advertisement/${id}`);
      const result = res.data.advertisment;
      formik.setFieldValue("Title", result.Title);
      formik.setFieldValue("subtitle", result.subtitle);
      formik.setFieldValue("startTime", result.startTime);
      formik.setFieldValue("endTime", result.endTime);
      formik.setFieldValue("description", result.description);
      formik.setFieldValue("url", result.url);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      {" "}
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
        <img
          src={`http://localhost:3000${formik.values.url}`}
          alt="product image"
          className="w-[70%]"
        />
      </form>
    </div>
  );
};

export default Adedit;