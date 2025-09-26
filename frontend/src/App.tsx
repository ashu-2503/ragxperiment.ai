import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      {/* ToastContainer for all toasts */}
      <ToastContainer />

      {/* All routes go here */}
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
