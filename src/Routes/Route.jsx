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
import Subcategory from "../Pages/Subcategory/Subcategory";
import Createsubcat from "../Pages/Subcategory/Createsubcat";
import Editsubcat from "../Pages/Subcategory/Editsubcat";
import Bannerindex from "../Pages/Banner/Bannerindex";
import Create from "../Pages/Banner/Create";
import Edit from "../Pages/Banner/Edit";
import LogoCreate from "../Pages/Logo/LogoCreate";
import Logoindex from "../Pages/Logo/Logoindex";
import Logoedit from "../Pages/Logo/LogoEdit";


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
      {
        path: "/subcategories",
        element: <Subcategory />,
      },
      {
        path: "/subcategories/create",
        element: <Createsubcat />,
      },
      {
        path: "/subcategories/edit/:id",
        element: <Editsubcat />,
      },
      {
        path: "/banner",
        element: <Bannerindex />,
      },

      {
        path: "/create/banner",
        element: <Create />,
      },

      {
         path: "/logos",
        element: <Logoindex />,
      },

      {
        path: "/edit/banner/:id",
        element: <Edit />,
      },

      {
        path: "/create/logo",
        element: <LogoCreate />,
      },
      
      {
        path: "/edit/logo/:id",
        element: <Logoedit />,
      }

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
