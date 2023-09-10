import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ErrorProvider } from './context/checkoutContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorProvider>
    <App />
    </ErrorProvider>
  </React.StrictMode>
);

