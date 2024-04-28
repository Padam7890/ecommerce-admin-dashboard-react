import React, { useEffect } from "react";
import { useFormik } from "formik";
import {object, string, ref } from "yup";
import axios from "axios";
import { NavLink } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";

import Input from "../../Components/Input";
import Button from "../../Components/Button";
import http from "../../Utils/http";

const SignUp = () => {
  const navigation = useNavigate();
  const validationScheme = object({
    name: string().required("Please enter your name"),
    email: string().required("Please enter a email"),
    password: string().required("Please enter a password")
    .min(8, "Password must be at least 8 characters long"),
    confirm_password: string().required("Please re-type your password")
   .oneOf([ref("password"), null], "Passwords must match"),

  });

  const formik = useFormik({
    initialValues: {
        name: "",
        email: "",
        password: "",
        confirm_password: "",
    },
    validationSchema: validationScheme,
    onSubmit: (values) => {
      registerUser(values);
    },
  });


  async function registerUser(values) {
    try {
      const res = await http.post("auth/register", values);
      const { accessToken, refreshToken } = res.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      console.log(res);

    } catch (error) {
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign up in to your account
            </h1>
            <ToastContainer/>

            <form
              className="space-y-4 md:space-y-6"
              onSubmit={formik.handleSubmit}
            >
              <div>
                <Input
                  title={"Your Name"}
                  type="text"
                  name="name"
                  id="name"
                  formik={formik}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  placeholder="Ribon"
                />
              </div>

              <div>
                <Input
                  title={"Your Email Address"}
                  type="email"
                  name="email"
                  id="email"
                  formik={formik}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  placeholder="name@company.com"
                />
              </div>
              <div>
                <Input
                  title={"Password"}
                  type="password"
                  name="password"
                  id="password"
                  formik={formik}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  placeholder="••••••••"
                />
              </div>

              <div>
                <Input
                  title={"Confirm Password"}
                  type="password"
                  name="confirm_password"
                  id="confirm_password"
                  formik={formik}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirm_password}
                  placeholder="••••••••"
                />
              </div>

              <Button
                type="submit"
                className=" mt-5 bg-green-700 hover:bg-green-900"
              >
                Sign Up
              </Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Do You Have a Account{" "}

                <NavLink to={'/login'}>
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign In
                </a>
                </NavLink>

              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
