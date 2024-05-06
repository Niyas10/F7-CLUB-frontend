
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

const userBaseUrl = baseURL;
const adminBaseUrl = `${baseURL}/admin`

const createAxiosInstance = (baseURL)=>{
    const instance = axios.create({
        baseURL,
        timeout:200000,
        timeoutErrorMessage:"request Timeout... please try again"
    });

    return instance;
}

const attachToken = (req, tokenName) => {
  let authToken = localStorage.getItem(tokenName);
  if (authToken) {
    req.headers.Authorization = `Bearer ${authToken}`; 
  }
  return req;
};

export const userAxiosInstance = createAxiosInstance(userBaseUrl);
userAxiosInstance.interceptors.request.use(async (req) => {
  const modifiedReq = attachToken(req, "userToken");
  return modifiedReq;
});

export const adminAxiosInstance = createAxiosInstance(adminBaseUrl)
adminAxiosInstance.interceptors.request.use(async (req)=>{
  const modifiedReq = attachToken(req,"adminToken");
  return modifiedReq
})