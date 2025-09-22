import React from "react";

const Sidebar: React.FC = () => {
  return (
    <aside className="bg-dark text-white p-3" style={{ width: "250px" }}>
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <a href="#" className="nav-link text-white">Home</a>
        </li>
        <li className="nav-item mb-2">
          <a href="#" className="nav-link text-white">Conversations</a>
        </li>
        <li className="nav-item mb-2">
          <a href="#" className="nav-link text-white">Settings</a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
