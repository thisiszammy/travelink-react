import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import './login-page.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import travelinkLogo from '../../res/images/travelinklogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faSignIn, faUnlockAlt, faUserPlus, faPlane, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('User logged in successfully!');
      navigate('/landing');
    } catch (error: any) {
      console.error("Error logging in user: ", error);
      alert('Error logging in user: ' + error.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert('User logged in with Google!');
      navigate('/landing');
    } catch (error: any) {
      console.error("Error logging in with Google: ", error);
      alert('Error logging in with Google: ' + error.message);
    }
  };

  const handleFacebookLogin = async () => {
    const provider = new FacebookAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert('User logged in with Facebook!');
      navigate('/landing');
    } catch (error: any) {
      console.error("Error logging in with Facebook: ", error);
      alert('Error logging in with Facebook: ' + error.message);
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  const handleForgotPassword = () => {
    navigate('/forgotpassword');
  };

  return (
    <div className="main-container">
      <div className="content-container">
        <div className="left-container">
          <div className="logo-container">
            <img src={travelinkLogo} className="logo-img" alt="Travelink Logo" />
          </div>
          <div className="login-form">
            <h2 className="text-center mb-1">Login</h2>
            <p className="text-center">Access your Travelink account</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">
                  <FontAwesomeIcon icon={faEnvelope} /> Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                />
              </div>
              <div className="form-group password-group">
                <label htmlFor="password">
                  <FontAwesomeIcon icon={faLock} /> Password
                </label>
                <div className="password-container">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                  />
                  <span className="password-toggle-icon" onClick={handlePasswordToggle}>
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </span>
                </div>
              </div>
              <button type="submit" className="btn btn-login btn-block">
                <FontAwesomeIcon icon={faSignIn} /> Link Your Travel
              </button>
            </form>
            <div className="social-login text-center mt-4">
              <button className="btn btn-google" onClick={handleGoogleLogin}>
                <FontAwesomeIcon icon={faGoogle} /> Sign in with Gmail
              </button>
              <button className="btn btn-facebook" onClick={handleFacebookLogin}>
                <FontAwesomeIcon icon={faFacebook} /> Login with Facebook
              </button>
            </div>
            <p className="forgot-password mt-3">
              <button onClick={handleForgotPassword} className="btn-link">
                <FontAwesomeIcon icon={faUnlockAlt} /> Forgot Password?
              </button>
            </p>
            <p className="register-link mt-4">
              Don't have an account?
              <button onClick={handleRegisterRedirect} className="btn-link">
                <FontAwesomeIcon icon={faUserPlus} /> Join now
              </button>
            </p>
          </div>
        </div>
        <div className="right-container">
          <p>Your adventure begins here. Explore CEBU with us!</p>
          <FontAwesomeIcon icon={faPlane} size="3x" />
        </div>
      </div>
    </div>
  );
};

export default Login;
