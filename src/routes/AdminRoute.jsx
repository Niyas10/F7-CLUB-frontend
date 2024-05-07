import React from 'react'
import { Route,Routes } from 'react-router-dom'
import AdminLogin from '../pages/adminPages/AdminLogin'
import AdminDashboard from '../pages/adminPages/AdminDashboard'
import AdminUserList from '../pages/adminPages/AdminUserList'
import AdminCategory from '../pages/adminPages/AdminCategory'

function AdminRoute() {
  return (
    <Routes>
        <Route path='/login' element={<AdminLogin/>} />
        <Route path='/dashboard' element={<AdminDashboard/>} />
        <Route path='/userList' element={<AdminUserList/>} />
        <Route path ='/category' element={<AdminCategory/>} />

    </Routes>
  )
}

export default AdminRoute