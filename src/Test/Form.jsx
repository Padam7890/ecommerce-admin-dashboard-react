import axios from "axios";
import { useFormik } from "formik";
import { Input } from "postcss";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { object, string } from "yup";

const Form = () => {
    const {id} = useParams()
    const nav = useNavigate();
  const validationSchema = object({
    name: string().required("Please enter a valid Name"),
    email: string().required("Please enter a valid Email"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email:""
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      const form = FormData();
      form.append('name', values.name)
      form.append('email', values.email)

    },
  });

  const sendApi = async (value) => {
    try {
        const res = await axios.patch(`api/form/${id}`,value)
        console.log(res.data.message);
        toast.success(res.data.message);

        nav('/index')

        
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)

        
    }
    


  }



  return (
    <div>
      <form
        action=""
        onSubmit={formik.handleSubmit}
        className=" flex flex-col max-w-96 ml-4 gap-6 mt-3"
      >
        <input
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          className=" border rounded-sm"
          type="text"
          placeholder="fill the Name"
        />

        <input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          className=" border rounded-sm"
          placeholder="fill the EMail"
        />
        <button className=" bg-blue-200 rounded-md p-2" type="submit">
          Click Me
        </button>
      </form>
    </div>
  );
};

export default Form;
