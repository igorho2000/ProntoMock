import React from "react";
import './Drop.css';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux';
import {
    resetPopups, showPopup,
    selectEveryPopup,
} from '../../features/popupSlice';
import {
    switchProject,
    selectEveryProject, selectCurrentProject,
} from '../../features/projectSlice';

import { useOutsideClick } from "../../Functions";

export default function DraftDrop(props) {
    const wrapperRef = React.useRef(null);
    useOutsideClick(wrapperRef);

    return (
        <div className="draftdrop" ref={wrapperRef}>
            
        </div>
    )
}