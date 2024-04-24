import { mixed, number, object, string } from "yup";

const createCilentValidation = object({
    clientName: string().required("Client Name Required"),
    clientImage: mixed(),
    clientType: string(),
    clientRating: number(),
    testimonial: string().required("Testimonial Required"),
})

const initialCilentValue = {
    clientName: "",
    clientImage: "",
    clientType: "",
    clientRating: 0,
    testimonial: "",
}

export { createCilentValidation, initialCilentValue}