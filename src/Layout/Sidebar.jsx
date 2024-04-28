import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import decodeToken from "../Utils/decodetoken";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAction } from "./../redux/slice/authSlice";
import { RxDashboard } from "react-icons/rx";
import { FaShoppingCart, FaUserCog } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { MdDashboardCustomize } from "react-icons/md";
import { TbCategoryPlus } from "react-icons/tb";
import { PiFlagBannerFill } from "react-icons/pi";
import { PiMetaLogoLight } from "react-icons/pi";
import { TbSpeakerphone } from "react-icons/tb";
import { BsMenuButtonWideFill } from "react-icons/bs";
import { MdGroups2 } from "react-icons/md";

import { FaCartShopping } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";

import { IoExit } from "react-icons/io5";
import http from "../Utils/http";

const Sidebar = () => {
  const navigation = useNavigate();
  const [role, setRoles] = useState([]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function showMenu() {
    setIsMenuOpen(!isMenuOpen);
    console.log(isMenuOpen);
  }
  function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigation("/login");
  }

  useEffect(() => {
    fetchuserinfo();
  }, []);

  const fetchuserinfo = async () => {
    try {
      const res = await http.get("/auth/profile");
      setRoles(res.data.user.roles);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={`max-md:block  hidden  absolute  right-10 bottom-0  `}>
        <div className="h-20 w-10 bg-red">
          <MdDashboardCustomize onClick={showMenu} size={30} />
        </div>
      </div>
      <div
        className={`bg-gray-800 hidden md:block  max-md:${
          isMenuOpen ? "block w-1/2" : " hidden "
        } text-white h-screen  p-10 `}
      >
        <h1 className="text-2xl font-semibold mb-4">PDT CMS</h1>

        <nav className="text-xl mt-20 flex flex-col justify-between gap-20">
          <ul className="flex flex-col gap-5">
            <li className="">
              <NavLink
                className={({ isActive }) => {
                  return isActive ? "text-green-300" : "";
                }}
                to="/"
              >
                <div className="inline-flex items-center gap-3">
                  <RxDashboard />
                  Dashboard
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => {
                  return isActive ? "text-green-300" : "";
                }}
                to="/products"
              >
                <div className="inline-flex gap-3 items-center">
                  <FaShoppingCart />
                  Products
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => {
                  return isActive ? "text-green-300" : "";
                }}
                to="/categories"
              >
                <div className="inline-flex items-center gap-3">
                  <MdCategory />
                  Category
                </div>
              </NavLink>
            </li>

            <li>
              <NavLink
                className={({ isActive }) => {
                  return isActive ? "text-green-300" : "";
                }}
                to="/subcategories"
              >
                <div className="inline-flex items-center gap-3">
                  <TbCategoryPlus />
                  Subcategory
                </div>
              </NavLink>
            </li>

            <li>
              <NavLink
                className={({ isActive }) => {
                  return isActive ? "text-green-300" : "";
                }}
                to="/banner"
              >
                <div className="inline-flex items-center gap-3">
                  <PiFlagBannerFill />
                  Banners
                </div>
              </NavLink>
            </li>

            <li>
              <NavLink
                className={({ isActive }) => {
                  return isActive ? "text-green-300" : "";
                }}
                to="/logos"
              >
                <div className="inline-flex items-center gap-3">
                  <PiMetaLogoLight />
                  Logos
                </div>
              </NavLink>
            </li>

            <li>
              <NavLink
                className={({ isActive }) => {
                  return isActive ? "text-green-300" : "";
                }}
                to="/advertisment"
              >
                <div className="inline-flex items-center gap-3">
                  <TbSpeakerphone />
                  Advertisment
                </div>
              </NavLink>
            </li>

            <li>
              <NavLink
                className={({ isActive }) => {
                  return isActive ? "text-green-300" : "";
                }}
                to="/menu"
              >
                <div className="inline-flex items-center gap-3">
                  <BsMenuButtonWideFill />
                  Menus
                </div>
              </NavLink>
            </li>

            <li>
              <NavLink
                className={({ isActive }) => {
                  return isActive ? "text-green-300" : "";
                }}
                to="/order"
              >
                <div className="inline-flex items-center gap-3">
                  <FaCartShopping />
                  Orders
                </div>
              </NavLink>
            </li>

            <li>
              <NavLink
                className={({ isActive }) => {
                  return isActive ? "text-green-300" : "";
                }}
                to="/client"
              >
                <div className="inline-flex items-center gap-3">
                  <MdGroups2 />
                  Cilents
                </div>
              </NavLink>
            </li>

            {role && role[0]?.name === "admin" && (
              <div>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return isActive ? "text-green-300" : "";
                    }}
                    to="/users"
                  >
                    <div className="inline-flex items-center gap-3">
                      <FaUserCog />
                      User Management
                    </div>
                  </NavLink>
                </li>

              </div>
            )}

            <li>
              <NavLink
                className={({ isActive }) => {
                  return isActive ? "text-green-300" : "";
                }}
                to="/profile"
              >
                <div className="inline-flex items-center gap-3">
                  <IoIosSettings />
                  Profile
                </div>
              </NavLink>
            </li>

            {/* Add more navigation links as needed */}
          </ul>
          <div
            onClick={() => logout()}
            className="inline-flex cursor-pointer items-center gap-3"
          >
            <IoExit />
            Logout
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
