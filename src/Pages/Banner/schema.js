import { number, object, mixed, string, boolean } from "yup";

const bannervalidation = object({
    title: String().required('title'),

  });

  const bannerinitialValues = {


  }

  export {bannervalidation, bannerinitialValues}