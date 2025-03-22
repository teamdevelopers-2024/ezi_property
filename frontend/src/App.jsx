import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import LayoutRoutes from './routes/LayoutRoutes';

function App() {
  return (
    <Router>
      <LayoutRoutes />
    </Router>
  );
}

export default App;
