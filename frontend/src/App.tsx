import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import '@fortawesome/fontawesome-free/css/all.min.css';

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
