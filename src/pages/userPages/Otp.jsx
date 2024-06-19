import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { otpSchema } from "../../validation/user/otpValidation";
import { useLocation, useNavigate } from "react-router-dom";
import { otpVerification } from "../../api/userApi";

const Otp = () => {
  
  const location = useLocation();
  const navigate = useNavigate();
  const { userEmail, otpId, userId } = location.state;

  const onSubmit = async () => {
    try {
      const combinedOtp = Object.values(values).join("");
      const res = await otpVerification(combinedOtp, otpId, userId);
      if (res?.data?.status) {
        navigate("/login", { state: "Email verified" });
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      otp1: "",
      otp2: "",
      otp3: "",
      otp4: "",
    },
    validationSchema: otpSchema,
    onSubmit,
  });

  const input1Ref = useRef();
  const input2Ref = useRef();
  const input3Ref = useRef();
  const input4Ref = useRef();

  const handleKeyUp = (e) => {
    switch (e.target.name) {
      case "otp1":
        input2Ref.current.focus();
        if (!e.target.value) {
          input1Ref.current.focus();
        } else {
          input2Ref.current.focus();
        }
        break;
      case "otp2":
        if (!e.target.value) {
          input1Ref.current.focus();
        } else {
          input3Ref.current.focus();
        }
        break;
      case "otp3":
        if (!e.target.value) {
          input2Ref.current.focus();
        } else {
          input4Ref.current.focus();
        }
        break;
      case "otp4":
        if (!e.target.value) {
          input3Ref.current.focus();
        } else {
          input4Ref.current.focus();
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 text-center">
          <h2 style={{ color: "black" }}>Enter OTP to Verify</h2>
          <form onSubmit={handleSubmit}>
            <div className="inputs d-flex justify-content-center">
              <input
                name="otp1"
                maxLength={1}
                ref={input1Ref}
                value={values.otp1}
                onChange={handleChange}
                onKeyUp={handleKeyUp}
                className="m-2 text-center form-control rounded"
                type="text"
                style={{ width: "50px", height: "50px", fontSize: "24px" }}
              />{" "}
              {errors.otp1 && touched.otp1 && (
                <p className="text-red-600">{errors.otp1}</p>
              )}
              <input
                name="otp2"
                maxLength={1}
                ref={input2Ref}
                value={values.otp2}
                onChange={handleChange}
                onKeyUp={handleKeyUp}
                className="m-2 text-center form-control rounded"
                type="text"
                style={{ width: "50px", height: "50px", fontSize: "24px" }}
              />
              {errors.otp2 && touched.otp2 && (
                <p className="text-red-600">{errors.otp2}</p>
              )}
              <input
                name="otp3"
                maxLength={1}
                ref={input3Ref}
                value={values.otp3}
                onChange={handleChange}
                onKeyUp={handleKeyUp}
                className="m-2 text-center form-control rounded"
                type="text"
                style={{ width: "50px", height: "50px", fontSize: "24px" }}
              />{" "}
              {errors.otp3 && touched.otp3 && (
                <p className="text-red-600">{errors.otp3}</p>
              )}
              <input
                name="otp4"
                maxLength={1}
                ref={input4Ref}
                value={values.otp4}
                onChange={handleChange}
                onKeyUp={handleKeyUp}
                className="m-2 text-center form-control rounded"
                type="text"
                style={{ width: "50px", height: "50px", fontSize: "24px" }}
              />
              {errors.otp4 && touched.otp4 && (
                <p className="text-red-600">{errors.otp4}</p>
              )}
            </div>
          <div className="mt-4">
            <div
              className="row"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div className="col-lg-6">
                <button type="submit" className="btn btn-danger px-4 validate">
                  submit
                </button>
              </div>
            </div>
          </div>
          {/* <div className="mt-3">
            <a href="#" className="text-decoration-none ms-3">
              count
            </a>
          </div> */}
          </form>

        </div>
      </div>
    </>
  );
};

export default Otp;
