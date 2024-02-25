import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import ProductList from "../Pages/Product/ProductList";
import CreateProduct from "../Pages/Product/CreateProduct";
import Login from "../Pages/User/Login";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/products",
        element: <ProductList />,
      },

      {
        path: "/product/create",
        element: <CreateProduct />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export { router };
