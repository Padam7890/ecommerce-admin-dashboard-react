import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import { useFormik } from "formik";
import logocreate from "./formdata";
import http from "../../Utils/http";
import { useNavigate, useParams } from "react-router-dom";
import { logoInitialValues, updateLogoValidation } from "./schema";
const Logoedit = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const formik = useFormik({
    initialValues: logoInitialValues,
    validationSchema: updateLogoValidation,
    onSubmit: (values) => {
      console.log(values);
      const data = logocreate(values);
      apisendata(data);
    },
  });

  const apisendata = async (data) => {
    try {
      const res = await http.put(`/logos/${id}`, data);
      console.log(res);
      toast.success(res.data.message);
      nav('/logos')
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  useEffect(() => {
    getlogo();
  }, []);

  const getlogo = async () => {
    try {
      const res = await http.get(`logos/${id}`);
      const data = res.data.logo;
      console.log(res.data.logo);
      formik.setFieldValue("imageUrl", data.imageUrl);
      formik.setFieldValue("name", data.name);
      formik.setFieldValue("url", data.url);

    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <div>
      <ToastContainer />

      <form
        encType="multipart/form-data"
        className=" max-w-md mx-auto"
        onSubmit={formik.handleSubmit}
      >
        <Input
          title="Logo Name"
          type="text"
          formik={formik}
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Logo Name"
        />

        <Input
          title="Logo Url"
          type="text"
          formik={formik}
          id="url"
          name="url"
          value={formik.values.url}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Logo Url"
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
          className="w-[70%]"
        />

        <Button type="submit" className=" mt-5 bg-green-700 hover:bg-green-900">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Logoedit;
