import apiConfig from "./apiConfig";
import queryString from "query-string";
import axios from "axios";


const  axiosClient= axios.create({
    baseURL:apiConfig.baseURL,
    headers:{
        'Content-Type':'application.json'
    },
    paramsSerializer:param=>queryString.stringify({...param, api_key:apiConfig.apiKey})
})
 axiosClient.interceptors.request.use(async (config)=>config);
axiosClient.interceptors.response.use((response)=>{
    if(response && response.data)
    {
        return response.data;
    }
    return response;
}, error=>{
    throw Error(error)
})
export default axiosClient;