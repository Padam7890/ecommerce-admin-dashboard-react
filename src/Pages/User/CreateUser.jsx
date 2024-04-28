import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import { userInitialValue, userValidation } from "./scheme/userscheme";
import { useFormik } from "formik";
import http from "../../Utils/http";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const nav = useNavigate();
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const formik = useFormik({
    initialValues: userInitialValue,
    validationSchema: userValidation,
    onSubmit: (values) => {
      console.log(values);
       addNewuser(values);
    },
  });

  useEffect(() => {
    getroles();
  }, []);

  const addNewuser = async (user) => {
    try {
      const res = await http.post("/auth/addnewuser", user);
      toast.success(res.data.message);
      nav("/users");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const getroles = async () => {
    try {
      const res = await http.get("/auth/roles");
      setRoles(res.data.roles);
    } catch (error) {
      console.log(error);
    }
  };


  const roleoption = roles.map((roles) => ({
    value: roles.id,
    label: roles.name,
  }));




  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create New User
            </h1>
            <ToastContainer />

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
              <div className=" my-5">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Select Roles:
                </label>
                <Select
                  id="roles"
                  name="roles"
                  options={roleoption}
                  onChange={(roleoption) =>
                    formik.setFieldValue(
                      "roles",
                      roleoption ? roleoption.value : ""
                    )
                  }
                  value={roleoption.find(
                    (option) => option.value === formik.values.roles
                  )}
                  onBlur={formik.handleBlur}
                  className="mt-2"
                ></Select>
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
                Add User
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateUser;
