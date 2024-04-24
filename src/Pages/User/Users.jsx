import React from "react";
import { ToastContainer } from "react-toastify";
import Button from "../../Components/Button";
import { NavLink, useNavigate } from "react-router-dom";
import TableHeading from "../../Components/Table/TableHeading";
import Table from "../../Components/Table/Table";
import Thead from "../../Components/Table/Thead";
import useUserList from "../../CustomHook/users";

const Users = () => {
  const nav = useNavigate();

  const { UserList, isLoading, error, fetchUserList } = useUserList();

  const handleButtonClick = () => {
    nav("");
  };

  console.log(UserList);
  return (
    <>
      <div>
        <ToastContainer />
        <div className=" flex items-center justify-between">
          <h2 className="text-2xl font-semibold mb-4">Users List</h2>
          {}
          <Button
            type="button"
            onClick={handleButtonClick}
            className=" bg-green-700 hover:bg-green-900"
          >
            Create Users
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
                <th scope="col">User name</th>
                <th scope="col">User Role</th>

                <th scope="col">Action</th>
              </tr>
            </Thead>
            <tbody>
              {UserList.map((user, index) => {
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

                    <td className="px-4 py-4">{user.name}</td>
                    {user.roles.map((role) => (
                      <td className="px-4 py-4">{role.name}</td>
                    ))}

                    <td className=" px-4 py-4 flex gap-2 items-center">
                      
                      <NavLink to={""}>
                        <Button
                          href="#"
                          className=" bg-green-500  font-light text-center text-xs"
                        >
                          Edit
                        </Button>
                      </NavLink>

                      <Button
                        onClick={""}
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
    </>
  );
};

export default Users;
