import React from 'react';
import { useNavigate } from 'react-router-dom';
import './login-page.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import travelinklogo from '../../res/images/travelinklogo.png'; // Import the logo image

const Login = () => {
  const navigate = useNavigate();

  const handleFacebookLogin = () => {
    // Implement Facebook login logic here
    alert('Facebook login functionality is not implemented.');
  };

  const handleKakaoLogin = () => {
    // Implement Kakao login logic here
    alert('Kakao login functionality is not implemented.');
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className="main-container">
      <div className="content-container">
        <div className="left-container">
          <div className="logo-container">
            <img src={travelinklogo} className="logo-img" alt="Travelink Logo" />
          </div>
          <div className="login-form">
            <h2 className="text-center mb-1">Login</h2>
            <form action="/Customer/Login" method="POST">
              <div className="form-group">
                <label htmlFor="username">
                  <i className="fa fa-user"></i> Username
                </label>
                <input type="text" className="form-control" id="username" name="Username" required />
              </div>
              <div className="form-group">
                <label htmlFor="password">
                  <i className="fa fa-lock"></i> Password
                </label>
                <input type="password" className="form-control" id="password" name="Password" required />
              </div>
              <button type="submit" className="btn btn-login btn-block">Link Your Travel</button>
            </form>
            <div className="social-login text-center mt-4">
              <button className="btn btn-facebook" onClick={handleFacebookLogin}>
                <i className="fab fa-facebook-f"></i> Login with Facebook
              </button>
              <button className="btn btn-kakao" onClick={handleKakaoLogin}>
                <i className="fas fa-sun"></i> Login with Sunny KakaoTalk
              </button>
            </div>
            <p className="register-link mt-4">
              <label htmlFor="username">Don't have an account?
                <button onClick={handleRegisterRedirect} className="btn-link"> Join now</button>
              </label>
            </p>
          </div>
        </div>
        <div className="right-container">
          <h1>Welcome to Travelink</h1>
          <p>Your adventure begins here. Explore the world with us!</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
