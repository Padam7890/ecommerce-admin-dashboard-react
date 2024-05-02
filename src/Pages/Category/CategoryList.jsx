import React, { useEffect, useState } from "react";
import Button from "../../Components/Button";
import { Navigate, useNavigate } from "react-router-dom";

import axios from "axios";

import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import TableHeading from "../../Components/Table/TableHeading";
import Table from "../../Components/Table/Table";
import Thead from "../../Components/Table/Thead";
import http from "../../Utils/http";
import useCategories from "../../CustomHook/categoryList";
import { ClipLoader } from "react-spinners";
const CategoryList = () => {
  const [category, setCategory] = useState([]);
  const nav = useNavigate();
  const { categories, isLoading, error, fetchCategories } = useCategories();
  const [loading, setLoading ]= useState(false);
  if (isLoading) {
    return <ClipLoader color={"#008000"} size={40} />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleButtonClick = () => {
    nav("/categories/create");
  };

  async function deleteCategory(category) {
    try {
      setLoading(true);
      const res = await http.delete(
        `http://localhost:3000/categories/${category}`
      );
      console.log(res);
      toast.success(res.data.message);
      fetchCategories();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  console.log(category);

  return (
    <div className=" relative w-full h-full">
      {loading && (
        <div className="bg-slate-800 bg-opacity-40 w-full h-full absolute z-30 top-0 left-0 flex justify-center items-center">
          <ClipLoader color={"#008000"} size={120} />
        </div>
      )}
      <ToastContainer />
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
        <TableHeading />
        <Table>
          <Thead>
            <tr>
              <th scope="col" class="p-4">
                {/* <div class="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label for="checkbox-all-search" class="sr-only">
                    checkbox
                  </label>
                </div> */}
                No
              </th>
              <th scope="col">Category name</th>
              <th scope="col">Action</th>
            </tr>
          </Thead>
          <tbody>
            {categories.map((category,index) => (
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-8 p-6">
                  {index + 1 +'.'}
                  
                  {/* <div class="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label for="checkbox-table-search-1" class="sr-only">
                      checkbox
                    </label>
                  </div> */}
                </td>

                <td className="px-4 py-4">{category.category_name}</td>
                <td className=" px-4 py-4 flex gap-2 items-center">
                  <NavLink to={`/categories/edit/${category.id}`}>
                    <Button
                      href="#"
                      className=" bg-green-500  font-light text-center text-xs"
                    >
                      Edit
                    </Button>
                  </NavLink>

                  <Button
                    onClick={() => deleteCategory(category.id)}
                    href="#"
                    className=" bg-red-500  font-light text-center text-xs"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
            
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default CategoryList;
