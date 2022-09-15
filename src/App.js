import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import './App.css';

import Dashboard from './pages/Dashboard';
import Home from './pages/Home';

function App() {
  return (
    <div>
      <Routes>
            
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
