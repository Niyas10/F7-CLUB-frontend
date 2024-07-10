import React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginVerification} from '../../api/userApi';
import { userLogin } from '../../reduxStore/slice/userSlice';
import { loginSchema } from "../../validation/user/loginValidation";

import './UserLogin.css';

function UserLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: onSubmit
  });

  async function onSubmit() {
    try {
      const res = await loginVerification(values);
      console.log(res);
      if (res?.status === 200) {
        const { token, user } = res.data;
        localStorage.setItem("userToken", token);
        dispatch(
          userLogin({
            token: token,
            user: user,
          })
        );
        navigate('/');
      }
    } catch (error) {
      console.log(error.response?.data?.message);
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
                <input
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                placeholder='email'
                />
                <label htmlFor="email">Email</label>
                {errors.email && touched.email && (
                  <div className="error-message">{errors.email}</div>
                )}
              </div>
              <div className="input-field">
                <ion-icon name="lock-closed-outline"></ion-icon>

                <input
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="password"
                  placeholder='password'
                />
                <label htmlFor="password">Password</label>
                {errors.password && touched.password && (
                  <div className="error-message">{errors.password}</div>
                )}
              </div>
          
              <button type="submit">Log in</button>
              <div className="register-link">
                <p style={{ display: 'flex', justifyContent: 'space-between' }}> <Link to={'/forgetPassword'}> Forgot password </Link>     <Link to='/signup'>Register</Link></p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default UserLogin;