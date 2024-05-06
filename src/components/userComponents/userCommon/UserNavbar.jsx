import React from "react";
import { useDispatch,useSelector } from "react-redux";
import { Link,useLocation,useNavigate } from "react-router-dom";
import {userLogout} from '../../../reduxStore/slice/userSlice'
import "./UserNavbar.css";

function UserNavbar() {
const dispatch = useDispatch()
const locaton = useLocation()
const navigate = useNavigate()

const {user} = useSelector((state)=>state.UserReducer)

const handleLogout = ()=>{
  localStorage.removeItem('userToken');
  dispatch(userLogout())
  navigate('/login')
}


  return (
    <>

  <nav className="navbar navbar-expand-lg navbar-light px-0">
    <div className="container-fluid">
      <a className="navbar-brand d-flex align-items-center ms-4" href="#">
        <img src="/logo/FIT LOGO.svg" alt="" style={{ height: "40px" }} />
      </a>
      <button 
        className="navbar-toggler me-4 navbar-button"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav mx-auto">
          <li className="nav-item me-3">
            <Link className="nav-link text-font" href="/">
              Home
            </Link>
          </li>
          <li className="nav-item me-3">
            <a className="nav-link text-font" href="#">
              Diet
            </a>
          </li>
          <li className="nav-item me-3">
            <a className="nav-link text-font" href="#">
              Workout
            </a>
          </li>
          <li className="nav-item me-3">
            <a className="nav-link text-font" href="#">
              Blog
            </a>
          </li>
          <li className="nav-item me-3">
            <a className="nav-link text-font" href="#">
              About
            </a>
          </li>
          <li className="nav-item me-5">
            <a className="nav-link text-font" href="#">
              Contact
            </a>
          </li>
        </ul>
        <div className="d-flex align-items-center">
          <span className="d-flex align-items-center me-3 join-container">
            <img
              src="\logo\\green arrow.svg"
              alt=""
              className="me-2 join-arrow"
              style={{ height: "20px", transform: "rotate(44deg)" }}
            />
            {(user ? (<span className="join-text"> <Link style={{color:'black',textDecoration:'none'}} onClick={handleLogout}>  Logout </Link>   </span>) :  ( <span className="join-text"> <Link to='/login' style={{textDecoration:'none',color:'black'}}> Join </Link>  </span>))}
           
          </span>
        </div>
      </div>
    </div>
  </nav>

    </>
  );
}

export default UserNavbar;
