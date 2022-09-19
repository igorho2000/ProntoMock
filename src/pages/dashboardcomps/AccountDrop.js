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

export default function AccountDrop() {

    const wrapperRef = React.useRef(null);
    useOutsideClick(wrapperRef);
    const dispatch = useDispatch();
    
    return (
        <div className="projectdrop accountdrop" ref={wrapperRef}>
            <div className="projectdrop-list" onClick={() => {
            dispatch(resetPopups());
            }}>
                <img className="draftdrop-iconbase" src="../../dashboard/accountsettings.svg" />
                <img className="draftdrop-iconmove accountdrop-settings" src="../../dashboard/accountsettings-gear.svg" />
                <h3>Settings</h3>
            </div>
            <div className="projectdrop-list" onClick={() => {
            dispatch(resetPopups());
            }}>
                <img className="draftdrop-iconbase" src="../../dashboard/logout.svg" />
                <img className="draftdrop-iconmove accountdrop-logout" src="../../dashboard/logout-arrow.svg" />
                <h3>Log Out</h3>
            </div>
        </div>
    )
}