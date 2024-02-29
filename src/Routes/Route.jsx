import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import ProductList from "../Pages/Product/ProductList";
import CreateProduct from "../Pages/Product/CreateProduct";
import Login from "../Pages/User/Login";
import SignUp from "../Pages/User/SignUp";
import EditProduct from "../Pages/Product/EditProduct";
import CategoryList from "../Pages/Category/CategoryList";
import CreateCategory from "../Pages/Category/CreateCategory";
import EditCategory from "../Pages/Category/EditCategory";


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
      {
        path: "/product/edit/:id",
        element: <EditProduct />,
      },
      {
        path: "/categories",
        element: <CategoryList />,
      },
      {
        path: "/categories/create/",
        element: <CreateCategory />,
      },
      {
        path: "/categories/edit/:id",
        element: <EditCategory />,
      },
    ],
  },


  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },

  
]);

export { router };
