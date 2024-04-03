import React from "react";
import Button from "./Button";
import axios from "axios";

const Image = ({ imageList, formik }) => {
  //delete image from index
  function deleteimage(imageId) {
    const updatedImages = imageList.filter((image) => image.id !== imageId);
    formik.setFieldValue("product_image", updatedImages);
    deleteImage(imageId);
  }

  async function deleteImage(imageId) {
    try {
      const res = await axios.delete(`http://localhost:3000/image/${imageId}`);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="image flex w-[800px] gap-3">
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
            src={`http://localhost:3000${image.url}`}
            alt="product image"
            className="w-full"
          />
        </div>
      ))}
    </div>
  );
};

export default Image;
