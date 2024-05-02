import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import Button from "../../Components/Button";
import TableHeading from "../../Components/Table/TableHeading";
import Table from "../../Components/Table/Table";
import Thead from "../../Components/Table/Thead";
import { useEffect } from "react";
import axios from "axios";
import useSubcategories from "../../CustomHook/subcategory";
import http from "../../Utils/http";
import { ClipLoader } from "react-spinners";

const Subcategory = () => {
  const nav = useNavigate();

  const {
    subcategory,
    setSubcategories,
    isLoadingSubcategories,
    errorSubcategories,
    fetchSubcategories,
  } = useSubcategories();

  const [loading, setLoading] = useState(false);

  if (isLoadingSubcategories) {
    return <ClipLoader color={"#008000"} size={40} />;
  }

  if (errorSubcategories) {
    return <div>Error: {errorSubcategories.message}</div>;
  }

  const handleButtonClick = () => {
    nav("/subcategories/create");
  };

  async function deleteSubcategory(data) {
    try {
      setLoading(true);
      const res = await http.delete(`/subcategories/${data}`);
      console.log(res.data.message);
      toast.success(res.data.message);
      fetchSubcategories();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  console.log(subcategory);

  return (
    <div className=" relative h-full w-full">
      {loading && (
        <div className="bg-slate-800 bg-opacity-40 w-full h-full absolute z-30 top-0 left-0 flex justify-center items-center">
          <ClipLoader color={"#008000"} size={120} />
        </div>
      )}
      <ToastContainer />
      <div className=" flex items-center justify-between">
        <h2 className="text-2xl font-semibold mb-4">Sub Category List</h2>
        <Button
          type="button"
          onClick={handleButtonClick}
          className=" bg-green-700 hover:bg-green-900"
        >
          Create Sub Category
        </Button>
      </div>

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <TableHeading
          items={subcategory}
          setItems={setSubcategories}
          fetchItemList={fetchSubcategories}
          searchfor={"subcategory_name"}
        />
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
              <th scope="col">Sub Category name</th>
              <th scope="col">By Category</th>
              <th scope="col">Action</th>
            </tr>
          </Thead>
          <tbody>
            {subcategory.map((subcat, index) => (
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-8 p-6">
                  {index + 1 + "."}
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

                <td className="px-4 py-4"> {subcat.subcategory_name}</td>
                <td className=" px-4 py-4 ">{subcat.category.category_name}</td>
                <td className=" px-4 py-4 flex gap-2 items-center">
                  <NavLink to={`/subcategories/edit/${subcat.id}`}>
                    <Button
                      href="#"
                      className=" bg-green-500  font-light text-center text-xs"
                    >
                      Edit
                    </Button>
                  </NavLink>

                  <Button
                    onClick={() => deleteSubcategory(subcat.id)}
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

export default Subcategory;
