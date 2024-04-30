// src/App.jsx
import React from "react";
import { Route, Router, RouterProvider, Routes } from "react-router-dom";
import { router } from "./Routes/Route";
import { menurouter } from "./Routes/MenuRoute";

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
