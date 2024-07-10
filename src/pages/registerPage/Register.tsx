import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register-page.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import travelinkLogo from '../../res/images/travelinklogo.png';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [birthday, setBirthday] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await addDoc(collection(db, "users"), {
        uid: user.uid,
        username: username,
        email: email,
        birthday: birthday,
      });

      await sendEmailVerification(user);
      alert('Registration successful! Please check your email to verify your account.');
    } catch (error: any) {
      console.error("Error registering user: ", error);
      alert('Error registering user: ' + error.message);
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
                <label htmlFor="username"><i className="fa fa-user"></i> Username</label>
                <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="email"><i className="fa fa-envelope"></i> Email</label>
                <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="password"><i className="fa fa-lock"></i> Password</label>
                <input type={showPassword ? "text" : "password"} className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} onClick={togglePasswordVisibility} className="password-toggle-icon" />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword"><i className="fa fa-lock"></i> Confirm Password</label>
                <input type={showConfirmPassword ? "text" : "password"} className="form-control" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} onClick={toggleConfirmPasswordVisibility} className="password-toggle-icon" />
              </div>
              <div className="form-group">
              <label htmlFor="username"><i className="fa fa-birthday-cake"></i> Birthdate</label>
                <input type="date" className="form-control" id="birthday" value={birthday} onChange={(e) => setBirthday(e.target.value)} required />
              </div>
              <button className="btn btn-register btn-block">Join Travelink</button>
            </form>
            <p className="login-link mt-4">
              Already have an account?
              <button onClick={handleLoginRedirect} className="btn-link"> Login here</button>
            </p>
          </div>
        </div>
        <div className="right-container">
          <p>Join us and start your adventure. Explore the beauty of Cebu with us!</p>
          <FontAwesomeIcon icon={faPlane} size="3x" />
        </div>
      </div>
    </div>
  );
};

export default Register;
