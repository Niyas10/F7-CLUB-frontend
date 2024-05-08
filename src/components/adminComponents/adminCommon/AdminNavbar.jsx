import React from 'react'
import { Link,useNavigate } from "react-router-dom";
import { useDispatch} from 'react-redux';
import { adminLogout } from '../../../reduxStore/slice/adminSlice';

function AdminNavbar() {

  const dispatch = useDispatch();
  const navigate = useNavigate()


  

  const handleLogout = async()=>{
    localStorage.removeItem("adminToken")
    dispatch(adminLogout());
    navigate("/admin/login")
  }


  return (
  <>
 <div className='background-navbar'>

<nav className="navbar navbar-expand-lg navbar-light px-0  shadow-lg "  style={{marginTop:'10px',marginLeft:'10px',marginRight:'10px',borderRadius:'10px',    background:" white"}}>
  <div className="container-fluid">
    <a className="navbar-brand d-flex align-items-center ms-4" href="#">
      <img src="/logo/FIT LOGO.svg" alt="" style={{ height: "40px" }} />
    </a>
    <button className="navbar-toggler me-4 navbar-button" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav mx-auto">
        <li className="nav-item me-3">
          <Link className="nav-link text-font" to="/admin/dashboard">
            Dashboard
          </Link>
        </li>
        <li className="nav-item me-3">
          <Link className="nav-link text-font" to="/admin/userList">
            Users
          </Link>
        </li>
        <li className="nav-item me-3">
          <Link className="nav-link text-font" to="/admin/workouts">
            Workouts
          </Link>
        </li>
        <li className="nav-item me-3">
          <Link className="nav-link text-font" to="/admin/category">
          Category
          </Link>
        </li>
        <li className="nav-item me-3">
          <a className="nav-link text-font" href="#">
            Blog
          </a>
        </li>
        <li className="nav-item me-3">
          <a className="nav-link text-font" href="#">
            Chat
          </a>
        </li>
      </ul>
      <div className="d-flex align-items-center">
        <span onClick={handleLogout} className="d-flex align-items-center me-3 join-container">
          
          <span  onClick={handleLogout} className='join-text'>logout</span>
        </span>
      </div>
    </div>
  </div>
</nav>
</div>
  </>
  )
}

export default AdminNavbar