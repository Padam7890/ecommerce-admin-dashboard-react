import React, { useEffect, useState } from "react";
import { navmenu } from "./Navbar.jsx";
import { NavLink, useNavigate } from "react-router-dom";
import { IoExit } from "react-icons/io5";
import logo from "../assets/logo.png"

const NewSidebar = () => {
  const nav = useNavigate();
  const [role, setRoles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  
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

  function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    nav("/login");
  }

  return (
    <div>

      <aside
        id="separator-sidebar"
        className="h-screen md:w-60 transition-transform translate-x-0 w-20"
        aria-label="Sidebar"
      >
        <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 pl-10 dark:bg-gray-800">
          <ul class="space-y-2 font-medium">
             <div className=" mt-4 mb-5 hidden md:block">
              <img src={logo} alt="" />

             </div>
            {navmenu.map((menu, index) => (
              <li>
                <NavLink
                  to={menu.link}
                  className={({ isActive }) => `
        flex items-center p-2 text-gray-900 rounded-lg dark:text-white group
        ${isActive ? "bg-gray-200" : ""}
    `}
                >
                  <svg
                    class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 20"
                  >
                    {menu.icon}
                  </svg>

                  <span class="flex-1 ms-3 whitespace-nowrap">
                    {menu.title}
                  </span>
                  {/* <span class="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                    Pro
                  </span> */}
                </NavLink>
              </li>
            ))}
          </ul>
          <ul class="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
            <li>
              <NavLink
                onClick={() => logout()}
                className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
              >
                <svg
                  class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 17 20"
                >
                  <IoExit size={20} />
                </svg>
                <span class="ms-3">Log Out</span>
              </NavLink>
            </li>

            {role && role[0]?.name === "admin" && (

            <li>
              <NavLink
                to={"/users"}
                className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
              >
                <svg
                  class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 20"
                >
                  <path d="M16 14V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 0 0 0-2h-1v-2a2 2 0 0 0 2-2ZM4 2h2v12H4V2Zm8 16H3a1 1 0 0 1 0-2h9v2Z" />
                </svg>
                <span class="ms-3"> User Management</span>
              </NavLink>
            </li>
            )}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default NewSidebar;
