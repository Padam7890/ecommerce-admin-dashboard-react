import React from "react";
import { ToastContainer, toast } from "react-toastify";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { object, ref, string } from "yup";
import http from "../../Utils/http";

const Changepass = () => {
    const nav = useNavigate();
  const formik = useFormik({
    initialValues: {
      old_password: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: object({
      old_password: string().required("Please enter your Old password"),
      password: string()
        .required("Please enter a password")
        .min(8, "Password must be at least 8 characters long"),
      confirm_password: string()
        .required("Please re-type your password")
        .oneOf([ref("password"), null], "Passwords must match"),
    }),
    onSubmit: (values) => {
      console.log(values);
       apisendata(values);
    },
  });

  const apisendata = async (values) => {
    try {
      const res = await http.post("/auth/passwordChanged", values)
      console.log(res.data.message);
      toast.success(res.data.message);
      nav("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);

    }
  };

  return (

    
    <div class="w-full container mx-auto p-6 mt-10 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
      <h2 class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Change Password
      </h2>
      <ToastContainer />
      <form
        class="mt-4 space-y-4 lg:mt-5 md:space-y-5"
        onSubmit={formik.handleSubmit}
      >
        <div>
          <label
            for="old_password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Old Password
          </label>

          <Input
            type="password"
            name="old_password"
            placeholder="••••••••"
            formik={formik}
            id="old_password"
            value={formik.old_password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div>
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            New Password
          </label>
          <Input
            type="password"
            name="password"
            placeholder="••••••••"
            formik={formik}
            id="password"
            value={formik.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div>
          <label
            for="confirm_password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirm Password
          </label>
          <Input
            type="password"
            name="confirm_password"
            placeholder="••••••••"
            formik={formik}
            id="confirm_password"
            value={formik.confirm_password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>

        <Button
          type="submit"
          className="w-full py-3 font-medium text-white bg-green-600 hover:bg-green-500 rounded-lg border-green-500 hover:shadow inline-flex space-x-2 items-center justify-center"
        >
          Reset password
        </Button>
        <p class="text-center">
          Forget Old PassWord ?{" "}
          <NavLink
            to={"/forgetpassword"}
            class="text-indigo-600 font-medium inline-flex space-x-1 items-center"
          >
            <span className=" text-indigo-600">Request New </span>
          </NavLink>
        </p>
      </form>
    </div>
  );
};

export default Changepass;
