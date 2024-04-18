import { number, object, mixed, string, boolean } from "yup";

const validationScheme = object({
    product_title: string().required("Please enter valid product name"),
    product_description: string().required(
      "Please enter valid product description"
    ),
    regular_price: number().required().positive(),
    sale_price: number().positive(),
    category_id: number().required(),
    subcategory_id: number().required("Please Enter Sub Category Name"),
    product_tags: string().required(),
    is_featured: boolean(),
    product_hot: boolean(),
    product_sku: number().required(),
    product_quantity: number().required().positive(),
    product_weight: number().required().positive(),
    product_size: string().required(),
    product_color: string().required(),
    stock_type: string().required(),

  });

  const initialValues = {
    product_title: "",
    product_description: "",
    regular_price: "",
    sale_price: "",
    product_image: [],
    category_id: "",
    subcategory_id: "",
    product_tags: "",
    is_featured: false,
    product_hot: false,
    product_sku: "",
    product_quantity: "",
    product_weight: "",
    product_size: "",
    product_color: "",
    stock_type: "",

  }

  export {initialValues, validationScheme}