import './PasswordAndSecurity.css';
import React, { useState, useEffect } from 'react';
import Drawer from '../../components/Drawer/Drawer';
import TopBar from '../../components/LandingNavBar';
import { auth, signInWithPhoneNumber } from '../../data/firebaseConfig';
import Swal from 'sweetalert2';
import { reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const PasswordAndSecurity: React.FC = () => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const handleOpenChangePassword = () => setShowChangePassword(true);
  const handleCloseChangePassword = () => {
    setShowChangePassword(false);
    setOldPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  const handleOpenTwoFactor = () => setShowTwoFactor(true);
  const handleCloseTwoFactor = () => {
    setShowTwoFactor(false);
    setOtpSent(false);
    setOtp("");
    setPhoneNumber("");
  };

  useEffect(() => {
    if (showChangePassword || showTwoFactor) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [showChangePassword, showTwoFactor]);

  const handleSendOtp = async () => {
    const customVerifier = {
      type: 'recaptcha',
      verify: () => Promise.resolve(''),
    };

    try {
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, customVerifier as any);
      setOtpSent(true);
      (window as any).confirmationResult = confirmationResult;
      Swal.fire({
        icon: 'success',
        title: 'OTP Sent',
        text: 'An OTP has been sent to your mobile number.',
      });
    } catch (error) {
      console.error("Error during OTP sending: ", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to send OTP. Please try again.',
      });
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const result = await (window as any).confirmationResult.confirm(otp);
      // Successfully signed in with OTP
      // Enable/Disable two-factor authentication here
      console.log('OTP verified successfully', result);
      Swal.fire({
        icon: 'success',
        title: 'OTP Verified',
        text: 'Your OTP has been verified successfully.',
      });
    } catch (error) {
      console.error("Error during OTP verification: ", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to verify OTP. Please try again.',
      });
    }
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmNewPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'New passwords do not match. Please try again.',
      });
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to change your password?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, change it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const user = auth.currentUser;
          if (user && oldPassword) {
            const credential = EmailAuthProvider.credential(
              user.email!,
              oldPassword
            );
            await reauthenticateWithCredential(user, credential);
            await updatePassword(user, newPassword);
            Swal.fire(
              'Changed!',
              'Your password has been changed.',
              'success'
            ).then(() => {
              handleCloseChangePassword(); // Close the dialog and reset the states
            });
          }
        } catch (error) {
          console.error("Error changing password: ", error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to change password. Please try again.',
          });
        }
      }
    });
  };

  return (
    <div className="password-security bg-[#336488] h-screen w-full flex flex-col items-center">
      <Drawer />
      <TopBar />
      <br />
      <h1 className='pt-[75px] text-white'>PASSWORD & SECURITY</h1>

      <div className="password-card">
        <br />
        <button onClick={handleOpenChangePassword}>Change Password</button>
        <button onClick={handleOpenTwoFactor}>Two-Factor Authentication</button>
      </div>

      {showChangePassword && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Change Password</h2>
            <form className="space-y-4">
              <label className="block">
                Enter Old Password
                <div className="flex items-center mt-1">
                  <input className='text-black border rounded-md px-2 py-1 flex-grow' type={showOldPassword ? "text" : "password"} value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                  <FontAwesomeIcon icon={showOldPassword ? faEyeSlash : faEye} onClick={() => setShowOldPassword(!showOldPassword)} className="ml-2 cursor-pointer" />
                </div>
              </label>
              <label className="block">
                Enter New Password
                <div className="flex items-center mt-1">
                  <input className='text-black border rounded-md px-2 py-1 flex-grow' type={showNewPassword ? "text" : "password"} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                  <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} onClick={() => setShowNewPassword(!showNewPassword)} className="ml-2 cursor-pointer" />
                </div>
              </label>
              <label className="block">
                Confirm New Password
                <div className="flex items-center mt-1">
                  <input className='text-black border rounded-md px-2 py-1 flex-grow' type={showConfirmNewPassword ? "text" : "password"} value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
                  <FontAwesomeIcon icon={showConfirmNewPassword ? faEyeSlash : faEye} onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)} className="ml-2 cursor-pointer" />
                </div>
              </label>
              <div className="flex justify-end space-x-4 mt-4">
                <button type="button" onClick={handleChangePassword} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Apply Changes</button>
                <button type="button" onClick={handleCloseChangePassword} className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showTwoFactor && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <span className="text-gray-500 hover:text-gray-800 cursor-pointer text-xl" onClick={handleCloseTwoFactor}>&times;</span>
            <h2 className="text-2xl font-bold mb-4">Two-Factor Authentication</h2>
            <form className="space-y-4">
              <label className="block">
                Enter Mobile Number for OTP
                <div className="flex items-center mt-1">
                  <input type="text" className="text-black border rounded-md px-2 py-1 flex-grow" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                  <button type="button" onClick={handleSendOtp} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 ml-2">Send OTP</button>
                </div>
              </label>
              {otpSent && (
                <label className="block">
                  Confirm OTP
                  <input type="text" className="text-black border rounded-md px-2 py-1 mt-1" value={otp} onChange={(e) => setOtp(e.target.value)} />
                </label>
              )}
              <div className="flex justify-end space-x-4 mt-4">
                <button type="button" onClick={handleVerifyOtp} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Apply Changes</button>
                <button type="button" onClick={handleCloseTwoFactor} className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordAndSecurity;
