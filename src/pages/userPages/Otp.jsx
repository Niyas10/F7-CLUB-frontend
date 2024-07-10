import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { otpSchema } from "../../validation/user/otpValidation";
import { useLocation, useNavigate } from "react-router-dom";
import { otpVerification, clientResendOtp } from "../../api/userApi";
import './Otp.css'

const Otp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userEmail, otpId, userId } = location.state;
  const [countDown, setCountDown] = useState(30);
  const [showResendButton, setShowResendButton] = useState(false);
  const [message, setMessage] = useState(null);
  const [resendCount, setResendCount] = useState(0);
  const RESEND_LIMIT = 3;

  const resendOTP = async () => {
    try {
      if (resendCount < RESEND_LIMIT) {
        const res = await clientResendOtp(userEmail);
        if (res?.status === 200) {
          setMessage({ type: "success", text: res.data.message });
          setCountDown(30);
          setShowResendButton(false);
          setResendCount(resendCount + 1);
        }
      } else {
        setMessage({ type: "error", text: "Resend limit reached. Please try again later." });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to resend OTP. Please try again." });
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (countDown > 0) {
      const timer = setInterval(() => {
        setCountDown((prevCountDown) => prevCountDown - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setShowResendButton(true);
    }
  }, [countDown]);

  const onSubmit = async (values) => {
    try {
      const combinedOtp = Object.values(values).join("");
      const res = await otpVerification(combinedOtp, otpId, userId);
      if (res?.data?.status) {
        navigate("/login", { state: "Email verified" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "OTP verification failed. Please try again." });
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

  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  const handleKeyUp = (e, index) => {
    if (e.target.value && index < 3) {
      inputRefs[index + 1].current.focus();
    } else if (!e.target.value && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleResignup = () => {
    navigate("/signup");
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
      <div className="card otp-section p-4 text-center shadow-sm  otp-card" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="mb-4" style={{ color: "black" }}>Enter OTP to Verify</h2>
        {message && (
          <p style={{ color: message.type === "error" ? "red" : "green" }}>
            {message.text}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="d-flex justify-content-center mb-3">
            {['otp1', 'otp2', 'otp3', 'otp4'].map((otp, index) => (
              <div key={index} className="mx-1">
                <input
                  name={otp}
                  maxLength={1}
                  ref={inputRefs[index]}
                  value={values[otp]}
                  onChange={handleChange}
                  onKeyUp={(e) => handleKeyUp(e, index)}
                  className="form-control text-center rounded"
                  type="text"
                  style={{ width: "50px", height: "50px", fontSize: "24px" }}
                />
                {errors[otp] && touched[otp] && (
                  <p className="text-danger">{errors[otp]}</p>
                )}
              </div>
            ))}
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-danger px-4">
              Submit
            </button>
          </div>
          <div className="text-center text-sm font-medium text-gray-500">
            {countDown > 0 ? (
              <p>Resend OTP in {countDown} seconds</p>
            ) : (
              showResendButton && (
                <>
                  {resendCount < RESEND_LIMIT ? (
                    <>
                      <p>Didn't receive code?</p>
                      <button
                        type="button"
                        className="btn btn-link p-0 text-danger"
                        onClick={resendOTP}
                        disabled={resendCount >= RESEND_LIMIT}
                      >
                        Resend OTP
                      </button>
                    </>
                  ) : (
                    <>
                      <p>Resend limit reached.</p>
                      <button
                        type="button"
                        className="btn btn-link p-0 text-danger"
                        onClick={handleResignup}
                      >
                        Re-signup
                      </button>
                    </>
                  )}
                </>
              )
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Otp;
