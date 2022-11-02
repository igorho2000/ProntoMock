import React from "react";
import './Dashboard.css';
import {Link} from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux';

import { selectUser } from "../features/userSlice";

import {
    showPopup, transition, resetPopups,
    selectEveryPopup,
} from '../features/popupSlice';

import AccountDrop from './dashboardcomps/AccountDrop';
import UserSettings from "./dashboardcomps/UserSettings";
import { WipeDraft } from "../features/draftSlice";


export default function Header(props) {
    const dispatch = useDispatch();
    const everyPopup = useSelector(selectEveryPopup);
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
                            <h6 style={{fontSize: '0.8rem', color: 'white', backgroundColor: 'rgb(50, 50, 50)', padding: '1px 5px', borderRadius: '5px', position: 'absolute', right: -2, top: -6}}>BETA</h6>
                        </div>
                    </Link>
                    {user !== null
                    &&
                    <div className="dashboard-account-cont" onClick={() => dispatch(showPopup(['AccountDrop', 0]))}>
                        {user.photo === null ?
                        user.name === null ? <div className="dashboard-account-icon">{user.email[0]}</div> : <div className="dashboard-account-icon">{user.name[0]}</div>
                        :
                        <img className="dashboard-account-icon" src={user.photo} alt='user profile' />
                        }
                        <img className="dashboard-account-expand" src="../dashboard/expand.svg" alt="expand account options icon" />
                    </div>
                    }
                </div>
                {everyPopup['AccountDrop'][0] && <AccountDrop />}
                {everyPopup['UserSettings'][0] && <UserSettings />}
                {props.loading && 
                <div style={{position: 'fixed', top: '80px', left: '15px', fontSize: '1.3rem', display: 'flex', alignItems: 'center'}}>
                    <p>Loading...</p>
                    <div className='control-loading-circle' style={{marginTop: 0}}></div>
                </div>}
            </div>
        </div>
    )
}