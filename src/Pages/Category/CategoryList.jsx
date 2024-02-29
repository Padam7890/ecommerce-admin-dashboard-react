import React, { useEffect, useState } from "react";
import Button from "../../Components/Button";
import { Navigate, useNavigate } from "react-router-dom";
// import Table from "../../Components/Table Components/Table";
// import TableHead from "../../Components/Table Components/TableHead";
// import TableBody from "../../Components/Table Components/TableBody";
// import TableRow from "../../Components/Table Components/TableRow";
import axios from "axios";


import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import TableHeading from "../../Components/Table/TableHeading";
import Table from "../../Components/Table/Table";
import Thead from "../../Components/Table/Thead";
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
        <TableHeading />
        <Table>
          <Thead>
            <tr>
              <th scope="col" class="p-4">
                <div class="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label for="checkbox-all-search" class="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col">Category name</th>
              <th scope="col">Action</th>
            </tr>
          </Thead>
          <tbody>

          {category.map((category) => (

            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td class="w-4 p-4">
                <div class="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label for="checkbox-table-search-1" class="sr-only">
                    checkbox
                  </label>
                </div>
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
                  onClick={()=>deleteCategory(category.id)}
                      href="#"
                      className=" bg-red-500  font-light text-center text-xs"
                    >
                      Delete
                    </Button>
                </td>

            </tr>
          ))};
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default CategoryList;
