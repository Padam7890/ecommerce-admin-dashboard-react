import React from "react";
import Button from "./Button";
import axios from "axios";
import http from "../Utils/http";
import { ToastContainer, toast } from "react-toastify";

const Image = ({ imageList, formik }) => {
  //delete image from index
  function deleteimage(imageId) {
    const updatedImages = imageList.filter((image) => image.id !== imageId);
    formik.setFieldValue("product_image", updatedImages);
    deleteImage(imageId);
  }

  async function deleteImage(imageId) {
    try {
      const res = await http.delete(`/image/${imageId}`);
      toast.success(res.data.message)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="image flex w-[800px] gap-3">
      <ToastContainer/>
      {imageList.map((image, index) => (
        <div className="w-full flex relative" key={index}>
          <Button
            type={"button"}
            onClick={() => deleteimage(image.id)}
            className="absolute bg-red-300 p-2"
          >
            delete
          </Button>
          <img
            src={`${image.url}`}
            alt="product image"
            className="w-full"
          />
        </div>
      ))}
    </div>
  );
};

export default Image;
