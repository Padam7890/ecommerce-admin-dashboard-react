import { number, object, string, mixed } from "yup";

const bannervalidation = object({
    title: string().required('title required'),
    subtitle: string().required('subtitle required'),
    url : string().required('url required'),
    imageUrl : mixed().required('image Required'),
  });

  const bannerinitialValues = {
    title: "",
    subtitle: "",
    url: "",
    imageUrl: "",

  }

  export {bannervalidation, bannerinitialValues}