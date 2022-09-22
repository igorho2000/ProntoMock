import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import './App.css';

import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Transition from './pages/Transition';
import Editor from './editor/Editor';

import {useSelector} from 'react-redux';
import {selectEveryPopup} from './features/popupSlice';

function App() {
  const everyPopup = useSelector(selectEveryPopup);

  return (
    <div>
      
      <Routes>
            
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/draft" element={<Editor />} />
      </Routes>
      {everyPopup.Transition && <Transition />}
    </div>
  );
}

export default App;
