import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-light bg-white border-bottom px-3 d-flex justify-content-between">
      <h5 className="mb-0 text-center flex-grow-1">FUSA Ai Tool</h5>
      <button className="btn btn-outline-primary btn-sm">Profile</button>
    </nav>
  );
};

export default Navbar;
