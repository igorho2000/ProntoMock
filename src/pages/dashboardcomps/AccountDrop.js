import React from "react";
import './Drop.css';

import { useDispatch } from 'react-redux';
import {
    resetPopups,
} from '../../features/popupSlice';

import { useOutsideClick } from "../../Functions";

import { handleSignOut } from "../../Firebase";

export default function AccountDrop() {

    const wrapperRef = React.useRef(null);
    useOutsideClick(wrapperRef);
    const dispatch = useDispatch();
    
    return (
        <div className="projectdrop accountdrop" ref={wrapperRef}>
            <div className="projectdrop-list" onClick={() => {
            dispatch(resetPopups());
            }}>
                <img className="draftdrop-iconbase" src="../../dashboard/accountsettings.svg" alt="account settings icon top portion" />
                <img className="draftdrop-iconmove accountdrop-settings" src="../../dashboard/accountsettings-gear.svg" alt="account settings icon bottom portion" />
                <h3>Settings</h3>
            </div>
            <div className="projectdrop-list" onClick={() => {
                handleSignOut();
                dispatch(resetPopups());
            }}>
                <img className="draftdrop-iconbase" src="../../dashboard/logout.svg" alt="log out left portion" />
                <img className="draftdrop-iconmove accountdrop-logout" src="../../dashboard/logout-arrow.svg" alt="log out rignt portion" />
                <h3>Log Out</h3>
            </div>
        </div>
    )
}