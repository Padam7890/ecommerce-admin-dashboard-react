import { object, string } from "yup";


const menuvalidation = object({
    title: string().required('title required'),
    parent_id: string()
})

const initialmenuvalue = {
    title: "",
    parent_id:"",
}

export {menuvalidation, initialmenuvalue};