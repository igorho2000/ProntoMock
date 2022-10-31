import React from "react";
import './Drop.css';

import { useDispatch } from 'react-redux';
import {
    resetPopups, transition, showPopup
} from '../../features/popupSlice';

import {useNavigate} from "react-router-dom";

import { useOutsideClick } from "../../Functions";

import { auth } from "../../Firebase";

export default function AccountDrop() {

    const wrapperRef = React.useRef(null);
    useOutsideClick(wrapperRef);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    return (
        <div className="projectdrop accountdrop" ref={wrapperRef}>
            <div className="projectdrop-list" onClick={() => {
                dispatch(resetPopups());
                dispatch(showPopup(['UserSettings', 0]))
            }}>
                <img className="draftdrop-iconbase" src="../../dashboard/accountsettings.svg" alt="account settings icon top portion" />
                <img className="draftdrop-iconmove accountdrop-settings" src="../../dashboard/accountsettings-gear.svg" alt="account settings icon bottom portion" />
                <h3>Settings</h3>
            </div>
            <a className="projectdrop-list" onClick={() => {
                dispatch(resetPopups());
            }} href='https://www.privacypolicygenerator.info/live.php?token=s8LjBGGAWcoKtRVOSFpFqKrIuXBc2oz8' target='_blank'>
                <img className="draftdrop-iconbase" src="../../dashboard/policy.svg" alt="privacy icon" />
                <h3 style={{color: 'white'}}>Privacy</h3>
            </a>
            <a className="projectdrop-list" onClick={() => {
                dispatch(resetPopups());
            }} href='https://projectonepremium.com' target='_blank'>
                <img className="draftdrop-iconbase" src="../../dashboard/logo-o-3d.svg" alt="privacy icon" />
                <h3 style={{color: 'white'}}>ONE Premium</h3>
            </a>
            <div className="projectdrop-list" onClick={() => {
                dispatch(resetPopups());
                dispatch(transition());
                auth.signOut()
                setTimeout(() => {
                    navigate('/dashboard');
                }, 2700)
                setTimeout(() => {
                    dispatch(resetPopups());
                }, 3000)
            }}>
                <img className="draftdrop-iconbase" src="../../dashboard/logout.svg" alt="log out left portion" />
                <img className="draftdrop-iconmove accountdrop-logout" src="../../dashboard/logout-arrow.svg" alt="log out rignt portion" />
                <h3 style={{color: 'white', textDecoration: 'none'}}>Log Out</h3>
            </div>
        </div>
    )
}