// src/pages/Register.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register-page.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import travelinkLogo from '../../res/images/travelinklogo.png';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await addDoc(collection(db, "users"), {
        uid: user.uid,
        username: username,
        email: email,
      });

      alert('User registered successfully!');
      navigate('/login'); // Redirect to login page
    } catch (error: any) {
      console.error("Error registering user: ", error);
      alert('Error registering user: ' + error.message);
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="main-container">
      <div className="content-container">
        <div className="left-container">
          <div className="logo-container">
            <img src={travelinkLogo} className="logo-img" alt="Travelink Logo" />
          </div>
          <div className="register-form">
            <h2 className="text-center mb-1">Register</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">
                  <i className="fa fa-user"></i> Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
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
              <button type="submit" className="btn btn-register btn-block">Join Travelink</button>
            </form>
            <p className="login-link mt-4">
              Already have an account?
              <button onClick={handleLoginRedirect} className="btn-link"> Login here</button>
            </p>
          </div>
        </div>
        <div className="right-container">
          <h1>Welcome to Travelink</h1>
          <p>Join us and start your adventure. Explore the world with us!</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
