import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import { verifyEmail } from "../../api/userApi";
import './ForgetPassword.css';

function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await verifyEmail(email);
      setMessage(response.data.userId);
      if (response.status === 200) {
        navigate(`/otpVerify/${response.data.userId}`);
      }
    } catch (error) {
      setMessage(error.response.data.message);
    }
  }

  return (
    <>
      <section id="user-login-section">
        <div id="user-forget-form-box" className="form-container">
          <div className="form-content">
            <h2>Enter your email</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-field">
                <ion-icon name="mail-outline"></ion-icon>
                <input
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                />
                <label htmlFor="email">Email</label>
              </div>
              <button type="submit">Submit</button>
            </form>
            {message && <p>{message}</p>}
          </div>
        </div>
      </section>
    </>
  );
}

export default ForgetPassword;
