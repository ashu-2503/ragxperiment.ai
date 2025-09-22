import React from "react";

const Sidebar: React.FC = () => {
  return (
    <aside
      className="bg-dark text-white p-3 d-flex flex-column"
      style={{ width: "250px" }}
    >
      {/* Company Logo */}
      <div className="text-center mb-4">
        <img
          src="https://www.vervetronics.com/wp-content/uploads/2023/04/cropped-VT_Logo-1.png"
          alt="Company Logo"
          style={{ maxWidth: "150px", height: "auto" }}
        />
      </div>

      {/* Menu */}
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <a href="#" className="nav-link text-white">Dashboard</a>
        </li>
        <li className="nav-item mb-2">
          <a href="#" className="nav-link text-white">Chat</a>
        </li>
        <li className="nav-item mb-2">
          <a href="#" className="nav-link text-white">Knowledge Base</a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
