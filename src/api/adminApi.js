import { adminAxiosInstance } from "./axiosInstance";

export const adminVerifyLogin = async(loginData)=>{
    const data = await adminAxiosInstance.post("/login",loginData)
    return data;
}

export const userList = async()=>{
    const data = await adminAxiosInstance.get("/userList");
    return data;
}

export const userBlock = async (userId,status)=>{
    const data = await adminAxiosInstance.patch("/blockUser",{userId,status})
    return data;
}

export const category = async()=>{
    const data = await adminAxiosInstance.get('/category')
    return data ;
}

export const addCategory = async(categoryData)=>{
    const data = await adminAxiosInstance.post('/addCategory',categoryData)
    return data ;
}

export const categoryBlock = async (categoryId,status) =>{
    console.log(categoryId,status);
    const data = await adminAxiosInstance.patch('/blockCategory',categoryId,status)
    console.log(data);
    return data 
}

export const workout = async()=>{
    const data = await adminAxiosInstance.get('/workouts')
    return data 
}

export const addWorkout = async(roomFromData,imageAfterCrop) =>{
    const data = await adminAxiosInstance.post('/addworkout',...roomFromData,imageAfterCrop)
    return data 
}