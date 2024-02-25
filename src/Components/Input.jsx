import React from "react";
import { useFormik } from "formik";


const Input = ({ type, formik, id, name, value, onChange, onBlur, className, placeholder ,...props }) => {
  return (
    <div className="mb-5">
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`}
      placeholder={placeholder}
    />
    {formik.touched[name] && formik.errors[name] ? (
      <div className="text-red-500 text-xs mt-2">{formik.errors[name]}</div>
    ) : null}
  </div>
  );
};

export default Input;
