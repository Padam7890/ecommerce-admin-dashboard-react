import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { bannerinitialValues, bannervalidation } from "./schema";
import bannerdata from "./formdata";
import http from "../../Utils/http";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import { ClipLoader } from "react-spinners";

const Edit = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const [loading,setLoading] = useState();

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
      setLoading(true);
      console.log(data);
    //   const res = await http.put(`/banner/${id}`,  data);
      const res = await http.put(`/banner/${id}`, data);
      nav('/banner')
      console.log(res);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
    finally{
      setLoading(false);
    }
  };


  const getBanner = async () => {
    try {
      setLoading(true);
      const res = await http.get(`/banner/${id}`);
      const data = res.data.banner;
      console.log(res.data.banner);
      formik.setFieldValue("id", data.id);
      formik.setFieldValue("imageUrl", data.imageUrl);
      formik.setFieldValue("title", data.title);
      formik.setFieldValue("subtitle", data.subtitle);
      formik.setFieldValue("url", data.url);

    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <div className=" relative w-full h-full">
      <ToastContainer />
      {loading && (
        <div className="bg-slate-800 bg-opacity-40 w-full h-full absolute z-30 top-0 left-0 flex justify-center items-center">
          <ClipLoader color={"#008000"} size={120} />
        </div>
      )}

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
          src={`${formik.values.imageUrl}`}
          alt="product image"
          className="w-[70%]"
        />
      </form>
    </div>
  );
};

export default Edit;
