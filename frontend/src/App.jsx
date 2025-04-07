import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import LayoutRoutes from './routes/LayoutRoutes';

const App = () => {
  return (
    <Router>
      <ToastProvider>
        <AuthProvider>
          <LayoutRoutes />
        </AuthProvider>
      </ToastProvider>
    </Router>
  );
};

export default App;
