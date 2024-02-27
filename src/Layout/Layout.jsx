// src/components/Layout.jsx
import React from "react";
import Sidebar from "./Sidebar";
import { Link, Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Layout = () => {
  return (
    <div className="flex">
      
      <Sidebar />
      <div className="flex-1 p-4">
      <ToastContainer/>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;