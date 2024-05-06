import React from 'react'
import {useFormik} from 'formik'
import {useDispatch} from 'react-redux'
import {Link,useNavigate} from 'react-router-dom'
import { loginVerification } from '../../api/userApi'
import { userLogin } from '../../reduxStore/slice/userSlice'
import {loginSchema} from "../../validation/user/loginValidation"

import "./UserLogin.css"


function UserLogin() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {values,errors,touched,handleBlur,handleChange,handleSubmit}=useFormik({
    initialValues:{
      email:"",
      password:"",
    },
    onSubmit
  })
  async function onSubmit(){
    try{
     const res = await loginVerification(values);
     console.log(res);
     if(res?.status===200){
      const {token,user} = res.data;
      localStorage.setItem("userToken",token);
      dispatch(
        userLogin({
          token:token,
          user:user,
        })
      )
      navigate('/')
     }
    }catch(error){
      console.log(error.response?.data?.message)
    }
  }





  return (
    <>
      <section id='user-login-section'>
        <div id="user-login-form-box" className="form-container">
          <div className="form-content">
            <form onSubmit={handleSubmit}>
              <h2>Login</h2>
              <div className="input-field">
                <ion-icon name="mail-outline"></ion-icon>
                <input  name='email' value={values.email} onChange={handleChange} onBlur={handleBlur} type="text" required />
                <label htmlFor="email">Email</label>
                {errors.email && touched.email && (
                    <p className="text-red-600 mt-1">{errors.email}</p>
                  )}
              </div>
              <div className="input-field">
                <ion-icon name="lock-closed-outline"></ion-icon>
                <input name='password' value={values.password} onChange={handleChange} onBlur={handleBlur} type="password" required />
                <label htmlFor="password">Password</label>
                {errors.password && touched.password && (
                    <p className="text-red-600 mt-1">{errors.password}</p>
                  )}
              </div>
              <div className="forget-password" style={{display:'flex',justifyContent:'end'}}>
                <label htmlFor="rememberMe"><a href="#">Forgot Password</a></label>
              </div>
              <button type="submit">Log in</button>
              <div className="register-link">
                <p style={{display:'flex',justifyContent:'space-between'}}>Don't have an account? <Link to='/signup'>Register</Link></p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default UserLogin