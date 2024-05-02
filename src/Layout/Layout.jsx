// src/components/Layout.jsx
import React from "react";
import { Link, Outlet } from "react-router-dom";
import NewSidebar from "./NewSidebar";

const Layout = () => {
  return (
    <div className="flex h-screen font-SantoshiMedium">
      <NewSidebar />
      <div className="flex-1 p-4 bg-[#F1F5F9] overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;