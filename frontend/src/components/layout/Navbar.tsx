import React from 'react';
import '../../style.css';


const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <h1>Functional Safety AI Tool</h1>
      <button className="profile-btn">Profile</button>
    </nav>
  );
};

export default Navbar;
