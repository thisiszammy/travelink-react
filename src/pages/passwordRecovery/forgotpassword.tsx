import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebaseConfig'; // Adjust path as necessary
import './forgot-password.css'; // Adjust path as necessary
import 'bootstrap/dist/css/bootstrap.min.css';
import travelinkLogo from '../../res/images/travelinklogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset link sent! Check your email.');
    } catch (error: any) {
      console.error("Error resetting password: ", error);
      setMessage('Error resetting password: ' + error.message);
    }
  };

  const handleBackToLogin = () => {
    navigate('/');
  };

  return (
    <div className="maincontainer">
      <div className="contentcontainer">
        <div className="logocontainer">
          <img src={travelinkLogo} className="logo-img" alt="Travelink Logo" />
        </div>
        <div className="forgot-password-form">
          <h2 className="text-center mb-1">Forgot Password?</h2>
          <p>No worries, we'll send you a link to reset your password.</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">
                <FontAwesomeIcon icon={faEnvelope} /> Enter your email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-reset btn-block">Send Reset Link</button>
          </form>
          {message && <p className="message mt-3">{message}</p>}
          <p className="back-to-login mt-3">
            <button onClick={handleBackToLogin} className="btn-link">
              <FontAwesomeIcon icon={faArrowLeft} /> Back to Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
