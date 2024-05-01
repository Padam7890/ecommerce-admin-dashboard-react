import { object, string } from "yup";


const menuvalidation = object({
    title: string().required('title required'),
})

const initialmenuvalue = {
    title: "",
    parent_id:"",
}

export {menuvalidation, initialmenuvalue};