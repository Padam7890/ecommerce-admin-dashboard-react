import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Menucreate from "../Pages/Menu/Menucreate";

const menurouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/Menu",
        element: <Menucreate />,
      },
    ],
  },
]);

export  {menurouter};
