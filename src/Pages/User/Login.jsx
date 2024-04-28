import React, { useEffect } from "react";
import { useFormik } from "formik";
import { number, object, mixed, string } from "yup";
import { NavLink } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";

import Input from "../../Components/Input";
import Button from "../../Components/Button";
import http from "../../Utils/http";

const Login = () => {
  const navigation = useNavigate();
  const validationScheme = object({
    email: string().required("Please enter valid email"),
    password: string().required("Please enter valid password"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationScheme,
    onSubmit: (values) => {
      loginUser(values);
    },
  });




  async function loginUser(values) {
    try {
      const res = await http.post("http://localhost:3000/auth/login", values);
      const { accessToken, refreshToken } = res.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      console.log(res);
      navigation("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);


    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={formik.handleSubmit}
            >
              <ToastContainer />
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
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <Input
                      name="remember"
                      formik={formik}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.remember}
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <NavLink
                  to="/forgetpassword"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </NavLink>
              </div>
              <Button
                type="submit"
                className=" mt-5 bg-green-700 hover:bg-green-900"
              >
                Sign In
              </Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <NavLink to={"/register"}>
                  <a
                    href="#"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
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

export default Login;
