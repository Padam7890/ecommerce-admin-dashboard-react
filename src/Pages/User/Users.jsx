import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import Button from "../../Components/Button";
import { NavLink, useNavigate } from "react-router-dom";
import TableHeading from "../../Components/Table/TableHeading";
import Table from "../../Components/Table/Table";
import Thead from "../../Components/Table/Thead";
import useUserList from "../../CustomHook/users";
import { ClipLoader } from "react-spinners";

const Users = () => {
  const nav = useNavigate();
  const [permission, setPermission] = useState();

  const { UserList, isLoading, error, fetchUserList } = useUserList();

  if (isLoading) {
    return <ClipLoader color={"#008000"} size={40} />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleButtonClick = () => {
    nav("/addNewUser");
  };

  console.log(permission);
  console.log(UserList);

  return (
    <>
      <div>
        <ToastContainer />
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold mb-4">Users List</h2>
          <Button
            type="button"
            onClick={handleButtonClick}
            className="bg-green-700 hover:bg-green-900"
          >
            Create Users
          </Button>{" "}
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <TableHeading />
          <Table>
            <Thead>
              <tr>
                <th scope="col" className="p-4">
                  {/* <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div> */}
                  No.
                </th>
                <th scope="col">User name</th>
                <th scope="col">User Role</th>
                <th scope="col">User Permission</th>
                <th scope="col">Action</th>
              </tr>
            </Thead>
            <tbody>
              {UserList.map((user, index) => (
                <tr
                  key={user.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="w-4 p-4">
                    {/* <div className="flex items-center">
                      <input
                        id={`checkbox-table-search-${user.id}`}
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor={`checkbox-table-search-${user.id}`}
                        className="sr-only"
                      >
                        checkbox
                      </label>
                    </div> */}
                    {index + 1 + "."}
                  </td>

                  <td className="px-4 py-4">{user.name}</td>
                  <td className="px-4 py-4">
                    {user.roles.map((role) => (
                      <div key={role.id}>{role.name}</div>
                    ))}
                  </td>
                  <td className="px-4 py-4">
                    {user.roles.map((role) => (
                      <div key={role.id}>
                        {role.permissions.map((permission) => (
                          <div key={permission.id}>
                            {permission.Permission.permission}
                          </div>
                        ))}
                      </div>
                    ))}
                  </td>

                  <td className="px-4 py-4 flex gap-2 items-center">
                    <NavLink to={""}>
                      <Button
                        href="#"
                        className="bg-green-500 font-light text-center text-xs"
                      >
                        Edit
                      </Button>
                    </NavLink>

                    <Button
                      onClick={""}
                      href="#"
                      className="bg-red-500 font-light text-center text-xs"
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
    </>
  );
};

export default Users;
