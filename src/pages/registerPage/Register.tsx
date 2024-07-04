import React, { useState } from 'react';
import './register-page.css'; // Add your CSS styling here
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Static credentials for registration
    const staticEmail = "test@example.com";
    const staticPassword = "password123";
    const staticUsername = "testuser";

    if (email === staticEmail && password === staticPassword && username === staticUsername) {
      alert('User registered successfully with static credentials!');
      // Redirect to login page or another page
    } else {
      alert('Invalid credentials. Please use the static credentials to register.');
    }
  };

  return (
    <div className="main-container">
      <div className="register-container">
        <h2 className="text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e: any) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-register btn-block">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
