import React from "react";
import './Dashboard.css';
import {Link} from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux';
import {
    selectCurrentProject,
} from '../features/projectSlice';

import {
    showPopup, transition, resetPopups,
    selectEveryPopup,
} from '../features/popupSlice';

import AccountDrop from './dashboardcomps/AccountDrop';
import ProjectDrop from "./dashboardcomps/ProjectDrop";
import SignUp from "./dashboardcomps/SignUp";
import SignIn from "./dashboardcomps/SignIn";

export default function Header() {
    const dispatch = useDispatch();
    const everyPopup = useSelector(selectEveryPopup);
    const currentProject = useSelector(selectCurrentProject);

    return (
        <div>
            <div>
                <div className="dashboard-header-top">
                    <Link to="/" className="dashboard-logo-cont" onClick={() => {
                            dispatch(transition())
                            setTimeout(() => {
                                dispatch(resetPopups())
                            }, 3000)
                        }}>
                        <img src="../dashboard/logo.svg" className="dashboard-logo" alt="prontomock logo"/>
                        <div className="dashboard-prontomock">
                            <h2 className="dashboard-pronto">Pronto</h2>
                            <h2 className="dashboard-mock">MOCK</h2>
                        </div>
                    </Link>
                    {false
                    &&
                    <div className="dashboard-account-cont" onClick={() => dispatch(showPopup(['AccountDrop', 0]))}>
                        <div className="dashboard-account-icon">WW</div>
                        <img className="dashboard-account-expand" src="../dashboard/expand.svg" alt="expand account options icon" />
                    </div>
                    }
                    {true
                    &&
                    <div className="dashboard-account-cont">
                        <button className="draftrename-submit" onClick={() => dispatch(showPopup(['SignIn', 0]))} style={{backgroundColor: 'transparent', boxShadow: 'none', fontWeight: '600'}}>Log In</button>
                        <button className="draftrename-submit" onClick={() => dispatch(showPopup(['SignUp', 0]))} style={{ marginRight: '10px'}}>Sign Up</button>
                    </div>
                    }
                </div>
                {everyPopup['AccountDrop'][0] && <AccountDrop />}
                {everyPopup['SignUp'][0] && <SignUp />}
                {everyPopup['SignIn'][0] && <SignIn />}
            </div>
        </div>
    )
}