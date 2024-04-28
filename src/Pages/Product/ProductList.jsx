// src/components/ProductList.jsx
import React, { useEffect, useState } from "react";
import Button from "../../Components/Button";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import TableHeading from "../../Components/Table/TableHeading";
import Table from "../../Components/Table/Table";
import Thead from "../../Components/Table/Thead";
import parse from "html-react-parser";
import useProductList from "../../CustomHook/productlist";
import http from "../../Utils/http";

const ProductList = () => {
  const { products, isLoading, error, fetchProductList } = useProductList();
  const [checkany, setcheked] = useState();
  const nav = useNavigate();
  const handleButtonClick = () => {
    nav("/product/create");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  async function deleteRequest(valueId) {
    try {
      console.log(valueId);
      const res = await http.delete(`/products/${valueId}`);
      console.log(res.data.message);
      toast.success(res.data.message);
      fetchProductList();
    } catch (error) {
      console.log(error);
    }
  }
  function checkboxall() {
    setcheked(!checkany);
  }

  console.log(checkany);

  console.log(products);
  return (
    <div>
      <ToastContainer />

      <div className=" flex items-center justify-between">
        <h2 className="text-2xl font-semibold mb-4">Product List</h2>
        <Button
          type="button"
          onClick={handleButtonClick}
          className=" bg-green-700 hover:bg-green-900"
        >
          Create Product
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
                    onClick={checkboxall}
                    type="checkbox"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label for="checkbox-all-search" class="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col">Product name</th>
              <th scope="col">Descrption</th>
              <th scope="col">Category</th>
              <th scope="col">Price</th>
              <th scope="col">Action</th>
            </tr>
          </Thead>
          <tbody>
            {products.map((products) => (
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4">
                  <div class="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      name="checkbox"
                      checked={checkany == true ? "checked" : ""}
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label for="checkbox-table-search-1" class="sr-only">
                      checkbox
                    </label>
                  </div>
                </td>

                <td className="px-4 py-4">
                  {products.product_title.substring(0, 30).concat("...")}
                </td>
                <td className="px-4 py-4">
                  {parse(
                    products.product_description.substring(0, 60).concat("...")
                  )}
                </td>
                <td className="px-4 py-4">{products.category.category_name}</td>
                <td className="px-4 py-4">{products.regular_price}</td>
                <td className=" px-4 py-4 flex gap-2 items-center">
                  <NavLink to={`/product/edit/${products.id}`}>
                    <Button href="#" className=" bg-green-500">
                      Edit
                    </Button>
                  </NavLink>
                  <Button
                    onClick={() => deleteRequest(products.id)}
                    className=" bg-red-500  font-light text-center text-xs "
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
            ;
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ProductList;
