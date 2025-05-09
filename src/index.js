import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Tailwind CSS if needed
import { UserProvider } from './context/UserContext';

ReactDOM.createRoot(document.getElementById('root')).render(
    <UserProvider>
      <App />
    </UserProvider>
  );

