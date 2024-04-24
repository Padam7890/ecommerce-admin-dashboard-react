import { number, object, string, mixed } from "yup";


const createCategoryValidation =  object ({
    category_name: string().required("Please enter valid Category name"),
    image: mixed().required("Image required")
})

const updateCategoryValidation = object({
    category_name: string().required("Please enter valid Category name"),
    imageUrl: string(),
})

const categoryIntialValue = {
    category_name: "",
    image: ""
}

export { createCategoryValidation, updateCategoryValidation, categoryIntialValue }