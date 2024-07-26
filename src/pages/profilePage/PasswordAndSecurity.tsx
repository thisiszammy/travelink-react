import React, { useState, useEffect } from 'react';
import Drawer from '../../components/Drawer/Drawer';
import './PasswordAndSecurity.css';
import TopBar from '../../components/LandingNavBar';

const PasswordAndSecurity: React.FC = () => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const handleOpenChangePassword = () => setShowChangePassword(true);
  const handleCloseChangePassword = () => setShowChangePassword(false);

  const handleOpenTwoFactor = () => setShowTwoFactor(true);
  const handleCloseTwoFactor = () => {
    setShowTwoFactor(false);
    setOtpSent(false);
  };

  const handleSendOtp = () => setOtpSent(true);

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

  return (
    <div className="password-security bg-[#336488] h-screen w-full flex flex-col items-center">
      <Drawer />
      <TopBar/>
      <br></br>
      <h1 className='pt-[75px] text-white'>PASSWORD & SECURITY</h1>
      
      <div className="password-card">
        <br></br>
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
                <input type="password" />
              </label>
              <label>
                Enter New Password
                <input type="password" />
              </label>
              <label>
                Confirm New Password
                <input type="password" />
              </label>
              <div className="form-buttons">
                <button type="button">Apply Changes</button>
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
                <div className="otp-input">
                  <input type="text" />
                  <button type="button" onClick={handleSendOtp}>Send OTP</button>
                </div>
              </label>
              {otpSent && (
                <label>
                  Confirm OTP
                  <input type="text" />
                </label>
              )}
              <div className="form-buttons">
                <button type="button">Apply Changes</button>
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
