import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Input from "../../Components/Input";
import Ckeditiors from "../../Components/Ckeditiors";
import Button from "../../Components/Button";
import { createCilentValidation, initialCilentValue } from "./schema";
import http from "../../Utils/http";
import saveClient from "./cilentformdata";

const CreateCilent = () => {
  const nav = useNavigate();

  const formik = useFormik({
    initialValues: initialCilentValue,
    validationSchema: createCilentValidation,
    onSubmit: (values) => {
      console.log(values);
      const data = saveClient(values);
      apisenddata(data);
      // console.log(data);
    },
  });

  const apisenddata = async (value) => {
    try {
      const res = await http.post("/cilents", value);
      console.log(res);
      toast.success(res.data.message);
      // nav("/client");
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
          title="Client Name"
          type="text"
          formik={formik}
          id="clientName"
          name="clientName"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Client Name"
        />
        <Input
          title="Client Image"
          type="file"
          formik={formik}
          id="clientImage"
          name="clientImage"
          onChange={(event) => {
            formik.setFieldValue("clientImage", event.currentTarget.files[0]);
          }}
          accept="image/*"
          onBlur={formik.handleBlur}
        />
        <Input
          title="Client Type"
          type="text"
          formik={formik}
          id="clientType"
          name="clientType"
          value={formik.values.clientType}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Customer, Designer"
        />
        <Input
          title="Client Rating"
          type="text"
          formik={formik}
          id="clientRating"
          name="clientRating"
          value={formik.values.clientRating}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="1,2,3 ..."
        />

        <Ckeditiors
          title="Testimonial"
          formik={formik}
          name="testimonial"
          className="h-[300px]"
          placeholder="Testimonial"
        />

        <Button type="submit" className=" mt-5 bg-green-700 hover:bg-green-900">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CreateCilent;
