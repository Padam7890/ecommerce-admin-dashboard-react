import React, { useEffect, useState } from "react";
import Button from "../../Components/Button";
import { Navigate, useNavigate } from "react-router-dom";
import Table from "../../Components/Table Components/Table";
import TableHead from "../../Components/Table Components/TableHead";
import TableBody from "../../Components/Table Components/TableBody";
import TableRow from "../../Components/Table Components/TableRow";
import axios from "axios";


import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const CategoryList = () => {
  const [category, setCategory] = useState([]);
  const nav = useNavigate();

  const handleButtonClick = () => {
    nav("/categories/create");
  };

  useEffect(() => {
    apiHandlecategoryList();
  }, []);

  async function apiHandlecategoryList() {
    try {
      const fetch = await axios.get("http://localhost:3000/categories");
      const data = fetch.data.categories;
      setCategory(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteCategory(category) {
    try {
      const res = await axios.delete(
        `http://localhost:3000/categories/${category}`
      );
      console.log(res);
     // setCategory(res.data);
      toast.success("Category Deleted Successfully");
      nav("/categories");
    } catch (error) {
       console.log(error);
       toast.error(error.response.data.message);
    }
  }

  console.log(category);

  return (
    <div>
      <ToastContainer/>
      <div className=" flex items-center justify-between">
        <h2 className="text-2xl font-semibold mb-4">Category List</h2>
        <Button
          type="button"
          onClick={handleButtonClick}
          className=" bg-green-700 hover:bg-green-900"
        >
          Create Category
        </Button>{" "}
      </div>

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div class="pb-4 bg-white dark:bg-gray-900">
          <label for="table-search" class="sr-only">
            Search
          </label>
          <div class="relative mt-1">
            <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              class="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for items"
            />
          </div>
        </div>
        <Table>
          <TableHead>
            <tr>
              <th scope="col">Category name</th>
              <th scope="col">Action</th>
            </tr>
          </TableHead>
          <TableBody>
            {category.map((category) => (
              <TableRow>
                <td>{category.category_name}</td>
                <td>
                  <NavLink to={`/categories/edit/${category.id}`}>
                    <Button
                      href="#"
                      className=" bg-green-500  font-light text-center text-xs"
                    >
                      Edit
                    </Button>
                  </NavLink>

                  <Button
                  onClick={()=>deleteCategory(category.id)}
                      href="#"
                      className=" bg-red-500  font-light text-center text-xs"
                    >
                      Delete
                    </Button>
                </td>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CategoryList;
