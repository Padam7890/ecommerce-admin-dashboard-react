import { date, mixed, object, string } from "yup";

const createadvalidation = object({
    Title: string().required('title required'),
    subtitle: string().required('subtitle required'),
    startTime : date(),
    endTime : date(),
    description : string(),
    url : mixed().required('Image required'), 
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
}

export  {createadvalidation, initialadvalue, updateadvalidation};

