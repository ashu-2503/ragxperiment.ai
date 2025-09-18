import React from 'react';
import '../../style.css';


const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Conversations</a></li>
        <li><a href="#">Settings</a></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
