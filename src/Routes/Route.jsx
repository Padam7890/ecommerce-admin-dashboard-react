import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import ProductList from "../Pages/Product/ProductList";
import CreateProduct from "../Pages/Product/CreateProduct";

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
]);

export { router };
