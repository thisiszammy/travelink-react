import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
<<<<<<< HEAD
import { auth } from '../../firebaseConfig'; // Adjust path as necessary
=======
import { auth } from '../../data/firebaseConfig'; // Adjust path as necessary
import './forgot-password.css'; // Adjust path as necessary
import 'bootstrap/dist/css/bootstrap.min.css';
>>>>>>> master
import travelinkLogo from '../../res/images/travelinklogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await sendPasswordResetEmail(auth, email);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Password reset link sent! Check your email.',
        confirmButtonText: 'Done',
        customClass: {
          confirmButton: 'btn btn-success'
        }
      });
    } catch (error: any) {
      console.error("Error resetting password: ", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `Error resetting password: ${error.message}`,
        confirmButtonText: 'Done',
        customClass: {
          confirmButton: 'btn btn-danger'
        }
      });
    }
  };

  const handleBackToLogin = () => {
    navigate('/');
  };

  return (
    <motion.div
      className="relative flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('../../res/images/cebu3.jpg')` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative flex items-center justify-center w-full h-full">
        <motion.div
          className="w-96 bg-white bg-opacity-90 rounded-lg shadow-lg p-10 text-center"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-6">
            <img src={travelinkLogo} className="w-24 h-24 rounded-full object-cover mx-auto" alt="Travelink Logo" />
          </div>
          <div className="forgot-password-form">
            <h2 className="text-2xl mb-4">Forgot Password?</h2>
            <p className="mb-6">No worries, we'll send you a link to reset your password.</p>
            <form onSubmit={handleSubmit}>
              <motion.div className="mb-4" whileHover={{ scale: 1.05 }} whileFocus={{ scale: 1.05 }}>
                <label htmlFor="email" className="block text-left mb-2">
                  <FontAwesomeIcon icon={faEnvelope} /> Enter your email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </motion.div>
              <motion.button
                type="submit"
                className="w-full bg-blue-900 text-white  py-2 rounded transition-colors duration-300 hover:bg-blue-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >Send Reset Link
              </motion.button>
            </form>
            <p className="mt-6">
              <motion.button onClick={handleBackToLogin} className="text-blue-500 hover:text-blue-700 transition-colors duration-300" whileHover={{ scale: 1.1 }}>
                <FontAwesomeIcon icon={faArrowLeft} /> Back to Login
              </motion.button>
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ForgotPassword;
