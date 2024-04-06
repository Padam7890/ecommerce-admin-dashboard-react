
const saveCategory = (values) =>{
    const formData = new FormData();
    formData.append("category_name", values.category_name);
    if (values.image) {
        formData.append("image", values.image);
    }
    formData.append("image_url", values.image_url);
    return formData;
}

export default saveCategory;