import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider, sendEmailVerification } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import travelinkLogo from '../../res/images/travelinklogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faSignIn, faUnlockAlt, faUserPlus, faPlane, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

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
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        Swal.fire({
          icon: 'warning',
          title: 'Email not verified',
          text: 'Please verify your email before logging in. A new verification email has been sent to your email address.',
          confirmButtonText: 'Done',
          customClass: {
            confirmButton: 'btn btn-warning'
          }
        });
        await sendEmailVerification(user);
        await auth.signOut();
        return;
      }

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'User logged in successfully!',
        confirmButtonText: 'Done',
        customClass: {
          confirmButton: 'btn btn-success'
        }
      }).then(() => {
        navigate('/landing');
      });
    } catch (error: any) {
      console.error("Error logging in user: ", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `Error logging in user: ${error.message}`,
        confirmButtonText: 'Done',
        customClass: {
          confirmButton: 'btn btn-danger'
        }
      });
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      if (!user.emailVerified) {
        Swal.fire({
          icon: 'warning',
          title: 'Email not verified',
          text: 'Please verify your email before logging in. A new verification email has been sent to your email address.',
          confirmButtonText: 'Done',
          customClass: {
            confirmButton: 'btn btn-warning'
          }
        });
        await sendEmailVerification(user);
        await auth.signOut();
        return;
      }

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'User logged in with Google!',
        confirmButtonText: 'Done',
        customClass: {
          confirmButton: 'btn btn-success'
        }
      }).then(() => {
        navigate('/landing');
      });
    } catch (error: any) {
      console.error("Error logging in with Google: ", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `Error logging in with Google: ${error.message}`,
        confirmButtonText: 'Done',
        customClass: {
          confirmButton: 'btn btn-danger'
        }
      });
    }
  };

  const handleFacebookLogin = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      if (!user.emailVerified) {
        Swal.fire({
          icon: 'warning',
          title: 'Email not verified',
          text: 'Please verify your email before logging in. A new verification email has been sent to your email address.',
          confirmButtonText: 'Done',
          customClass: {
            confirmButton: 'btn btn-warning'
          }
        });
        await sendEmailVerification(user);
        await auth.signOut();
        return;
      }

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'User logged in with Facebook!',
        confirmButtonText: 'Done',
        customClass: {
          confirmButton: 'btn btn-success'
        }
      }).then(() => {
        navigate('/landing');
      });
    } catch (error: any) {
      console.error("Error logging in with Facebook: ", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `Error logging in with Facebook: ${error.message}`,
        confirmButtonText: 'Done',
        customClass: {
          confirmButton: 'btn btn-danger'
        }
      });
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  const handleForgotPassword = () => {
    navigate('/forgotpassword');
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
          className="bg-white w-full max-w-4xl shadow-lg rounded-lg flex overflow-hidden"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-full md:w-1/2 p-12">
            <div className="mb-6 text-center">
              <img src={travelinkLogo} className="w-32 h-32 rounded-full mx-auto" alt="Travelink Logo" />
            </div>
            <div className="login-form text-center">
              <h2 className="text-2xl mb-4 font-bold">Login</h2>
              <p className="mb-4">Access your Travelink account</p>
              <form onSubmit={handleSubmit}>
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
                <motion.div className="password-group mb-4 text-left" whileHover={{ scale: 1.05 }} whileFocus={{ scale: 1.05 }}>
                  <label htmlFor="password" className="block mb-2">
                    <FontAwesomeIcon icon={faLock} /> Password
                  </label>
                  <div className="password-container relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="w-full px-4 py-2 border border-gray-300 rounded"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Enter your password"
                    />
                    <span className="password-toggle-icon absolute right-3 top-3 cursor-pointer" onClick={handlePasswordToggle}>
                      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </span>
                  </div>
                </motion.div>
                <motion.button
                  type="submit"
                  className="bg-blue-700 text-white font-bold py-2 rounded w-full hover:bg-blue-800"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FontAwesomeIcon icon={faSignIn} /> Link Your Travel
                </motion.button>
              </form>
              <div className="social-login text-center mt-4">
                <motion.button
                  className="bg-red-600 text-white py-2 rounded w-full mb-2 hover:bg-red-700"
                  onClick={handleGoogleLogin}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FontAwesomeIcon icon={faGoogle} /> Sign in with Gmail
                </motion.button>
                <motion.button
                  className="bg-blue-600 text-white py-2 rounded w-full mb-2 hover:bg-blue-700"
                  onClick={handleFacebookLogin}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FontAwesomeIcon icon={faFacebook} /> Login with Facebook
                </motion.button>
              </div>
              <p className="forgot-password mt-4">
                <motion.button onClick={handleForgotPassword} className="text-blue-500 hover:underline" whileHover={{ scale: 1.1 }}>
                  <FontAwesomeIcon icon={faUnlockAlt} /> Forgot Password?
                </motion.button>
              </p>
              <p className="register-link mt-4">
                Don't have an account?
                <motion.button onClick={handleRegisterRedirect} className="text-blue-500 hover:underline" whileHover={{ scale: 1.1 }}>
                  <FontAwesomeIcon icon={faUserPlus} /> Join now
                </motion.button>
              </p>
            </div>
          </div>
          <div className="hidden md:flex w-1/2 bg-customBlue text-white flex-col justify-center items-center p-12">
            <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
            <p className="text-xl">Join us and start your adventure. Explore the beauty of Cebu with us!</p>
            <FontAwesomeIcon icon={faPlane} size="3x" className="mt-8" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Login;
