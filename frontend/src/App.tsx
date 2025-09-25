import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";
import LayoutWrapper from "./components/layout/LayoutWrapper";
import ChatInput from "./components/common/Input";
import Login from "./modules/auth/login";
import Signup from "./modules/auth/signup";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(true); // ✅ start with signup

  const handleSendMessage = (msg: string) => {
    console.log("Message sent:", msg);
  };

  const handleLogin = () => {
    console.log("User logged in ✅");
    setIsLoggedIn(true);
  };

  const handleSignup = () => {
    console.log("User signed up ✅");
    setShowSignup(false); // after signup, show login
  };

  if (!isLoggedIn) {
    return showSignup ? (
      <Signup onSignup={handleSignup} />
    ) : (
      <Login onLogin={handleLogin} onSwitchToSignup={() => setShowSignup(true)} />
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <LayoutWrapper>
          <AppRoutes />
          <Toaster position="top-right" />
          <ChatInput onSend={handleSendMessage} />
        </LayoutWrapper>
      </div>
    </BrowserRouter>
  );
}

export default App;
