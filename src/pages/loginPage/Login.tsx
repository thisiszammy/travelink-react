import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import './login-page.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import travelinkLogo from '../../res/images/travelinklogo.png';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
            <img src={travelinkLogo} className="logo-img" alt="Travelink Logo" />
          </div>
          <div className="login-form">
            <h2 className="text-center mb-1">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">
                  <i className="fa fa-envelope"></i> Email
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
              <div className="form-group">
                <label htmlFor="password">
                  <i className="fa fa-lock"></i> Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
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
              Don't have an account?
              <button onClick={handleRegisterRedirect} className="btn-link"> Join now</button>
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
