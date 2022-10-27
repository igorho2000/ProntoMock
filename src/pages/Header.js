import React from "react";
import './Dashboard.css';
import {Link} from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux';
import {
    selectCurrentProject
} from '../features/projectSlice';

import { selectUser } from "../features/userSlice";

import {
    showPopup, transition, resetPopups,
    selectEveryPopup,
} from '../features/popupSlice';

import AccountDrop from './dashboardcomps/AccountDrop';
import ProjectDrop from "./dashboardcomps/ProjectDrop";
import SignUp from "./dashboardcomps/SignUp";
import SignIn from "./dashboardcomps/SignIn";


export default function Header(props) {
    const dispatch = useDispatch();
    const everyPopup = useSelector(selectEveryPopup);
    const currentProject = useSelector(selectCurrentProject);
    const user = useSelector(selectUser);

    return (
        <div>
            <div>
                <div className="dashboard-header-top">
                    <Link to="/dashboard" className="dashboard-logo-cont" onClick={() => {
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
                    {user !== null
                    &&
                    <div className="dashboard-account-cont" onClick={() => dispatch(showPopup(['AccountDrop', 0]))}>
                        {user.photo === null ?
                        <div className="dashboard-account-icon">{user.email[0]}</div>
                        :
                        <img className="dashboard-account-icon" src={user.photo} />
                        }
                        <img className="dashboard-account-expand" src="../dashboard/expand.svg" alt="expand account options icon" />
                    </div>
                    }
                </div>
                {everyPopup['AccountDrop'][0] && <AccountDrop />}
                {props.loading && <p style={{position: 'fixed', top: '80px', left: '15px', fontSize: '1.3rem'}}>Loading...</p>}
            </div>
            
        </div>
    )
}