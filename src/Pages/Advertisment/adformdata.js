const addata = (data)=>{
    const formdata = new FormData();
    formdata.append("Title", data.Title);
    formdata.append("subtitle", data.subtitle);
    formdata.append("startTime", data.startTime);
    formdata.append("endTime", data.endTime);
    formdata.append("description", data.description);
    formdata.append("url" ,data.url);
    
    if (data.image) {
        formdata.append("image", values.image);
    }
    return formdata;
}

export default addata;