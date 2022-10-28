import React from "react";
import './Dashboard.css';
import {Link} from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux';
import {
    selectCurrentProject, wipeProject
} from '../features/projectSlice';

import { selectUser } from "../features/userSlice";

import {
    showPopup, transition, resetPopups,
    selectEveryPopup,
} from '../features/popupSlice';

import AccountDrop from './dashboardcomps/AccountDrop';
import { WipeDraft } from "../features/draftSlice";


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
                            dispatch(WipeDraft());
                            dispatch(transition());
                            setTimeout(() => {
                                dispatch(resetPopups())
                            }, 3000)
                        }}>
                        <img src="../dashboard/logo.svg" className="dashboard-logo" alt="prontomock logo"/>
                        <div className="dashboard-prontomock" style={{position: 'relative'}}>
                            <h2 className="dashboard-pronto">Pronto</h2>
                            <h2 className="dashboard-mock">MOCK</h2>
                            <h6 style={{fontSize: '0.8rem', color: 'white', backgroundColor: 'rgb(50, 50, 50)', padding: '1px 5px', borderRadius: '5px', position: 'absolute', right: -45, top: -4}}>BETA</h6>
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