import { useFormik } from "formik";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { bannerinitialValues, bannervalidation } from "./schema";
import bannerdata from "./formdata";
import http from "../../Utils/http";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import axios from "axios";

const Edit = () => {
  const nav = useNavigate();
  const { id } = useParams();

  const formik = useFormik({
    initialValues: bannerinitialValues,
    validationSchema: bannervalidation,
    onSubmit: (values) => {
      console.log(values);
      const data = bannerdata(values);
       apisenddata(data);
    },

  });

  useEffect(() => {
    getBanner();
  }, []);

  const apisenddata = async (data) => {
    try {
      console.log(data);
    //   const res = await http.put(`/banner/${id}`,  data);
      const res = await axios.put(`http://localhost:3000/banner/${id}`, data);
      nav('/banner')
      console.log(res);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };


  const getBanner = async () => {
    try {
      const res = await http.get(`http://localhost:3000/banner/${id}`);
      const data = res.data.banner;
      console.log(res.data.banner);
      formik.setFieldValue("id", data.id);
      formik.setFieldValue("imageUrl", data.imageUrl);
      formik.setFieldValue("title", data.title);
      formik.setFieldValue("subtitle", data.subtitle);
      formik.setFieldValue("url", data.url);
    } catch (error) {
      console.log(error);
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
          Submit
        </Button>
     
        <img
          src={`http://localhost:3000${formik.values.imageUrl}`}
          alt="product image"
          className="w-[70%]"
        />
      </form>
    </div>
  );
};

export default Edit;
