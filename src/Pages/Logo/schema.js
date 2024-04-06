import { number, object, string, mixed } from "yup";

const createLogoValidation = object({
    name: string().required('name required'),
    url: string().required('url required'),
    image: mixed().required('image Required'),

    // name     String
    // imageUrl String
    // url      String
})

const updateLogoValidation = object({
    name: string().required('name required'),
    url: string().required('url required'),
    // image: mixed().required('image Required'),
})

const logoInitialValues =  {
    name: "",
    url: "",
    image: "",
}



export { createLogoValidation, updateLogoValidation, logoInitialValues };

