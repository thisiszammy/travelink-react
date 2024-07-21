import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faChevronDown, faUser } from '@fortawesome/free-solid-svg-icons';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import './TopBar.css';
import { auth } from '../data/firebaseConfig';
import { useAuth } from '../utils/AuthContext';

const TopBar: React.FC = () => {
  const { user, userData, loading } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log('Logged out');
    } catch (error) {
      console.error('Logout error:', error);
    }
    handleMenuClose();
  };
  console.log('UserData in TopBar:', user);
  return (
    <div className="top-bar">
      <span className="logo">Travelink</span>
      <div className="top-bar-right">
        <FontAwesomeIcon icon={faBell} className="notification-icon" />
        <div className="divider"></div>
        <FontAwesomeIcon icon={faUser} className="profile-icon" />
        <div className="user-menu" onClick={handleMenuOpen}>
          <span className="username">{userData?.username || 'Guest'}</span>
          <FontAwesomeIcon icon={faChevronDown} className="dropdown-icon" />
        </div>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default TopBar;
