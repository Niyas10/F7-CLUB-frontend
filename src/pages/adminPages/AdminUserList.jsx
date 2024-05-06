import React from 'react'
import UserList from '../../components/adminComponents/UserList'
import AdminNavbar from '../../components/adminComponents/adminCommon/AdminNavbar'

function AdminUserList() {
  return (
    <>
      <AdminNavbar/>
  <UserList/>
    </>

  )
}

export default AdminUserList