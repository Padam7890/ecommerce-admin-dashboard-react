import { number, object, string, mixed } from "yup";

const bannervalidation = object({
    title: string().required('title required'),
    subtitle: string().required('subtitle required'),
    url : string().required('url required'),
    // image : mixed().required('image Required'),
  });

  const createbannervalidation = object({
    title: string().required('title required'),
    subtitle: string().required('subtitle required'),
    url : string().required('url required'),
    image : mixed().required('image Required'),
  })

  const bannerinitialValues = {
    title: "",
    subtitle: "",
    url: "",
    image: "",

  }

  export {bannervalidation, bannerinitialValues ,createbannervalidation}