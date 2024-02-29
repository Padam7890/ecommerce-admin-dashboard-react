// src/components/Sidebar.jsx
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "./../redux/slice/authSlice";


const Sidebar = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(loginAction());
      navigation("/");
    } else {
      navigation("/login");
    }
  }, []);
  return (
    <div className="bg-gray-800 text-white h-screen w-1/5 p-4">
      <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
      <nav>

        <ul className=" flex flex-col gap-3">
          <li>
            <NavLink
              className={({ isActive }) => {
                return isActive ? " text-green-300" : "";
              }}
              to="/"
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => {
                return isActive ? " text-green-300" : "";
              }}
              to="/products"
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => {
                return isActive ? " text-green-300" : "";
              }}
              to="/categories"
            >
              Category
            </NavLink>
          </li>
          {/* Add more navigation links as needed */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
