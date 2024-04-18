const formdata = (values) => {
  console.log(values);

  const formData = new FormData();
  formData.append("product_title", values.product_title);
  formData.append("product_description", values.product_description);
  formData.append("regular_price", values.regular_price);
  formData.append("sale_price", values.sale_price);
  formData.append("category_id", values.category_id);
  formData.append("subcategory_id", values.subcategory_id);
  formData.append("product_tags", values.product_tags);
  formData.append("is_featured", values.is_featured);
  formData.append("product_hot", values.product_hot);
  formData.append("product_sku", values.product_sku);
  formData.append("product_quantity", values.product_quantity);
  formData.append("product_weight", values.product_weight);
  formData.append("product_size", values.product_size);
  formData.append("product_color", values.product_color);
  formData.append("stock_type", values.stock_type);

  
  values.product_image.forEach((image) => {
    formData.append("product_image", image);
  });

  return formData;


};

export default formdata;
