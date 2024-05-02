// src/components/ProductList.jsx
import React, { useEffect, useState } from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";

import TableHeading from "../../Components/Table/TableHeading";
import Table from "../../Components/Table/Table";
import Thead from "../../Components/Table/Thead";
import parse from "html-react-parser";
import useProductList from "../../CustomHook/productlist";
import http from "../../Utils/http";
import Button from "../../Components/Button";


const ProductList = () => {
  const {
    products,
    isLoading,
    error,
    fetchProductList,
    setProducts,
  } = useProductList();
  const [isLoadingbtn, setIsLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const nav = useNavigate();

  const handleButtonClick = () => {
    nav("/product/create");
  };

  if (isLoading) {
    return <ClipLoader color={"#008000"} size={40} />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  async function deleteRequest(valueId) {
    try {
      setIsLoading(true);
      console.log(valueId);
      const res = await http.delete(`/products/${valueId}`);
      console.log(res.data.message);
      toast.success(res.data.message);
      await fetchProductList();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  function checkAllHandler() {
    if (products.length === selectedItems.length) {
      setSelectedItems([]);
    } else {
      // Some items are selected, so select all
      const postIds = products.map((item) => item.id);
      setSelectedItems(postIds);
    }
  }

  function checkboxHandler(e) {
    const isSelected = e.target.checked;
    const value = parseInt(e.target.value);

    if (isSelected) {
      setSelectedItems([...selectedItems, value]);
    } else {
      setSelectedItems(selectedItems.filter((id) => id !== value));
    }
  }

  const deletedSelectedItems = async () => {
    if (selectedItems.length === 0) {
      toast.error("Please select atleast one item");
    } else {
      setIsLoading(true);
      try {
        const selectedItemsString = selectedItems.join(",");
        const res = await http.delete(
          `/products/deleteall/${selectedItemsString}`
        );
        console.log(res.data.message);
        toast.success(res.data.message);
        fetchProductList();
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  console.log(selectedItems);

  console.log(products);
  return (
    <div className=" relative h-full w-full">
      <ToastContainer />
      {isLoadingbtn && (
        <div className="bg-slate-800 bg-opacity-40 w-full h-full absolute z-30 top-0 left-0 flex justify-center items-center">
          <ClipLoader color={"#008000"} size={120} />
        </div>
      )}

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

      <div class="relative overflow-x-auto  shadow-md sm:rounded-lg">
        <TableHeading
          items={products}
          setItems={setProducts}
          fetchItemList={fetchProductList}
          searchfor={'product_title'}
          deleteSelectedProducts={deletedSelectedItems}
        />
        <Table>
          <Thead>
            <tr>
              <th scope="col" class="p-4">
                <div class="flex items-center">
                  <input
                    id="checkbox-all-search"
                    checked={selectedItems.length === products.length}
                    onClick={checkAllHandler}
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
          <tbody className=" bg-white w-full h-full">
            {products.map((products) => (
              <tr class="border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4">
                  <div class="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      name="checkbox"
                      checked={selectedItems.includes(products.id)}
                      onChange={checkboxHandler}
                      value={products.id}
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
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ProductList;
