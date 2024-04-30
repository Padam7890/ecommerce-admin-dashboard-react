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
import Forgetpass from "../Pages/User/Forgetpass";
import Resetpass from "../Pages/User/Resetpass";
import AdCreate from "../Pages/Advertisment/AdCreate";
import AdIndex from "../Pages/Advertisment/AdIndex";
import Adedit from "../Pages/Advertisment/Adedit";
import Menucreate from "../Pages/Menu/Menucreate";
import Menuindex from "../Pages/Menu/Menuindex";
import Menuedit from "../Pages/Menu/Menuedit";
import OrderIndex from "../Pages/Order/OrderIndex";
import CreateCilent from "../Pages/Cilent/CreateCilent";
import IndexCilent from "../Pages/Cilent/IndexCilent";
import Users from "../Pages/User/Users";
import Profile from "../Pages/User/Profile";
import Changepass from "../Pages/User/Changepass";
import CreateUser from "../Pages/User/CreateUser";
import Index from "../Pages/Dashboard/Index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Index />,
      },
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
      },

      {
        path: "/advertisment",
        element: <AdIndex />,
      },

      {
        path: "/advertisment/create",
        element: <AdCreate />,
      },

      {
        path: "/advertisment/edit/:id",
        element: <Adedit />,
      },
      {
        path: "/create/menu",
        element: <Menucreate />,
      },

      {
        path: "/menu",
        element: <Menuindex />,
      },
      {
        path: "/menu/edit/:id",
        element: <Menuedit />,
      },
      {
        path: "/order",
        element: <OrderIndex />,
      },
      {
         path: "/client",
        element: <IndexCilent />,
      },
      {
        path: "/create/cilent",
        element: <CreateCilent />,
      },
      {
        path: "/users",
        element: <Users />,
      },{
        path: "/profile",
        element: <Profile />,
      },{
        path: "/change_password",
        element: <Changepass />,
      },
      {
        path: "/addNewUser",
        element: <CreateUser />,
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
  {
    path: "/forgetpassword",
    element: <Forgetpass />,
  },
  {
    path: "/resetpass",
    element: <Resetpass />,
  },
  {
    path: "/auth/resetpassword/:token",
    element: <Resetpass />,
  },
]);

export { router };
