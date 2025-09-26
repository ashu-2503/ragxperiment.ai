import React, { type ReactNode } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

interface LayoutWrapperProps {
  children?: ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ }) => {
  return (
    <div className="d-flex vh-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-grow-1 d-flex flex-column">
        <Navbar />

        {/* Chat layout */}
        <main className="flex-grow-1 d-flex flex-column bg-light">
          {/* Chat messages area (scrollable) */}
          <div className="flex-grow-1 overflow-auto p-3">
            {/* Here your conversation messages will render */}
            
          </div>

          {/* Message input box pinned to bottom */}
          <div className="border-top bg-white p-2">
  <div className="input-group input-group-sm">
    <input
      type="text"
      className="form-control"
      placeholder="Type a message..."
      style={{ height: "36px" ,width:"20px"}}
    />
    <button className="btn btn-sm btn-primary px-3">Send</button>
  </div>
</div>

        </main>
      </div>
    </div>
  );
};

export default LayoutWrapper;
