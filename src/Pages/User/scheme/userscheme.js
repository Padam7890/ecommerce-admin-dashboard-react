import { array, object, ref, string } from "yup";

const userValidation = object({
  name: string().required("Please enter your name"),
  email: string().required("Please enter a email"),
  password: string()
    .required("Please enter a password")
    .min(8, "Password must be at least 8 characters long"),
  confirm_password: string()
    .required("Please re-type your password")
    .oneOf([ref("password"), null], "Passwords must match"),
  roles: string(),
  permissions: array().min(1, 'Select at least one permission'),

});

const userInitialValue = {
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    roles: "",
    permissions: [],

}

export { userValidation, userInitialValue };