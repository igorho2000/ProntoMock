import React from "react";
import './Dashboard.css';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux';
import {
    switchProject,
    selectEveryProject, selectCurrentProject,
} from '../features/projectSlice';

import {
    resetPopups, showPopup,
    selectEveryPopup,
} from '../features/popupSlice';

import AccountDrop from './dashboardcomps/AccountDrop';
import DraftDrop from './dashboardcomps/DraftDrop';
import ProjectDrop from "./dashboardcomps/ProjectDrop";
import ProjectShare from "./dashboardcomps/ProjectShare";
import DraftInfo from "./dashboardcomps/DraftInfo";  

export default function Dashboard() {
    const dispatch = useDispatch();
    const everyProject = useSelector(selectEveryProject);
    const everyPopup = useSelector(selectEveryPopup);
    const currentProject = useSelector(selectCurrentProject);

    const outputProjectDraft = currentProject[0].drafts.map((item, index) => (
        <DraftInfo name={item.name} type={item.type} date={item.date} key={`draft${index}`} index={index} />
    ))

    console.log(everyPopup['ProjectDrop'][0]);
    console.log(everyPopup['DraftDrop'][0]);

    return (
        <div>
            <div>
                <div className="dashboard-header-top">
                    <Link to="/" className="dashboard-logo-cont">
                        <img src="../dashboard/logo.svg" className="dashboard-logo" />
                        <div className="dashboard-prontomock">
                            <h2 className="dashboard-pronto">Pronto</h2>
                            <h2 className="dashboard-mock">MOCK</h2>
                        </div>
                    </Link>
                    <div className="dashboard-account-cont">
                        <div className="dashboard-account-icon">WW</div>
                        <img className="dashboard-account-expand" src="../dashboard/expand.svg" />
                    </div>
                </div>
                <div className="dashboard-header-bottom">
                    <div className="dashboard-project-cont">
                        <div className="dashboard-project-title" onClick={() => dispatch(showPopup(['ProjectDrop', 0]))}>
                            <h3 className="dashboard-project-project">Project</h3>
                            <h3 className="dashboard-project-name">{currentProject[0].name}</h3>
                            <img className="dashboard-project-expand"  src="../dashboard/expandblack.svg" />  
                        </div>
                        <img className="dashboard-project-icon" src="../dashboard/settings.svg" />
                        
                    </div>
                    {everyPopup['ProjectDrop'][0] && <ProjectDrop />}
                </div>
            </div>
            <div className="dashboard-body">
                {outputProjectDraft}
            </div>
            <a className="dashboard-button">
                <p className="dashboard-button-text">New Design</p>
                <img src="../dashboard/create.svg" />
            </a>
        </div>
    )
}