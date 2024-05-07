import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { adminVerifyLogin } from '../../api/adminApi'
import { adminLogin } from '../../reduxStore/slice/adminSlice'
import {  useFormik } from 'formik'
import './AdminLogin.css'

function AdminLogin() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onSubmit = async ()=>{
  
    try{
      const res = await adminVerifyLogin(values);

      if(res?.status === 200){
        const {token,userName} = res.data
        localStorage.setItem("adminToken",token);
        dispatch(
          adminLogin({
            token:token,
            admin:userName
          })
        );
        navigate("/admin/dashboard")
      }
    } catch (error){
      console.log(error.message)
    }
  }

  const {values,errors,handleBlur,handleChange,touched,handleSubmit} = useFormik({
    initialValues:{
      email:"",
      password:""
    },onSubmit
  })


  return (
    <div className="admin-login-container">
      <div id='admin-login-section'>
        <div id="admin-login-form-box" className="form-container">
          <div className="form-content">
            <form onSubmit={handleSubmit}>
              <h2>Login</h2>
              <div className="admin-input-field">
                <ion-icon name="mail-outline"></ion-icon>
                <input name='email' value={values.email} onChange={handleChange} onBlur={handleBlur} type="text" required />
                <label htmlFor="email">Email</label>
                {errors.email && touched.email && (
                  <p className="text-red-600">{errors.email}</p>
                )}
              </div>
              <div className="admin-input-field">
                <ion-icon name="lock-closed-outline"></ion-icon>
                <input name='password' value={values.password} onChange={handleChange}  onBlur={handleBlur} type="password" required />
                <label htmlFor="password">Password</label>
                {errors.password && touched.password && (
                  <p className="text-red-600">{errors.password}</p>
                )}
              </div>

              <button type="submit">Log in</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin