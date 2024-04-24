import { mixed, number, object, string } from "yup";

const createsubcatvalidationScheme = object({
    subcategory_name: string().required("Please enter valid Sub Category name"),
    category_id: number().required(),
    image:mixed().required("Please enter Image")
  });

const updatesubcatvalidationScheme = object({
    subcategory_name: string().required("Please enter valid Sub Category name"),
    category_id: number().required(),
    imageUrl: string()
  });

  export { createsubcatvalidationScheme, updatesubcatvalidationScheme};