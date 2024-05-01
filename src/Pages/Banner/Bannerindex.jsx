import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Button from "../../Components/Button";
import TableHeading from "../../Components/Table/TableHeading";
import Table from "../../Components/Table/Table";
import Thead from "../../Components/Table/Thead";
import { useNavigate } from "react-router-dom";

import { NavLink } from "react-router-dom";
import useBannerList from "../../CustomHook/bannerList";
import http from "../../Utils/http";
import { ClipLoader } from "react-spinners";

const Bannerindex = () => {
  const { bannerList, isLoading, error, fetchBannerList } = useBannerList();
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();
  const handleclick = () => {
    nav("/create/banner");
  };
  if (isLoading) {
    return <ClipLoader color={"#008000"} size={40} />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const deletebanner = async (value) => {
    try {
      setLoading(true);
      const res = await http.delete(`/banner/${value}`);
      console.log(res.data.message);
      fetchBannerList();
      toast.success(res.data.message)
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" relative w-full h-full">
      <ToastContainer />
      {loading && (
        <div className="bg-slate-800 bg-opacity-40 w-full h-full absolute z-30 top-0 left-0 flex justify-center items-center">
          <ClipLoader color={"#008000"} size={120} />
        </div>
      )}
      <div className=" flex items-center justify-between">
        <h2 className="text-2xl font-semibold mb-4">Banner List</h2>
        <Button
          type="button"
          onClick={handleclick}
          className=" bg-green-700 hover:bg-green-900"
        >
          Create Banner
        </Button>
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
              <th scope="col">Banner name</th>
              <th scope="col">Action</th>
            </tr>
          </Thead>
          <tbody>
            {bannerList.map((item, index) => {
              return (
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

                  <td className="px-4 py-4"> {item.title}</td>
                  <td className=" px-4 py-4 flex gap-2 items-center">
                    <NavLink to={`/edit/banner/${item.id}`}>
                      <Button
                        href="#"
                        className=" bg-green-500  font-light text-center text-xs"
                      >
                        Edit
                      </Button>
                    </NavLink>

                    <Button
                      onClick={() => deletebanner(item.id)}
                      href="#"
                      className=" bg-red-500  font-light text-center text-xs"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Bannerindex;
