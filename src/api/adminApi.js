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
    const data = await adminAxiosInstance.patch('/blockCategory',categoryId,status)
    return data 
}

export const workout = async()=>{
    const data = await adminAxiosInstance.get('/workouts')
    return data
}
export const addWorkout = async (formData) => {
    const data = await adminAxiosInstance.post("/addworkout", formData);
    return data;
  };

  export const editWorkout = async (workoutId) =>{
   const data = await adminAxiosInstance.get(`/editWorkout/${workoutId}`)
   return data 
  }

  export const finalEditWorkout = async(formData)=>{
    console.log(formData,'hey')
    const data = await  adminAxiosInstance.put('/editedWorkout',{...formData})
    console.log(data,'data')
    return data 
  }