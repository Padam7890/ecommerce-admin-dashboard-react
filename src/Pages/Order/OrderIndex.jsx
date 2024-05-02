import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Button from "../../Components/Button";
import { NavLink, useNavigate } from "react-router-dom";
import TableHeading from "../../Components/Table/TableHeading";
import Table from "../../Components/Table/Table";
import Thead from "../../Components/Table/Thead";
import useOrderList from "../../CustomHook/order";
import http from "../../Utils/http";
import { ClipLoader } from "react-spinners";

const OrderIndex = () => {
  const { orderList, isLoading, error, fetchOrderList } = useOrderList();
  const [loading, setLoading] = useState(false);

  if (isLoading) {
    return <ClipLoader color={"#008000"} size={40} />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  console.log(orderList);

  const deleteOrder = async (id) => {
    try {
      setLoading(true);
      const res = await http.delete(`/order/${id}`);
      console.log(res.data.message);
      fetchOrderList();
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    setLoading(false);
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
        <h2 className="text-2xl font-semibold mb-4">Order List</h2>
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
              <th scope="col">Order Id</th>
              <th scope="col">Customer Name</th>
              <th scope="col">Order Date</th>
              <th scope="col">Total Amount</th>
              <th scope="col">Billing address</th>
              <th scope="col">Action</th>
            </tr>
          </Thead>
          <tbody>
            {orderList.map((item,index) => (
              <tr key={item.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-8 p-8">
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
                  {index + 1 + "."}
                </td>

                <td className="px-4 py-4"> {item.id}</td>
                <td className="px-4 py-4"> {item.user.name}</td>
                <td className="px-4 py-4"> {Date(item.createdAt)}</td>
                <td className="px-4 py-4"> ${item.totalPrice}</td>
                <td className="px-4 py-4">
                  {" "}
                  {item.billingAddress.firstName +
                    " " +
                    item.billingAddress.lastName}
                </td>
                <td className=" px-4 py-4 flex gap-2 items-center">
                  <Button
                    onClick={() => deleteOrder(item.id)}
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

export default OrderIndex;
