import React from 'react'
import { Route,Routes } from 'react-router-dom'
import AdminLogin from '../pages/adminPages/AdminLogin'
import AdminDashboard from '../pages/adminPages/AdminDashboard'
import AdminUserList from '../pages/adminPages/AdminUserList'
import AdminCategory from '../pages/adminPages/AdminCategory'
import AdminWorkout from '../pages/adminPages/AdminWorkout'
import AdminAddWorkout from '../pages/adminPages/AdminAddWorkout'
import AdminEditWorkout from '../pages/adminPages/AdminEditWorkout'
import AdminBlogs from '../pages/adminPages/AdminBlogs'
import AdminAddBlogs from '../pages/adminPages/AdminAddBlogs'
import AdminEditBlog from '../pages/adminPages/AdminEditBlog'

function AdminRoute() {
  return (
    <Routes>
        <Route path='/login' element={<AdminLogin/>} />
        <Route path='/dashboard' element={<AdminDashboard/>} />
        <Route path='/userList' element={<AdminUserList/>} />
        <Route path='/category' element={<AdminCategory/>} />
        <Route path='/workouts' element={<AdminWorkout/>} />
        <Route path='/addworkout' element={<AdminAddWorkout/>} />
        <Route path='/editWorkout/:workoutId' element={<AdminEditWorkout/>} />
        <Route path='/blogs' element={<AdminBlogs/>} />
        <Route path='/addBlog' element={<AdminAddBlogs/>} />
        <Route path='/editBlog/:blogId' element={<AdminEditBlog/>} />
     

    </Routes>
  )
}

export default AdminRoute