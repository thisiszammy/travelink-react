import React, { useState } from 'react';
import Drawer from '../../components/Drawer/Drawer';
import './PasswordAndSecurity.css';

const PasswordAndSecurity: React.FC = () => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);

  const handleOpenChangePassword = () => setShowChangePassword(true);
  const handleCloseChangePassword = () => setShowChangePassword(false);

  const handleOpenTwoFactor = () => setShowTwoFactor(true);
  const handleCloseTwoFactor = () => setShowTwoFactor(false);

  return (
    <div className="password-security">
      <Drawer />
      <h1>PASSWORD & SECURITY</h1>
      <div className="password-card">
        <button onClick={handleOpenChangePassword}>Change Password</button>
        <button onClick={handleOpenTwoFactor}>Two-Factor Authentication</button>
      </div>

      {showChangePassword && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseChangePassword}>&times;</span>
            <h2>Change Password</h2>
            {/* Add form for changing password here */}
          </div>
        </div>
      )}

      {showTwoFactor && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseTwoFactor}>&times;</span>
            <h2>Two-Factor Authentication</h2>
            {/* Add content for two-factor authentication here */}
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordAndSecurity;
