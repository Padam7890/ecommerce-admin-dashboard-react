// src/components/ProductList.jsx
import React, { useEffect, useState } from "react";
import Button from "../../Components/Button";
import { Navigate, useNavigate } from "react-router-dom";
import Table from "../../Components/Table Components/Table";
import TableHead from "../../Components/Table Components/TableHead";
import TableBody from "../../Components/Table Components/TableBody";
import TableRow from "../../Components/Table Components/TableRow";
import axios from "axios";
import parse from "html-react-parser";
import { NavLink } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const nav = useNavigate();
  const handleButtonClick = () => {
    nav("/product/create");
  };

  useEffect(() => {
    apiHandleproductList();
  }, []);

  async function apiHandleproductList() {
    try {
      const fetch = await axios.get("http://localhost:3000/products");
      const data = fetch.data.products;
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  }

  console.log(products);

  return (
    <div>
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
              <th scope="col">Product name</th>
              <th scope="col">Color</th>
              <th scope="col">Category</th>
              <th scope="col">Price</th>
              <th scope="col">Action</th>
            </tr>
          </TableHead>
          <TableBody>
            {products.map((products) => (
              <TableRow>
                <td>{products.product_title}</td>
                <td>{parse(products.product_description)}</td>
                <td>Laptop</td>
                <td>$2999</td>
                <td>
                  <NavLink to={`/product/edit/${products.id}`}> 
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                  </NavLink>
                </td>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProductList;
