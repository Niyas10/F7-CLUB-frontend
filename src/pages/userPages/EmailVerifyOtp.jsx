import React, { useRef, useState, useEffect } from "react";
import { verifyOtp, clientForgotResendOtp } from "../../api/userApi";
import { useNavigate, useParams } from "react-router-dom";
import './EmailVerifyOtp.css';

const EmailVerifyOtp = () => {
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const [otpInputs, setOtpInputs] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [resendCount, setResendCount] = useState(0);
  const [timer, setTimer] = useState(30);
  const navigate = useNavigate();
  const { id: userId } = useParams();

  useEffect(() => {
    setError("");
    setMessage("");
  }, []);

  useEffect(() => {
    let timerInterval;
    if (resendCount < 3 && timer > 0) {
      timerInterval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => clearInterval(timerInterval);
  }, [resendCount, timer]);

  const handleInputChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setOtpInputs((prevInputs) => {
      const newInputs = [...prevInputs];
      newInputs[index] = value;
      return newInputs;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const otp = otpInputs.join("");
      if (otp.length !== 4) {
        setError("Please enter a valid 4-digit OTP.");
        return;
      }
      const response = await verifyOtp(otp, userId);
      if (response.status) {
        navigate(`/resetPassword/${userId}`);
      } else {
        setError(response.message || "Incorrect OTP, please try again.");
        setOtpInputs(["", "", "", ""]);
        inputRefs[0].current.focus();
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError(error.response?.data?.message || "Failed to verify OTP. Please try again later.");
    }
  };

  const handleKeyUp = (e, index) => {
    if (e.target.value && index < 3) {
      inputRefs[index + 1].current.focus();
    } else if (e.key === 'Backspace' && !e.target.value && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleResendOtp = async () => {
    if (resendCount >= 3) {
      navigate('/login');
      return;
    }
    
    setError("");
    setMessage("");
    try {
      const response = await clientForgotResendOtp(userId);
      if (response.status) {
        setMessage("OTP has been resent successfully.");
        setOtpInputs(["", "", "", ""]);
        inputRefs[0].current.focus();
        setResendCount((prevCount) => prevCount + 1);
        setTimer(30); // reset timer
      } else {
        setError(response.message || "Failed to resend OTP. Please try again later.");
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      setError(error.response?.data?.message || "Failed to resend OTP. Please try again later.");
    }
  };

  return (
    <div className="email-verify-container">
      <div className="email-verify-card">
        <h2 className="email-verify-title">Enter OTP to Verify</h2>
        <form onSubmit={handleSubmit}>
          <div className="email-verify-inputs">
            {[0, 1, 2, 3].map((index) => (
              <div key={index} className="email-verify-input-container">
                <input
                  maxLength={1}
                  ref={inputRefs[index]}
                  value={otpInputs[index]}
                  onChange={(e) => handleInputChange(e, index)}
                  onKeyUp={(e) => handleKeyUp(e, index)}
                  className="email-verify-input"
                  type="text"
                  inputMode="numeric"
                  pattern="\d*"
                />
              </div>
            ))}
          </div>
          {error && <div className="email-verify-error">{error}</div>}
          {message && <div className="email-verify-message">{message}</div>}
          <div className="email-verify-submit-container">
            <button type="submit" className="email-verify-submit">Submit</button>
          </div>
        </form>
        <button
          onClick={handleResendOtp}
          className="email-verify-resend"
          disabled={timer > 0}
        >
          Resend OTP {timer > 0 && `(${timer}s)`}
        </button>
      </div>
    </div>
  );
};

export default EmailVerifyOtp;
