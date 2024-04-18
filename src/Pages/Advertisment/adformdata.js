const addata = (data)=>{
    const formdata = new FormData();
    formdata.append("Title", data.Title);
    formdata.append("subtitle", data.subtitle);
    formdata.append("startTime", data.startTime);
    formdata.append("endTime", data.endTime);
    formdata.append("description", data.description);
    if (data.url) {
        formdata.append("url" ,data.url);
    }
    return formdata;
}

export default addata;