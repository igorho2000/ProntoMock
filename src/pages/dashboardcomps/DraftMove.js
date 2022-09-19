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

export default function DraftMove() {
    const wrapperRef = React.useRef(null);
    useOutsideClick(wrapperRef);
    const dispatch = useDispatch();

    return (
        <div ref={wrapperRef} >

        </div>
    )
}