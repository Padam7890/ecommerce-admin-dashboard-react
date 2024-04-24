const saveClient = (values)=>{
    // clientName: "",
    // clientImage: "",
    // clientType: "",
    // clientRating: 0,
    // testimonial: "",
    const formData = new FormData();
    formData.append("clientName", values.clientName);
    formData.append("clientImage", values.clientImage);
    if (values.image) {
        formData.append("image" ,values.image);
    }
    formData.append("clientType", values.clientType);
    formData.append("clientRating", values.clientRating);
    formData.append("testimonial", values.testimonial);

    return formData;

}

export default saveClient;