import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { BrowserRouter } from "react-router-dom";
import Album from './Album.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProSidebarProvider>
      <BrowserRouter>
        <App />
        <Album/>
      </BrowserRouter>
    </ProSidebarProvider>

  </React.StrictMode>
);

reportWebVitals();