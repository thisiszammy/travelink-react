import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import travelinkLogo from '../../res/images/travelinklogo.png';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../../data/firebaseConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane, faEye, faEyeSlash, faBirthdayCake, faLock, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import cebuBay from '../../res/images/cebu1.jpg';

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
      Swal.fire({
        icon: 'error',
        title: 'Ooops',
        text: 'Passwords do not match!',
        confirmButtonText: 'Done',
        customClass: {
          confirmButton: 'btn btn-danger'
        }
      });
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
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'Please check your email to verify your account.',
        confirmButtonText: 'Done',
        customClass: {
          confirmButton: 'btn btn-success'
        }
      }).then(() => {
        navigate('/login');
      });
    } catch (error: any) {
      console.error("Error registering user: ", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `Error registering user: ${error.message}`,
        confirmButtonText: 'Done',
        customClass: {
          confirmButton: 'btn btn-danger'
        }
      });
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
    <motion.div
      className="relative flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${cebuBay})` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative flex items-center justify-center w-full h-full">
        <motion.div
          className="bg-white w-full max-w-4xl shadow-lg rounded-lg flex overflow-hidden"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-full md:w-1/2 p-12">
            <div className="mb-6 text-center">
              <img src={travelinkLogo} className="w-32 h-32 rounded-full mx-auto" alt="Travelink Logo" />
            </div>
            <div className="register-form text-center">
              <h2 className="text-2xl mb-4 font-bold">Register</h2>
              <form onSubmit={handleSubmit}>
                <motion.div className="form-group mb-4 text-left" whileHover={{ scale: 1.05 }} whileFocus={{ scale: 1.05 }}>
                  <label htmlFor="username" className="block mb-2">
                    <FontAwesomeIcon icon={faUser} /> Username
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    placeholder="Enter your username"
                  />
                </motion.div>
                <motion.div className="form-group mb-4 text-left" whileHover={{ scale: 1.05 }} whileFocus={{ scale: 1.05 }}>
                  <label htmlFor="email" className="block mb-2">
                    <FontAwesomeIcon icon={faEnvelope} /> Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                  />
                </motion.div>
                <motion.div className="form-group mb-4 text-left" whileHover={{ scale: 1.05 }} whileFocus={{ scale: 1.05 }}>
                  <label htmlFor="password" className="block mb-2">
                    <FontAwesomeIcon icon={faLock} /> Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full px-4 py-2 border border-gray-300 rounded"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Enter your password"
                    />
                    <span className="absolute right-3 top-3 cursor-pointer" onClick={togglePasswordVisibility}>
                      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </span>
                  </div>
                </motion.div>
                <motion.div className="form-group mb-4 text-left" whileHover={{ scale: 1.05 }} whileFocus={{ scale: 1.05 }}>
                  <label htmlFor="confirmPassword" className="block mb-2">
                    <FontAwesomeIcon icon={faLock} /> Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className="w-full px-4 py-2 border border-gray-300 rounded"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      placeholder="Confirm your password"
                    />
                    <span className="absolute right-3 top-3 cursor-pointer" onClick={toggleConfirmPasswordVisibility}>
                      <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                    </span>
                  </div>
                </motion.div>
                <motion.div className="form-group mb-4 text-left relative" whileHover={{ scale: 1.05 }} whileFocus={{ scale: 1.05 }}>
                  <label htmlFor="birthday" className="block mb-2">
                    <FontAwesomeIcon icon={faBirthdayCake}/> Birthdate
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                    id="birthday"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                  />
                </motion.div>
                <motion.button
                  type="submit"
                  className="bg-blue-900 text-white py-2 rounded w-full hover:bg-blue-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Join Travelink
                </motion.button>
              </form>
              <p className="login-link mt-4">
                Already have an account?
                <motion.button onClick={handleLoginRedirect} className="text-blue-500 hover:underline" whileHover={{ scale: 1.1 }}>
                  Login here
                </motion.button>
              </p>
            </div>
          </div>
          <div className="hidden md:flex w-1/2 bg-customBlue text-white flex-col justify-center items-center p-12">
            <h1 className="text-4xl font-bold mb-4">Welcome!</h1>
            <p className="text-xl">Join us and start your adventure. Explore the beauty of Cebu with us!</p>
            <FontAwesomeIcon icon={faPlane} size="3x" className="mt-8" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Register;
