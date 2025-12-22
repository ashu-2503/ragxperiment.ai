import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Bootstrap CSS/JS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

// Font Awesome
import '@fortawesome/fontawesome-free/css/all.min.css';

// Your global styles
import './styles/variable.css';  // Theme variables
import './styles/tailwind.css';   // Tailwind + base global styles

// Google Fonts
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

 