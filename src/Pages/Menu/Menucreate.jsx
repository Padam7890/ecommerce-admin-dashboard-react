import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../Components/Input";
import Select from "react-select";
import http from "../../Utils/http";
import { ToastContainer, toast } from "react-toastify";
import { initialmenuvalue, menuvalidation } from "./schema";
import Button from "../../Components/Button";

const Menucreate = () => {
  const nav = useNavigate();
  const [Menus, setMenus] = useState([]);
  const formik = useFormik({
    initialValues: initialmenuvalue,
    validationSchema: menuvalidation,
    onSubmit: (values) => {
      console.log(values);
      menusend(values);
    },
  });

  const menusend = async (values) => {
    try {
      const response = await http.post("/menu", values);
      console.log(response);
      toast.success(response.data.message);
      nav("/menu");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getMenus();
  }, []);

  const getMenus = async () => {
    try {
      const res = await http.get("/menu");
      const result = res.data.menu;
      setMenus(result);
    } catch (error) {
      console.log(error);
    }
  };

  const parentoption = Menus.map((menu) => ({
    value: menu.id,
    label: menu.title,
  }));
  return (
    <>
      <ToastContainer />

      <form
        encType="multipart/form-data"
        className=" max-w-md mx-auto"
        onSubmit={formik.handleSubmit}
      >
        <Input
          title="Menu Name"
          type="text"
          formik={formik}
          id="title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Menu Name"
        />
        <div className="mt-5">
          <label className=" font-medium" htmlFor="parent_id ">
            Sub Menu{" "}
          </label>

          <Select
            id="parent_id"
            name="parent_id"
            options={parentoption}
            onChange={(parentoption) =>
              formik.setFieldValue(
                "parent_id",
                parentoption ? parentoption.value : ""
              )
            }
            value={parentoption.find(
              (option) => option.value === formik.values.parent_id
            )}
            className="mt-2"
          ></Select>
        </div>
        {/* button */}
        <Button type="submit" className=" mt-5 bg-green-700 hover:bg-green-900">
          Submit
        </Button>
      </form>
    </>
  );
};

export default Menucreate;
