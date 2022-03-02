import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// index.js loading CSS files
import 'open-props/style';
import 'open-props/normalize';
import { AuthContextProvider } from './context/AuthContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
