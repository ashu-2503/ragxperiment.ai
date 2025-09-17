import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AppRoutes />
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
