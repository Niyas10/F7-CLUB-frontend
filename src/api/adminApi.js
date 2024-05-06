import { adminAxiosInstance } from "./axiosInstance";

export const adminVerifyLogin = async(loginData)=>{
    const data = await adminAxiosInstance.post("/login",loginData)
    return data;
}

export const userList = async()=>{
    const data = await adminAxiosInstance.get("/userList");
    return data
}

export const userBlock = async (userId,status)=>{
    const data = await adminAxiosInstance.patch("/blockUser",{userId,status})
    return data
}