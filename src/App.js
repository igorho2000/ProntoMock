import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import './App.css';

import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Transition from './pages/Transition';
import Editor from './editor/Editor';

import {useSelector, useDispatch} from 'react-redux';
import {selectEveryPopup} from './features/popupSlice';

import {auth} from './Firebase';

import {changeUserState} from './features/projectSlice'

function App() {
  const everyPopup = useSelector(selectEveryPopup);
  const dispatch = useDispatch();

  React.useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        dispatch(changeUserState(user.displayName))
      } else {
        dispatch(changeUserState(null))
      }
    }) 
  })

  return (
    <div onContextMenu={(event) => {
      event.preventDefault();
    }} onDragOver={(event) => {
      // if (event.target.className === 'imageuploader') {
      //   return
      // }
      event.preventDefault();
    }} onDrop={(event) => {
      event.preventDefault();
    }}
    >
      
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
