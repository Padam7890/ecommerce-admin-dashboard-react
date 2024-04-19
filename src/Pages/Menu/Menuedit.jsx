import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../Components/Input";
import Select from "react-select";
import http from "../../Utils/http";
import { ToastContainer, toast } from "react-toastify";
import { initialmenuvalue, menuvalidation } from "./schema";
import Button from "../../Components/Button";

const Menuedit = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const [Menus, setMenus] = useState([]);
  const formik = useFormik({
    initialValues: initialmenuvalue,
    validationSchema: menuvalidation,
    onSubmit: (values) => {
      console.log(values);
      menuupdate(values);
    },
  });

  const menuupdate = async (values) => {
     try {
        const response = await http.put(`/menu/${id}`, values);
        console.log(response);
        toast.success(response.data.message);
        nav("/menu");
        
     } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
     }
  };

  useEffect(() => {
    getallMenus();
    getMenu();
  }, []);

  const getallMenus = async () => {
    try {
      const res = await http.get("/menu");
      const result = res.data.menu;

      setMenus(result);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const getMenu = async () => {
    try {
      const res = await http.get(`/menu/${id}`);
      const data = res.data.menu;
      console.log(res.data.menu);
      formik.setFieldValue("title", data.title);
      formik.setFieldValue("parent_id", data.parent_id);

    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const parentoption = Menus.map((menu) => ({
    value: menu.id,
    label: menu.title,
  }));
//   console.log(parentoption);
  console.log(formik.values.parent_id);
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
            onChange={(parentOption) =>
              formik.setFieldValue(
                "parent_id",
                parentOption ? parentOption.value : ""
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

export default Menuedit;
