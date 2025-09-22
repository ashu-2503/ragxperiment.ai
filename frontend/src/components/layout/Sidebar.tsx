import React from "react";

const Sidebar: React.FC = () => {
  return (
    <aside className="bg-dark text-white p-3" style={{ width: "250px" ,paddingRight:"40px"}}>
      <ul className="nav flex-column ">
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
