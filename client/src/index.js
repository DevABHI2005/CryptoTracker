import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './index.css';
import { UserProvider } from './context/Temp';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="174769517415-f6bh47t7r5bf71q9c9e5j5k37je1f4rf.apps.googleusercontent.com">
      <UserProvider>
        <App />
      </UserProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
