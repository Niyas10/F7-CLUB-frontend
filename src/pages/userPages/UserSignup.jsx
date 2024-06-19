import React from "react";
import "./UserSignup.css";
import { useFormik } from "formik";
import { userSignup } from "../../api/userApi";
import { userSchema } from '../../validation/user/userSignupValidation';
import { useNavigate, Link } from "react-router-dom";

function UserSignup() {
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const res = await userSignup(values);
      if (res?.status === 201) {
        const { user, otpId } = res.data;
        navigate('/otp', {
          state: { userEmail: user.email, otpId: otpId, userId: user._id }
        });
      } else {
        // Handle the case where the response status is not 201
        console.log('Sign up failed:', res?.data?.message || 'Unknown error');
      }
    } catch (error) {
      console.log('Sign up failed:', error.response?.data?.message || 'Unknown error');
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validationSchema: userSchema,
    onSubmit,
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = formik;

  return (
    <div>
      <section id="signup">
        <div className="form-box">
          <div className="form-value">
            <form onSubmit={handleSubmit}>
              <h2>Sign In</h2>
              <div className="row">
                <div className="col">
                  <div className="inputbox">
                    <ion-icon name="person-outline"></ion-icon>
                    <input
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      placeholder="Username"
                    />
                    <label htmlFor="username">Username</label>
                    {errors.name && touched.name && (
                      <p className="text-red-600">{errors.name}</p>
                    )}
                  </div>
                </div>
                <div className="col">
                  <div className="inputbox">
                    <ion-icon name="mail-outline"></ion-icon>
                    <input
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      placeholder="Email"
                    />
                    <label htmlFor="email">Email</label>
                    {errors.email && touched.email && (
                      <p className="text-red-600">{errors.email}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="inputbox">
                    <ion-icon name="lock-closed-outline"></ion-icon>
                    <input
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="password"
                      placeholder="Password"
                    />
                    <label htmlFor="password">Password</label>
                    {errors.password && touched.password && (
                      <p className="text-red-600">{errors.password}</p>
                    )}
                  </div>
                </div>
                <div className="col">
                  <div className="inputbox">
                    <ion-icon name="lock-closed-outline"></ion-icon>
                    <input
                      name="cpassword"
                      value={values.cpassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="password"
                      placeholder="Confirm Password"
                    />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    {errors.cpassword && touched.cpassword && (
                      <p className="text-red-600">{errors.cpassword}</p>
                    )}
                  </div>
                </div>
              </div>
              <button type="submit">Sign Up</button>
              <div className="register">
                <p style={{ display: "flex", justifyContent: "space-between" }}>
                  Already have an account? <Link to="/login">login</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UserSignup;