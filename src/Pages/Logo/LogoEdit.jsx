import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import { useFormik } from "formik";
import logocreate from "./formdata";
import http from "../../Utils/http";
import { useNavigate, useParams } from "react-router-dom";
import { logoInitialValues, updateLogoValidation } from "./schema";
import { ClipLoader } from "react-spinners";
const Logoedit = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      const res = await http.put(`/logos/${id}`, data);
      console.log(res);
      toast.success(res.data.message);
      nav('/logos')
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getlogo();
  }, []);

  const getlogo = async () => {
    try {
      setLoading(true);
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
    finally {
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
        className=" max-w-2xl mx-auto w-full "
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
