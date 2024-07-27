import React, { useState, useEffect } from 'react';
import Drawer from '../../components/Drawer/Drawer';
import './PasswordAndSecurity.css';
import TopBar from '../../components/LandingNavBar';
import { auth, signInWithPhoneNumber } from '../../data/firebaseConfig';
import Swal from 'sweetalert2';
import { reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth';

const PasswordAndSecurity: React.FC = () => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

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
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseChangePassword}>&times;</span>
            <h2>Change Password</h2>
            <form className="password-form">
              <label>
                Enter Old Password
                <input className='text-black' type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
              </label>
              <label>
                Enter New Password
                <input className='text-black' type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              </label>
              <label>
                Confirm New Password
                <input className='text-black' type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
              </label>
              <div className="form-buttons">
                <button type="button" onClick={handleChangePassword}>Apply Changes</button>
                <button type="button" onClick={handleCloseChangePassword}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showTwoFactor && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseTwoFactor}>&times;</span>
            <h2>Two-Factor Authentication</h2>
            <form className="two-factor-form">
              <label>
                Enter Mobile Number for OTP
                <div className="otp-input text-black">
                  <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                  <button type="button" onClick={handleSendOtp}>Send OTP</button>
                </div>
              </label>
              {otpSent && (
                <label>
                  Confirm OTP
                  <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
                </label>
              )}
              <div className="form-buttons">
                <button type="button" onClick={handleVerifyOtp}>Apply Changes</button>
                <button type="button" onClick={handleCloseTwoFactor}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    
  );
};

export default PasswordAndSecurity;
