const bannerdata = (data)=>{
    const formdata = new FormData();
    formdata.append("title", data.title);
    formdata.append("subtitle", data.subtitle);
    formdata.append("url", data.url);
    if (data.image) {
        formdata.append("image" ,data.image); 
    }
    //imageUrl
    formdata.append("imageUrl", data.imageUrl);

    return formdata;
}



export default bannerdata;