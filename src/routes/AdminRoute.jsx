import React from 'react'
import { Route,Routes } from 'react-router-dom'
import AdminLogin from '../pages/adminPages/AdminLogin'
import AdminDashboard from '../pages/adminPages/AdminDashboard'
import AdminUserList from '../pages/adminPages/AdminUserList'
function AdminRoute() {
  return (
    <Routes>
        <Route path='/login' element={<AdminLogin/>} ></Route>
        <Route path='/dashboard' element={<AdminDashboard/>} ></Route>
        <Route path='/userList' element={<AdminUserList/>} />
    </Routes>
  )
}

export default AdminRoute