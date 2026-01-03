import axios from "axios";
import { createPostApi } from "./apis";

export const apiRequest = async (
  api,
  method = "get",
  params = [],
  data = {},
  config = {},
) => {
  try {
    const url = `${api}${params.length ? "/" + params.join("/") : ""}`;

    const response = await axios({
      method: method.toLowerCase(),
      url,
      data,
      ...config,
    });

    return response;
  } catch (error) {
    console.error("API Error:", error?.response || error.message);
    throw error; 
  }
};

export const createPostFunc = async(form)=>{
    const formData = new FormData();
  formData.append("image", form.image); 
  formData.append("caption", form.caption);

  try {
    const response = await fetch(createPostApi, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    
    if (data.success) {
      return data
    }
  } catch (err) {
    console.error(err);
  }
}
