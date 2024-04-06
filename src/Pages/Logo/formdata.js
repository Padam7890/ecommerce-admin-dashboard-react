const logocreate = (data)=>{
    const formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("url", data.url);
    if (data.image) {
        formdata.append("image" ,data.image);
    }
    return formdata;
}



export default logocreate;