import React from "react";
import '../../pages/dashboardcomps/Drop.css';

import { useDispatch } from 'react-redux';
import {
    resetPopups,
} from '../../features/popupSlice';

import { useOutsideClick } from "../../Functions";

export default function SelectedRightClick() {

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
                <h3>Copy</h3>
                <p>Ctrl-C</p>
            </div>
            <div className="projectdrop-list" onClick={() => {
            dispatch(resetPopups());
            }}>
                <img className="draftdrop-iconbase" src="../../dashboard/logout.svg" alt="log out left portion" />
                <img className="draftdrop-iconmove accountdrop-logout" src="../../dashboard/logout-arrow.svg" alt="log out rignt portion" />
                <h3>Cut</h3>
                <p>Ctrl-X</p>
            </div>
            <div className="projectdrop-list" onClick={() => {
            dispatch(resetPopups());
            }}>
                <img className="draftdrop-iconbase" src="../../dashboard/logout.svg" alt="log out left portion" />
                <img className="draftdrop-iconmove accountdrop-logout" src="../../dashboard/logout-arrow.svg" alt="log out rignt portion" />
                <h3>Duplicate</h3>
                <p>Ctrl-D</p>
            </div>
            <div className="projectdrop-list" onClick={() => {
            dispatch(resetPopups());
            }}>
                <img className="draftdrop-iconbase" src="../../dashboard/logout.svg" alt="log out left portion" />
                <img className="draftdrop-iconmove accountdrop-logout" src="../../dashboard/logout-arrow.svg" alt="log out rignt portion" />
                <h3>Delete</h3>
                <p>Delete</p>
            </div>
            <div className="projectdrop-list" onClick={() => {
            dispatch(resetPopups());
            }}>
                <img className="draftdrop-iconbase" src="../../dashboard/logout.svg" alt="log out left portion" />
                <img className="draftdrop-iconmove accountdrop-logout" src="../../dashboard/logout-arrow.svg" alt="log out rignt portion" />
                <h3>Export As PNG</h3>
            </div>
        </div>
    )
}