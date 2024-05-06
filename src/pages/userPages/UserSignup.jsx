
import React from "react";
import "./UserSignup.css";
import { useFormik } from "formik";
import { userSignup } from "../../api/userApi";
import { useNavigate,Link } from "react-router-dom";

function UserSignup() {
  const navigate = useNavigate()
  async function onSubmit() {
    try {
      const res = await userSignup(values);
      if (res?.status === 201) {
        const { user, otpId } = res.data;
        navigate('/otp',{
          state:{userEmail:user.email,otpId:otpId,userId:user._id}
        })
      }
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  }

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
        cpassword: "",
      },
      onSubmit,
    });

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
                  required
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
                  type="tex"
                  placeholder="Email"
                  required
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
                  required
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
                  required
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
              Already have an account?  <Link to="/login">login</Link>
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