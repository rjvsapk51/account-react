
export const GetAll = async (uri:string) => {
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      };
    return await fetch(uri,requestOptions);
}

export const Post = async(uri:string,data:any) =>{
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      return await fetch(uri,requestOptions);
}

export const Put =async(uri:string,data:any) =>{
    const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      return await fetch(uri,requestOptions);
}
export const Delete= async(uri:string) => {
    const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };
      return await fetch(uri,requestOptions);
}