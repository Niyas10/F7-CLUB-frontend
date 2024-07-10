// userApi.js
import { userAxiosInstance } from "./axiosInstance";

export const userSignup = async (signupData) => {
  const data = await userAxiosInstance.post("/signup", signupData);
  return data;
};

export const otpVerification = async (otp, otpId, userId) => {
  const data = await userAxiosInstance.post("/otp", { otp, userId });
  return data;
};

export const clientResendOtp = async (userEmail) => {
  const data = await userAxiosInstance.post("/resendOtp", { userEmail });
  return data;
};

export const loginVerification = async (userEmail) => {
  const data = await userAxiosInstance.post("/login", userEmail);
  return data;
};

export const verifyEmail = async(email)=>{
  const data = await userAxiosInstance.post('/requestPasswordReset',{email})
  return data;
}

export const verifyOtp = async(otp,userId) =>{
  const data = await userAxiosInstance.post('/requestPasswordOtpVerify',{otp,userId})
  console.log(data+'hey')
  return data
}

export const resetPassword = async(password,userId)=>{
  const data = await userAxiosInstance.post('/passwordReset',{password,userId})
  return data 
}

export const clientForgotResendOtp =async (userId) => {
  const data = await userAxiosInstance.post(`/resendOtp/${userId}`); 
 return data
}

export const  userWorkout = async()=>{
  const data = await userAxiosInstance.get('/workout')
  return data 
}

export const viewWorkout = async(id)=>{
  const data = await userAxiosInstance.get(`viewWorkout/${id}`)
  return data ;
}

export const userBlog = async()=>{
  const data = await userAxiosInstance.get('/blog')
  return data
}

export const viewBlog = async(id)=>{
  const data = userAxiosInstance.get(`viewBlog/${id}`)
  return data
}



