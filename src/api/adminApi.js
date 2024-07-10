import { adminAxiosInstance } from "./axiosInstance";

export const adminVerifyLogin = async (loginData) => {
  const data = await adminAxiosInstance.post("/login", loginData);
  return data;
};

export const userList = async () => {
  const data = await adminAxiosInstance.get("/userList");
  return data;
};

export const userBlock = async (userId, status) => {
  const data = await adminAxiosInstance.patch("/blockUser", { userId, status });
  return data;
};

export const category = async () => {
  const data = await adminAxiosInstance.get("/category");
  return data;
};

export const addCategory = async (categoryData) => {
  const data = await adminAxiosInstance.post("/addCategory", categoryData);
  return data;
};

export const categoryBlock = async (categoryId, status) => {
  const data = await adminAxiosInstance.patch(
    "/blockCategory",
    categoryId,
    status
  );
  return data;
};

export const workout = async () => {
  const data = await adminAxiosInstance.get("/workouts");
  return data;
};
export const addWorkout = async (formData) => {
  const data = await adminAxiosInstance.post("/addworkout", formData);
  return data;
};

export const editWorkout = async (workoutId) => {
  const data = await adminAxiosInstance.get(`/editWorkout/${workoutId}`);
  return data;
};

export const finalEditWorkout = async (formData) => {
  const data = await adminAxiosInstance.put("/editedWorkout", formData);
  return data;
};

  export const deleteWorkout = async (workoutId)=>{
    const data = await adminAxiosInstance.delete(`/deleteWorkout/${workoutId}`);
  return data
}

export const blog = async () => {
  const data = adminAxiosInstance.get("/blogs");
  return data;
};

export const addBlog = async (formData) => {
  const data = adminAxiosInstance.post("/addBlog", formData);
  return data;
};

export const editBlog = async (blogId) => {
  const data = await adminAxiosInstance.get(`/editBlog/${blogId}`);
  return data;
};

export const finalEditBlog = async (formData) => {
  const data = adminAxiosInstance.put("/editedBlog", formData);
  return data;
};

export const deleteBlog = async(blogId)=>{
  const data = adminAxiosInstance.delete(`/deleteBlog/${blogId}`)
  return data
}
