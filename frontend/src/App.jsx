import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import LayoutRoutes from './routes/LayoutRoutes';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LayoutRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
