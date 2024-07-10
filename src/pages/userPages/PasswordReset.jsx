import React, { useState } from 'react';
import { resetPassword } from '../../api/userApi';
import { useNavigate, useParams } from 'react-router-dom';
import { passwordSchema } from '../../validation/user/passwordValidation';
import { useFormik } from 'formik';

function PasswordReset() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: passwordSchema,
    onSubmit: async (values) => {
      setError('');
      if (values.password !== values.confirmPassword) {
        setError('Password do not match');
        return;
      }

      try {
        const response = await resetPassword(values.password, id);
        if (response?.status === 200) {
          navigate('/login');
        } else {
          setError(response.data.message || 'Failed to reset password');
        }
      } catch (error) {
        console.log('Error resetting password');
      }
    },
  });

  return (
    <>
      <section id="user-login-section">
        <div id="user-forget-form-box" className="form-container">
          <div className="form-content">
            <h2>Reset Password</h2>
            <form onSubmit={formik.handleSubmit}>
              <div className="input-field">
                <ion-icon name="lock-closed-outline"></ion-icon>
                <input
                  name="password"
                  type="password"
                  placeholder="New Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                <label htmlFor="password">New Password</label>
                {formik.touched.password && formik.errors.password && (
                  <p className="error">{formik.errors.password}</p>
                )}
              </div>
              <div className="input-field">
                <ion-icon name="lock-closed-outline"></ion-icon>
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                <label htmlFor="confirmPassword">Confirm Password</label>
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                  <p className="error">{formik.errors.confirmPassword}</p>
                )}
                {error && <p className="error">{error}</p>}
              </div>
              <button type="submit" disabled={!formik.isValid}>
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default PasswordReset;