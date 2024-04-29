import { date, mixed, object, string } from "yup";

const createadvalidation = object({
    Title: string().required('title required'),
    subtitle: string().required('subtitle required'),
    startTime : date(),
    endTime : date(),
    description : string(),
    image : mixed().required('Image required'), 
})

const updateadvalidation = object({
    Title: string().required('title required'),
    subtitle: string().required('subtitle required'),
    startTime : date(),
    endTime : date(),
    description : string(),
})

const initialadvalue = {
    Title: "",
    subtitle: "",
    startTime: "",
    endTime: "",
    description: "",
    image: "",
}

export  {createadvalidation, initialadvalue, updateadvalidation};

