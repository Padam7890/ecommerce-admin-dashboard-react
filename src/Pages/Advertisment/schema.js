import { date, mixed, object, string } from "yup";

const createadvalidation = object({
    Title: string().required('title required'),
    subtitle: string().required('subtitle required'),
    startTime : date(),
    endTime : date(),
    description : string(),
    url : mixed().required('Image required'), //image
  
})

const initialadvalue = {
    Title: "",
    subtitle: "",
    startTime: "",
    endTime: "",
    description: "",
    url: "",
}

export  {createadvalidation,initialadvalue};

