// src/components/Layout.jsx
import React from "react";
import Sidebar from "./Sidebar";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-4 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;