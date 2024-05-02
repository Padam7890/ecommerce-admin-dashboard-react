import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../Components/Button";
import TableHeading from "../../Components/Table/TableHeading";
import Table from "../../Components/Table/Table";
import Thead from "../../Components/Table/Thead";
import useLogosList from "../../CustomHook/logolist";
import http from "../../Utils/http";
import { ClipLoader } from "react-spinners";

const Logoindex = () => {
  const { logosList, setLogosList, isLoading, error, fetchLogosList } = useLogosList();
  const [loading, setloading] = useState(false);

  const nav = useNavigate();

  if (isLoading) {
    return <ClipLoader color={"#008000"} size={40} />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleclick = () => {
    nav("/create/logo");
  };

  const deletelogo = async (value) => {
    try {
      setloading(true);
      const res = await http.delete(`/logos/${value}`);
      console.log(res.data.message);
      fetchLogosList();
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
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
        <h2 className="text-2xl font-semibold mb-4">Logo List</h2>
        <Button
          type="button"
          onClick={handleclick}
          className=" bg-green-700 hover:bg-green-900"
        >
          Create Logo
        </Button>
      </div>

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <TableHeading
           items={logosList}
           setItems={setLogosList}
           fetchItemList={fetchLogosList}
           searchfor={"name"}
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
              <th scope="col">Logo name</th>
              <th scope="col">Action</th>
            </tr>
          </Thead>
          <tbody>
            {logosList.map((logo, index) => (
      
              <tr
                key={logo.id}
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td class="w-4 p-4">
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
                  {index + 1 +"."}
                </td>

                <td className="px-4 py-4">{logo.name}</td>
                <td className=" px-4 py-4 flex gap-2 items-center">
                  <NavLink to={`/edit/logo/${logo.id}`}>
                    <Button
                      href="#"
                      className=" bg-green-500  font-light text-center text-xs"
                    >
                      Edit
                    </Button>
                  </NavLink>

                  <Button
                    onClick={() => deletelogo(logo.id)}
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

export default Logoindex;
